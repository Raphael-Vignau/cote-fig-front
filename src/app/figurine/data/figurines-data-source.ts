import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FigurineService } from '../services/figurine.service';
import { catchError, finalize } from 'rxjs/operators';
import { Figurine } from "./Figurine";

export class FigurinesDataSource implements DataSource<Figurine> {
    private figurinesSubject = new BehaviorSubject<Figurine[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private figurineService: FigurineService
    ) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Figurine[]> {
        return this.figurinesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.figurinesSubject.complete();
        this.loadingSubject.complete();
    }

    loadFigurines(filter?: string, sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.figurineService.getFigurines(filter, sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((figurines: Figurine[]) => this.figurinesSubject.next(figurines));
    }
}
