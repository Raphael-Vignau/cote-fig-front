import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { FigurineService } from "../services/figurine.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FigurinesDataSource } from "../data/figurines-data-source";
import { fromEvent, merge } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
    selector: 'app-figurine-list',
    templateUrl: './figurine-list.component.html',
    styleUrls: ['./figurine-list.component.css']
})
export class FigurineListComponent implements OnInit, AfterViewInit {
    figurines!: FigurinesDataSource;
    displayedColumns: string[] = ['name', 'publisher', 'game', 'material', 'year', 'actions'];
    totalFigurines: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private figurineService: FigurineService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.figurines = new FigurinesDataSource(this.figurineService);
        this.figurines.loadFigurines();
    }

    ngAfterViewInit(): void {
        this.countAllFigurines();

        // server-side search
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadFigurinesPage();
                this.countAllFigurines();
            })
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadFigurinesPage();
            })
        ).subscribe();
    }

    loadFigurinesPage(): void {
        this.figurines.loadFigurines(
            this.input.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countAllFigurines(): void {
        this.figurineService.countAllFigurines(
            this.input.nativeElement.value
        ).subscribe(
            (totalFigurines: number) => {
                this.totalFigurines = totalFigurines;
            }
        );
    }

    editFigurine(idFigurine: string): void {
        this.router.navigate(['figurine', 'edit', idFigurine]).then();
    }

    deleteFigurine(idFigurine: string): void {
        Swal.fire({
            title: `Supprimer la figurine`,
            icon: 'warning',
            text: 'Êtes-vous sûr de vouloir supprimer cette figurine ?',
            showConfirmButton: true,
            confirmButtonText: 'Supprimer',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    this.figurineService.deleteFigurine(idFigurine).subscribe({
                        next: () => {
                            this.loadFigurinesPage();
                            this.countAllFigurines();
                            this.toastr.success('La figurine a été supprimé', 'Supprimer');
                        },
                        error: (err) => {
                            this.errorSubmit(err)
                        }
                    })
                }
            }
        )
    }

    errorSubmit(error: string[] | string) {
        console.error(error);
        if (Array.isArray(error)) {
            error.map((err: string) => {
                this.toastr.error(err, 'Error !');
            })
        } else {
            this.toastr.error(error, 'Error !');
        }
    }
}
