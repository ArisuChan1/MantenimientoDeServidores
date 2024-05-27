import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {
    Ambiente,
    BaseDeDatos,
    Motor,
    Servidor,
} from 'src/app/interfaces/types';
import { CreateBaseDeDatosComponent } from '../create-base-de-datos/create-base-de-datos.component';
import { GeneralService } from 'src/app/services/general.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { MantenimientoServidorComponent } from '../mantenimiento-servidor/mantenimiento-servidor.component';

@Component({
    selector: 'app-bases-de-datos-servidor',
    templateUrl: './bases-de-datos-servidor.component.html',
})
export class BasesDeDatosServidorComponent {
    data: {
        id: number;
        servidor: Servidor;
    } | null = null;
    basesDeDatos: BaseDeDatos[] = [];
    basesDeDatosByServidor: BaseDeDatos[] = [];
    ambientes: Ambiente[] = [];
    motores: Motor[] = [];

    constructor(
        private generalService: GeneralService,
        private dialogService: DialogService,
        private dialogConfig: DynamicDialogConfig,
        private alerta: AlertaService
    ) {
        this.getDataFromConfig();
        this.getAmbientes();
        this.getMotores();
        this.getBasesDeDatos();
    }

    getMotores() {
        this.generalService.MOTORES.get().subscribe((res) => {
            this.motores = res;
        });
    }

    getAmbientes() {
        this.generalService.AMBIENTES.get().subscribe((res) => {
            this.ambientes = res;
        });
    }

    getBasesDeDatos() {
        this.generalService.BASE_DE_DATOS.get().subscribe((res) => {
            this.basesDeDatos = res.filter((db) => db.aplicaMantenimiento);
            this.setBasesDeDatosByServidor();
        });
    }

    setBasesDeDatosByServidor() {
        this.basesDeDatosByServidor = this.basesDeDatos.filter(
            (baseDeDatos) => baseDeDatos.idServidor === this.data.servidor.id
        );
    }

    getAmbienteById(id: number) {
        return this.ambientes.find((ambiente) => ambiente.id === id);
    }

    getMotorById(id: number) {
        return this.motores.find((motor) => motor.id === id);
    }

    getDataFromConfig() {
        this.data = this.dialogConfig.data;
    }

    openCreateBaseDeDatosDialog() {
        const dialog = this.dialogService.open(CreateBaseDeDatosComponent, {
            data: this.data,
            header: 'Crear base de datos',
            width: '70%',
        });
        dialog.onClose.subscribe(() => {
            this.getBasesDeDatos();
        });
    }

    openUpdateBaseDeDatosDialog(baseDeDatos: BaseDeDatos) {
        const dialog = this.dialogService.open(CreateBaseDeDatosComponent, {
            data: { ...this.data, baseDeDatos },
            header: 'Actualizar base de datos',
            width: '70%',
        });
        dialog.onClose.subscribe(() => {
            this.getBasesDeDatos();
        });
    }

    deleteBaseDeDatos(baseDeDatos: BaseDeDatos) {
        this.generalService.BASE_DE_DATOS.delete(baseDeDatos.id).subscribe(
            () => {
                this.basesDeDatos = this.basesDeDatos.filter(
                    (bd) => bd.id !== baseDeDatos.id
                );
                this.setBasesDeDatosByServidor();
            },
            () => {
                this.alerta.error('No se pudo eliminar la base de datos');
            }
        );
    }

    openDialogMantenimientos(baseDeDatos: BaseDeDatos) {
        const header = `Mantenimientos de la base de datos: ${baseDeDatos.nombre}`;
        const dialog = this.dialogService.open(MantenimientoServidorComponent, {
            header,
            width: '70%',
            data: {
                id: baseDeDatos.id,
                baseDeDatos,
            },
        });

        dialog.onClose.subscribe(() => {
            this.getBasesDeDatos();
        });
    }
}
