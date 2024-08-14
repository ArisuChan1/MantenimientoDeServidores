import { Component } from '@angular/core';
import { Rol, Usuario } from 'src/app/interfaces/types';
import { GeneralService } from 'src/app/services/general.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateUsuarioComponent } from '../create-usuario/create-usuario.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    providers: [ConfirmationService],
})
export class MainComponent {
    usuarios: Usuario[] = [];
    roles: Rol[] = [];

    constructor(
        private generalService: GeneralService,
        private dialogService: DialogService,
        private confirmationService: ConfirmationService
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
        this.confirmationService.confirm({
            header: 'Eliminar usuario',
            message: '¿Estás seguro de que deseas eliminar el usuario?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.USUARIOS.delete(usuario.id).subscribe(
                    () => {
                        this.getUsuarios();
                    }
                );
            },
        });
    }
}
