import { Component } from '@angular/core';
import {
    Ambiente,
    Ciudad,
    Rol,
    Servidor,
    SistemaOperativo,
    TipoServidor,
    Usuario,
} from 'src/app/interfaces/types';
import { GeneralService } from 'src/app/services/general.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateUsuarioComponent } from '../create-usuario/create-usuario.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
})
export class MainComponent {
    usuarios: Usuario[] = [];
    roles: Rol[] = [];

    constructor(
        private generalService: GeneralService,
        private dialogService: DialogService
    ) {
        this.getUsuarios();
        this.getRoles();
    }

    getRoles() {
        this.generalService.ROLES.get().subscribe((res) => {
            this.roles = res;
        });
    }

    getRolById(id: number) {
        return this.roles.find((rol) => rol.id === id);
    }

    getUsuarios() {
        this.generalService.USUARIOS.get().subscribe((res) => {
            this.usuarios = res;
        });
    }

    openDialogCreateUsuario() {
        const dialog = this.dialogService.open(CreateUsuarioComponent, {
            header: 'Crear Usuario',
            width: '40%',
        });

        dialog.onClose.subscribe(() => {
            this.getUsuarios();
        });
    }

    openDialogEditUsuario(usuario: Usuario) {
        const dialog = this.dialogService.open(CreateUsuarioComponent, {
            header: 'Editar Usuario',
            width: '40%',
            data: usuario,
        });
        dialog.onClose.subscribe(() => {
            this.getUsuarios();
        });
    }

    deleteUsuario(usuario: Usuario) {
        this.generalService.USUARIOS.delete(usuario.id).subscribe(() => {
            this.getUsuarios();
        });
    }
}
