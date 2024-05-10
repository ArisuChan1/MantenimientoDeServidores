import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/types';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { routesConfig } from 'src/app/routes/routesConfig';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    routes = routesConfig;
    usuario?: Usuario;
    constructor(private authService: AuthService) {
        this.getUsuario();
    }

    getUsuario() {
        const usuario = this.authService.getUsuario();
        if (usuario) {
            this.usuario = usuario;
        }
    }

    logout() {
        this.authService.logout();
    }
}
