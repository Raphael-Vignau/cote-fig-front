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
import { Figurine } from "../data/Figurine";
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
    selector: 'app-figurine-list',
    templateUrl: './figurine-list.component.html',
    styleUrls: ['./figurine-list.component.css']
})
export class FigurineListComponent implements OnInit, AfterViewInit {
    figurines!: FigurinesDataSource;
    displayedColumns: string[] = ['name', 'code', 'price', 'internal_stock', 'internal_stock_dirty', 'actions'];
    totalFigurines: number = 0;

    exportCsvOptions = {
        fieldSeparator: ';',
        useHeader: true,
        headers: ['name', 'description', 'code', 'price', 'nbr_by_palette', 'internal_stock', 'internal_stock_dirty']
    }

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

    makeNbrPalette(figurine: Figurine, dirty: boolean = false): number {
        const nbrFigurine = dirty ? figurine.internal_stock_dirty : figurine.internal_stock;
        let nbrPalette = Math.floor(nbrFigurine / figurine.nbr_by_palette);
        nbrPalette = isNaN(nbrPalette) ? 0 : nbrPalette;
        return nbrPalette
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

    addFigurines(figurine: Figurine): void {
        Swal.fire({
            title: `Ajouter des bouteilles propres`,
            icon: 'question',
            input: 'number',
            inputLabel: 'Combient de bouteilles propres voulez vous ajouter ?',
            showCancelButton: true
        }).then(response => {
            if (response.isConfirmed && response.value && response.value != 0) {
                figurine.internal_stock = Number(figurine.internal_stock) + parseInt(response.value)
                this.figurineService.editFigurine(figurine.id, figurine).subscribe({
                    next: () => { this.toastr.success('Le nombre de bouteilles propres a été modifié', 'Modifier') },
                    error: (err) => {
                        this.errorSubmit(err)
                    }
                })
            }
        })
    }

    addDirtyFigurines(figurine: Figurine): void {
        Swal.fire({
            title: `Ajouter des bouteilles sales`,
            icon: 'question',
            input: 'number',
            inputLabel: 'Combient de bouteilles sales voulez vous ajouter ?',
            showCancelButton: true
        }).then(response => {
            if (response.isConfirmed && response.value && response.value != 0) {
                figurine.internal_stock_dirty = Number(figurine.internal_stock_dirty) + parseInt(response.value)
                this.figurineService.editFigurine(figurine.id, figurine).subscribe({
                    next: () => { this.toastr.success('Le nombre de bouteilles sales a été modifié', 'Modifier') },
                    error: (err) => {
                        this.errorSubmit(err)
                    }
                })
            }
        })
    }

    exportAllFigurines() {
        this.figurineService.getFigurinesExport().subscribe(
            (figurines: Figurine[]) => {
                new AngularCsv(figurines, 'export', this.exportCsvOptions)
            }
        );
    }

    deleteFigurine(idFigurine: string): void {
        Swal.fire({
            title: `Supprimer le type de bouteille`,
            icon: 'warning',
            text: 'Êtes-vous sûr de vouloir supprimer ce type de bouteille ?',
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
                            this.toastr.success('Le type de bouteille a été supprimé', 'Supprimer');
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
