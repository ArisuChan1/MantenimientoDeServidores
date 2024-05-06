import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuario';
import { SESSION_KEY_USER, WEB_API_URL } from 'src/config/config';

const URL = `${WEB_API_URL}/Usuarios`;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}

    getUsuario() {
        const user = sessionStorage.getItem(SESSION_KEY_USER);
        return user ? (JSON.parse(user) as Usuario) : null;
    }

    login(alias: string, password: string) {
        const url = `${URL}/Login`;
        return this.http.post<{ usuario: Usuario }>(url, {
            alias,
            password,
        });
    }

    logout() {
        sessionStorage.removeItem(SESSION_KEY_USER);
        this.router.navigate(['/auth']);
    }
}
