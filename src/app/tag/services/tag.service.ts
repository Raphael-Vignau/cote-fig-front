import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../shared/services/auth.service";
import {Tag} from "../data/tag";

@Injectable({
    providedIn: 'root'
})
export class TagService {
    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {
    }

    getTags(filter?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Tag[]> {
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

        return this.http.get(this.authUrl + '/tags', options).pipe(
            map((res: any) => res)
        );
    }
}
