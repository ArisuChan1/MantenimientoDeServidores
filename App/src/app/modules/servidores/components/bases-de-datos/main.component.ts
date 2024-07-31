import { Component } from '@angular/core';
import {
    Ambiente,
    BaseDeDatos,
    Ciudad,
    Motor,
    Servidor,
    SistemaOperativo,
    TipoServidor,
} from 'src/app/interfaces/types';
import { GeneralService } from 'src/app/services/general.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateServidorComponent } from '../create-servidor/create-servidor.component';
import { MantenimientoServidorComponent } from '../mantenimiento-servidor/mantenimiento-servidor.component';
import { BasesDeDatosServidorComponent } from '../bases-de-datos-servidor/bases-de-datos-servidor.component';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
    selector: 'app-bases-de-datos',
    templateUrl: './main.component.html',
})
export class BasesdeDatosComponent {
    servidores: Servidor[] = [];

    basesDeDatos: BaseDeDatos[] = [];
    listaBasesDeDatos: ItemListBaseDeDatos[] = [];

    ciudades: Ciudad[] = [];
    sistemasOperativos: SistemaOperativo[] = [];
    ambientes: Ambiente[] = [];
    tipos: TipoServidor[] = [];
    motores: Motor[] = [];

    constructor(
        private generalService: GeneralService,
        private dialogService: DialogService,
        private alerta: AlertaService
    ) {
        this.getServidores();
        this.getBasesDeDatos();
        this.getAmbientes();
        this.getMotores();
        this.alerta.info('Seleccione un servidor para ver más detalles');
    }

    getServidores() {
        this.generalService.SERVIDORES.get().subscribe((res) => {
            this.servidores = res;
            this.setBasesDeDatosByServidor();
        });
    }

    getBasesDeDatos() {
        this.generalService.BASE_DE_DATOS.get().subscribe((res) => {
            this.basesDeDatos = res;
            this.setBasesDeDatosByServidor();
        });
    }

    getAmbientes() {
        this.generalService.AMBIENTES.get().subscribe((res) => {
            this.ambientes = res;
        });
    }

    getMotores() {
        this.generalService.MOTORES.get().subscribe((res) => {
            this.motores = res;
        });
    }

    getMotorById(id: number) {
        return this.motores.find((motor) => motor.id === id);
    }

    setBasesDeDatosByServidor() {
        const lista: ItemListBaseDeDatos[] = [];
        this.servidores.forEach((servidor) => {
            const basesDeDatos = this.basesDeDatos.filter(
                (base) => base.idServidor === servidor.id
            );
            lista.push({ servidor, basesDeDatos });
        });

        this.listaBasesDeDatos = lista;
    }

    openDialogMantenimientos(baseDeDatos: BaseDeDatos) {
        const header = `Mantenimientos de DB - ${baseDeDatos.nombre}`;
        const dialog = this.dialogService.open(MantenimientoServidorComponent, {
            header,
            width: '70%',
            data: {
                id: baseDeDatos.id,
                baseDeDatos,
            },
        });
        dialog.onClose.subscribe(() => {
            this.getServidores();
        });
    }

    getAmbienteById(id: number) {
        return this.ambientes.find((ambiente) => ambiente.id === id);
    }

    deleteServidor(id: number) {
        this.generalService.SERVIDORES.delete(id).subscribe(() => {
            this.getServidores();
        });
    }
}

interface ItemListBaseDeDatos {
    servidor: Servidor;
    basesDeDatos: BaseDeDatos[];
}
