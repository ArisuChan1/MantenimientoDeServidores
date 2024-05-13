import { Component } from '@angular/core';
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
        servidor: Servidor;
        baseDeDatos: BaseDeDatos;
    } | null = null;

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
    }

    getDataFromConfig() {
        this.data = this.dialogConfig.data;

        if (this.data) {
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
                .map((bd) => bd.nombre)
                .includes(this.newBaseDeDatos.nombre)
        ) {
            this.alerta.warn('Ya existe una base de datos con ese nombre');
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
            this.alerta.warn('Algunos campos son inválidos');
        }

        return valido;
    }

    handleActionButton() {
        console.log({
            newBaseDeDatos: this.newBaseDeDatos,
            data: this.data,
        });

        if (!this.validateForm()) {
            this.alerta.warn('Algunos campos son inválidos');
            return;
        }

        if (!this.data) {
            this.alerta.warn('No se ha seleccionado un servidor');
            return;
        }

        this.newBaseDeDatos.idServidor = this.data.id;

        if (this.newBaseDeDatos.id) this.update();
        else this.save();
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
                this.alerta.error('Error al actualizar la base de datos');
            }
        );
    }

    close() {
        this.dialogRef.close();
    }
}
