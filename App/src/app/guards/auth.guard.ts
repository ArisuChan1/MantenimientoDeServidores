import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_KEY_USER } from 'src/config/config';

@Injectable({
    providedIn: 'root',
})
export class SessionGuard {
    constructor(private router: Router) {}

    canActivate() {
        return this.verificarSession();
    }
    canLoad() {
        return this.verificarSession();
    }

    verificarSession() {
        const user = sessionStorage.getItem(SESSION_KEY_USER);

        if (!user) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}
