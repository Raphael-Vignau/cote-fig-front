import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { AuthService } from "../../shared/services/auth.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Figurine } from "../data/Figurine";
import { map } from "rxjs/operators";
import {Tag} from "../../tag/data/tag";

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
            params = params.set('_contains', filter);
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
            params = params.set('_contains', filter);
        }
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/figurines', options).pipe(
            map((res: any) => res)
        );
    }

    getFigurinesForHome(tags: Tag[], sortBy?: string, sortDirection?: string, startFigurine?: number, nbrFigurines?: number): Observable<Figurine[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'createdAt')
            .set('_direction', sortDirection ? sortDirection : 'DESC')
            .set('_start', startFigurine ? (startFigurine).toString() : '0')
            .set('_limit', nbrFigurines ? nbrFigurines.toString() : '20');
        if (tags) {
            params = params.set('_tags', JSON.stringify(tags));
        }
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/figurines', options).pipe(
            map((res: any) => res)
        );
    }

    getMyCollection(sortBy?: string, sortDirection?: string, startFigurine?: number, nbrFigurines?: number): Observable<Figurine[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'createdAt')
            .set('_direction', sortDirection ? sortDirection : 'DESC')
            .set('_start', startFigurine ? (startFigurine).toString() : '0')
            .set('_limit', nbrFigurines ? nbrFigurines.toString() : '20');
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/figurines/collection/me', options).pipe(
            map((res: any) => res)
        );
    }

    getMyWishlist(sortBy?: string, sortDirection?: string, startFigurine?: number, nbrFigurines?: number): Observable<Figurine[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'createdAt')
            .set('_direction', sortDirection ? sortDirection : 'DESC')
            .set('_start', startFigurine ? (startFigurine).toString() : '0')
            .set('_limit', nbrFigurines ? nbrFigurines.toString() : '20');
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/figurines/wishlist/me', options).pipe(
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
        formData.append('img_figurine', figurine.img_figurine);
        // For delete old img
        if (figurine.img_name) {
            formData.append('img_name', figurine.img_name);
        }
        return formData
    }

    addFigurine(figurine: Figurine): Observable<Figurine> {
        return this.http.post(this.authUrl + '/figurines', figurine).pipe(
            map((newFigurine: any) => newFigurine)
        )
    }

    editFigurine(idFigurine: string, figurine: Figurine): Observable<Figurine> {
        return this.http.put(this.authUrl + '/figurines/' + idFigurine, figurine).pipe(
            map((newFigurine: any) => newFigurine)
        )
    }

    editFigurineImage(idFigurine: string, figurine: Figurine): Observable<Figurine> {
        return this.http.put(this.authUrl + '/figurines/' + idFigurine, this.makeFormData(figurine)).pipe(
            map((newFigurine: any) => newFigurine)
        )
    }

    deleteFigurine(idFigurine: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/figurines/${idFigurine}`).pipe(
            map(() => {
                console.log('figurine supprimée');
            })
        )
    }

    getFigurineFile(fileName: string) {
        return this.http.get(this.authUrl + '/figurines/file/' + fileName, { responseType: 'blob' })
    }
}
