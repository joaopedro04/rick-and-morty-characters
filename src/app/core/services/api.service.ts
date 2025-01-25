import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CharacterResponse } from '../../shared/types/response.type';

@Injectable()
export class ApiService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getCharacters(name: string, page: number): Observable<CharacterResponse> {
        return this.http.get<CharacterResponse>(`${this.baseUrl}/character`, {
            params: { name, page },
        });
    }
}
