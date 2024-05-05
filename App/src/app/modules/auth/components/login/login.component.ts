import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { SESSION_KEY_USER } from 'src/config/config';

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
        private alerta: AlertaService,
        private router: Router
    ) {
        this.alerta.info('Bienvenido');
    }

    async login() {
        if (!this.alias || !this.password) {
            this.alerta.warn('Debe ingresar usuario y contraseña');
            return;
        }
        this.authService.login(this.alias, this.password).subscribe({
            next: ({ usuario }) => {
                if (usuario) {
                    this.alerta.success(`Hola ${usuario.nombreCompleto}`);
                    sessionStorage.setItem(
                        SESSION_KEY_USER,
                        JSON.stringify(usuario)
                    );
                    return;
                }
            },
            error: (error) => {
                this.alerta.error(error.message);
            },
        });
    }
}
