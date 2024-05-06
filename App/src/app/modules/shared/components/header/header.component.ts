import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
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
