import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/layout/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
})
export class LoginComponent {
    alias = '';
    password = '';

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) {}

    async login() {
        if (!this.alias || !this.password) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debe ingresar usuario y contraseña',
            });
            return;
        }

        const usuario = await this.authService.login(this.alias, this.password);

        if (usuario) {
            this.messageService.add({
                severity: 'success',
                summary: 'Bienvenido',
                detail: `Hola ${usuario.nombreCompleto}`,
            });
            this.router.navigate(['/landing']);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Usuario o contraseña incorrectos',
            });
        }
    }
}
