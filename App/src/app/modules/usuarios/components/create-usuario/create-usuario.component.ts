import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Rol, Usuario, UsuarioPostOrUpdate } from 'src/app/interfaces/types';
import { AlertaService } from 'src/app/services/alerta.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-create-usuario',
    templateUrl: './create-usuario.component.html',
})
export class CreateUsuarioComponent {
    usuarios: Usuario[] = [];
    roles: Rol[] = [];

    newUsuario: UsuarioPostOrUpdate = {
        alias: '',
        correo: '',
        idRol: 0,
        nombreCompleto: '',
        password: '',
    };

    data: Usuario;

    constructor(
        private generalService: GeneralService,
        private alerta: AlertaService,
        private dialogConfig: DynamicDialogConfig,
        private dialogRef: DynamicDialogRef
    ) {
        this.getConfigFromData();
        this.getUsuarios();
        this.getRoles();
    }

    getConfigFromData() {
        const data = this.dialogConfig.data;

        if (data) {
            this.data = data;
        }

        if (this.data) {
            this.newUsuario = {
                alias: this.data.alias,
                correo: this.data.correo,
                idRol: this.data.idRol,
                nombreCompleto: this.data.nombreCompleto,
                password: this.data.password,
            };
        }
    }

    getRoles() {
        this.generalService.ROLES.get().subscribe((res) => {
            this.roles = res;
        });
    }

    getUsuarios() {
        this.generalService.USUARIOS.get().subscribe((res) => {
            this.usuarios = res;
        });
    }

    save() {
        this.generalService.USUARIOS.post(this.newUsuario).subscribe({
            next: () => {
                this.close();
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    update() {
        if (!this.data) {
            alert('No se ha seleccionado un usuario');
            return;
        }
        this.generalService.USUARIOS.put(
            this.data.id,
            this.newUsuario
        ).subscribe({
            next: () => {
                this.close();
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    close() {
        this.dialogRef.close();
    }
}
