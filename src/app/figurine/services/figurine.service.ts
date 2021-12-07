import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { AuthService } from "../../shared/services/auth.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Figurine } from "../data/Figurine";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FigurineService {
    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {
    }

    countAllFigurines(filter?: string): Observable<number> {
        let params = new HttpParams();
        if (filter) {
            params = params.set('Nom_contains', filter);
        }
        const options = {
            params
        };
        return this.http.get(this.authUrl + '/figurines/count', options).pipe(
            map((res: any) => res)
        );
    }

    getFigurines(filter?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Figurine[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'name')
            .set('_direction', sortDirection ? sortDirection : 'ASC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '10');
        if (filter) {
            params = params.set('name_contains', filter);
        }
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/figurines', options).pipe(
            map((res: any) => res)
        );
    }

    getFigurinesExport(): Observable<Figurine[]> {
        return this.http.get(this.authUrl + '/figurines/export').pipe(
            map((res: any) => res)
        );
    }

    getOneFigurine(idFigurine: string): Observable<Figurine> {
        return this.http.get(this.authUrl + '/figurines/' + idFigurine).pipe(
            map((res: any) => res)
        );
    }

    makeFormData(figurine: Figurine): FormData {
        const formData = new FormData();
        formData.append('name', figurine.name);
        formData.append('code', figurine.code);
        formData.append('description', figurine.description);
        formData.append('price', String(figurine.price));
        formData.append('nbr_by_palette', String(figurine.nbr_by_palette));
        formData.append('internal_stock', String(figurine.internal_stock));
        formData.append('internal_stock_dirty', String(figurine.internal_stock_dirty));
        formData.append('img_figurine', figurine.img_figurine);
        // For delete old img
        if (figurine.img_name) {
            formData.append('img_name', figurine.img_name);
        }
        formData.append('pdf_figurine', figurine.pdf_figurine);
        // For delete old img
        if (figurine.pdf_name) {
            formData.append('pdf_name', figurine.pdf_name);
        }
        return formData
    }

    addFigurine(figurine: Figurine): Observable<Figurine> {
        return this.http.post(this.authUrl + '/figurines', this.makeFormData(figurine)).pipe(
            map((newFigurine: any) => newFigurine)
        );
    }

    editFigurine(idFigurine: string, figurine: Figurine): Observable<Figurine> {
        return this.http.put(this.authUrl + '/figurines/' + idFigurine, this.makeFormData(figurine)).pipe(
            map((newFigurine: any) => newFigurine)
        );
    }

    deleteFigurine(idFigurine: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/figurines/${idFigurine}`).pipe(
            map(() => {
                console.log('Type de bouteille supprimé');
            })
        )
    }

    getFigurineFile(fileName: string) {
        return this.http.get(this.authUrl + '/figurines/file/' + fileName, { responseType: 'blob' })
    }
}
