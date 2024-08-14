import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import {
    Ambiente,
    BaseDeDatos,
    Estado,
    Motor,
    Servidor,
} from 'src/app/interfaces/types';
import { AlertaService } from 'src/app/services/alerta.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-create-base-de-datos',
    templateUrl: './create-base-de-datos.component.html',
})
export class CreateBaseDeDatosComponent {
    newBaseDeDatos: BaseDeDatos = {
        id: 0,
        nombre: '',
        collation: '',
        descripcion: '',
        aplicaMantenimiento: false,
        idAmbiente: 0,
        idEstado: 4,
        idMotor: 0,
        idServidor: 0,
        requierePerfil: false,
    };

    ambientes: Ambiente[] = [];
    motores: Motor[] = [];
    estados: Estado[] = [];
    basesDeDatos: BaseDeDatos[] = [];

    data: {
        id: number;
        idServidor: number;
        servidor: Servidor;
        baseDeDatos: BaseDeDatos;
    } | null = null;

    servidores: Servidor[] = [];

    constructor(
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig,
        private alerta: AlertaService,
        private generalService: GeneralService
    ) {
        this.getDataFromConfig();
        this.getAmbientes();
        this.getMotores();
        this.getEstados();
        this.getBasesDeDatos();
        this.getServidores();
    }

    getServidores() {
        this.generalService.SERVIDORES.get().subscribe((res) => {
            this.servidores = res;
        });
    }

    getDataFromConfig() {
        this.data = this.dialogConfig.data;

        if (this.data?.idServidor) {
            this.newBaseDeDatos.idServidor = this.data.idServidor;
        }

        if (this.data?.servidor) {
            this.newBaseDeDatos.idServidor = this.data.servidor.id;
        }

        if (this.data?.baseDeDatos) {
            this.newBaseDeDatos = this.data.baseDeDatos;
        }
    }

    getMotores() {
        this.generalService.MOTORES.get().subscribe((res) => {
            this.motores = res;
        });
    }

    getEstados() {
        this.generalService.ESTADOS.get().subscribe((res) => {
            this.estados = res;
        });
    }

    getAmbientes() {
        this.generalService.AMBIENTES.get().subscribe((res) => {
            this.ambientes = res;
        });
    }

    getBasesDeDatos() {
        this.generalService.BASE_DE_DATOS.get().subscribe((res) => {
            this.basesDeDatos = res;
        });
    }

    validateForm() {
        if (
            this.basesDeDatos
                .filter((bd) => bd.id !== this.newBaseDeDatos.id)
                .map((bd) => bd.nombre.toLowerCase().trim())
                .includes(this.newBaseDeDatos.nombre.toLowerCase().trim())
        ) {
            alert('Ya existe una base de datos con ese nombre');
            return false;
        }

        const valido =
            this.newBaseDeDatos.nombre &&
            this.newBaseDeDatos.collation &&
            this.newBaseDeDatos.descripcion &&
            this.newBaseDeDatos.idAmbiente &&
            this.newBaseDeDatos.idEstado &&
            this.newBaseDeDatos.idMotor &&
            this.newBaseDeDatos.idServidor;

        if (!valido) {
            alert('Todos los campos son requeridos');
        }

        return valido;
    }

    handleActionButton() {
        if (!this.validateForm()) {
            return;
        }

        if (!this.data && !this.newBaseDeDatos.idServidor) {
            alert('No se ha seleccionado un servidor');
            return;
        }

        if (this.data?.id > 0) {
            this.newBaseDeDatos.idServidor = this.data.id;
        }

        if (this.newBaseDeDatos.id) this.update();
        else this.save();
    }

    validateCharactersFor(str: string, type: 1 | 2 | 3) {
        // 1. Nombre de Base de Datos (letras, números, guiones y guiones bajos)
        // 2. Collation (letras, números y guiones)
        // 3. Descripción (letras, números, guiones, guiones bajos y espacios)
        const regex = [
            /^[a-zA-Z0-9-_]+$/,
            /^[a-zA-Z0-9-]+$/,
            /^[a-zA-Z0-9-_ ]+$/,
        ];

        return regex[type - 1].test(str);
    }

    save() {
        this.generalService.BASE_DE_DATOS.post(this.newBaseDeDatos).subscribe(
            () => {
                this.alerta.success('Base de datos creada correctamente');
                this.dialogRef.close();
            },
            () => {
                this.alerta.error('Error al crear la base de datos');
            }
        );
    }

    update() {
        this.generalService.BASE_DE_DATOS.put(
            this.newBaseDeDatos.id,
            this.newBaseDeDatos
        ).subscribe(
            () => {
                this.alerta.success('Base de datos actualizada correctamente');
                this.dialogRef.close();
            },
            () => {
                alert('Error al actualizar la base de datos');
                this.alerta.error('Error al actualizar la base de datos');
            }
        );
    }

    close() {
        this.dialogRef.close();
    }
}
