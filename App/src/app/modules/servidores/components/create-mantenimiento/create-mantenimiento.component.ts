import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
    EstadoMantenimiento,
    Mantenimiento,
    MantenimientoPostOrUpdate,
    Razon,
    Servidor,
    Usuario,
} from 'src/app/interfaces/types';
import { AlertaService } from 'src/app/services/alerta.service';
import { GeneralService } from 'src/app/services/general.service';
import { SESSION_KEY_USER } from 'src/config/config';

@Component({
    selector: 'app-create-mantenimiento',
    templateUrl: './create-mantenimiento.component.html',
})
export class CreateMantenimientoComponent {
    newMantenimiento: MantenimientoPostOrUpdate = {
        descripcion: '',
        idServidor: 0,
        idEstado: 1,
        idRazon: 0,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        idUsuario: 0,
        idBaseDeDatos: 0,
    };
    estados: EstadoMantenimiento[] = [];
    razones: Razon[] = [];
    servidores: Servidor[] = [];

    data: {
        id: number;
        idServidor: number;
        mantenimiento: Mantenimiento;
    } | null = null;

    constructor(
        private generalService: GeneralService,
        private alerta: AlertaService,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig
    ) {
        this.getRazones();
        this.getEstados();
        this.getServidores();
        this.getDataFromConfig();
    }

    getEstados() {
        this.generalService.ESTADOS_MANTENIMIENTO.get().subscribe((res) => {
            this.estados = res;
        });
    }

    getRazones() {
        this.generalService.RAZONES.get().subscribe((res) => {
            this.razones = res;
        });
    }

    getServidores() {
        this.generalService.SERVIDORES.get().subscribe((res) => {
            this.servidores = res;
        });
    }

    getDataFromConfig() {
        this.data = this.dialogConfig.data;

        if (this.data?.idServidor) {
            this.newMantenimiento.idServidor = this.data.idServidor;
        }
        console.log(
            '🚀 ~ file: create-mantenimiento.component.ts ~ line 86 ~ CreateMantenimientoComponent ~ getDataFromConfig ~ this.data',
            this.data
        );

        if (this.data?.mantenimiento) {
            this.newMantenimiento = {
                descripcion: this.data.mantenimiento.descripcion,
                idServidor: this.data.mantenimiento.idServidor,
                idEstado: this.data.mantenimiento.idEstado,
                idRazon: this.data.mantenimiento.idRazon,
                fechaInicio: new Date(this.data.mantenimiento.fechaInicio),
                fechaFin: new Date(this.data.mantenimiento.fechaFin),
                idUsuario: this.data.mantenimiento.idUsuario,
                idBaseDeDatos: this.data.mantenimiento.idBaseDeDatos,
            };
        }
    }

    validateForm() {
        return (
            this.newMantenimiento.descripcion &&
            (this.newMantenimiento.idServidor ||
                this.newMantenimiento.idBaseDeDatos) &&
            this.newMantenimiento.idEstado &&
            this.newMantenimiento.idRazon &&
            this.newMantenimiento.fechaInicio &&
            this.newMantenimiento.fechaFin &&
            this.newMantenimiento.idUsuario
        );
    }

    close() {
        this.dialogRef.close();
    }

    createOrUpdateMantenimiento() {
        const usuario = JSON.parse(
            sessionStorage.getItem(SESSION_KEY_USER) || '{}'
        ) as Usuario;

        console.log(
            '🚀 ~ file: create-mantenimiento.component.ts ~ line 113 ~ CreateMantenimientoComponent ~ createOrUpdateMantenimiento ~ usuario',
            usuario
        );

        this.newMantenimiento.idUsuario = usuario.id;

        this.newMantenimiento.idServidor =
            this.newMantenimiento.idServidor || null;
        this.newMantenimiento.idBaseDeDatos =
            this.newMantenimiento.idBaseDeDatos || null;

        console.log(
            '🚀 ~ file: create-mantenimiento.component.ts ~ line 123 ~ CreateMantenimientoComponent ~ createOrUpdateMantenimiento ~ this.newMantenimiento',
            this.validateForm()
        );

        if (!this.validateForm()) {
            this.alerta.warn('Faltan campos por llenar');
            return;
        }

        console.log(
            '🚀 ~ file: create-mantenimiento.component.ts ~ line 138 ~ CreateMantenimientoComponent ~ createOrUpdateMantenimiento ~ this.newMantenimiento',
            this.newMantenimiento
        );

        if (this.data.id) {
            this.generalService.MANTENIMIENTOS.put(
                this.data.id,
                this.newMantenimiento
            ).subscribe(
                () => {
                    this.alerta.success(
                        'Mantenimiento actualizado correctamente'
                    );
                    this.dialogRef.close();
                },
                () => {
                    this.alerta.error('Error al actualizar mantenimiento');
                }
            );
        } else {
            this.generalService.MANTENIMIENTOS.post(
                this.newMantenimiento
            ).subscribe(
                () => {
                    this.alerta.success('Mantenimiento creado correctamente');
                    this.dialogRef.close();
                },
                () => {
                    this.alerta.error('Error al crear mantenimiento');
                }
            );
        }
    }
}
