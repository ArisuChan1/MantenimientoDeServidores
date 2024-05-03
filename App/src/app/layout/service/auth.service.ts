import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Usuario } from 'src/app/interfaces/Usuario';
import { WEB_API_URL } from 'src/config/config';

const URL = `${WEB_API_URL}/Usuarios`;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    async login(alias: string, password: string) {
        const response = await firstValueFrom(
            this.http.post<{ usuario: Usuario }>(`${URL}/Login`, {
                alias,
                password,
            })
        );

        if (response) {
            sessionStorage.setItem('usuario', JSON.stringify(response.usuario));
            return response.usuario;
        }

        return null;
    }
}
