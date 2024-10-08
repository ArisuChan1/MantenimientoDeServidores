import { Component } from '@angular/core';
import {
    Ambiente,
    BaseDeDatos,
    Ciudad,
    Motor,
    Servidor,
    SistemaOperativo,
    TipoServidor,
    Usuario,
} from 'src/app/interfaces/types';
import { GeneralService } from 'src/app/services/general.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateServidorComponent } from '../create-servidor/create-servidor.component';
import { MantenimientoServidorComponent } from '../mantenimiento-servidor/mantenimiento-servidor.component';
import { BasesDeDatosServidorComponent } from '../bases-de-datos-servidor/bases-de-datos-servidor.component';
import { AlertaService } from 'src/app/services/alerta.service';
import { CreateBaseDeDatosComponent } from '../create-base-de-datos/create-base-de-datos.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'app-bases-de-datos',
    templateUrl: './main.component.html',
    providers: [ConfirmationService],
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

    idServidor: number | null = null;

    usuarioActual: Usuario;

    constructor(
        private generalService: GeneralService,
        private dialogService: DialogService,
        private alerta: AlertaService,
        private activatedRoute: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private authService: AuthService
    ) {
        this.getServidorIdFromRoute();
        this.setUsuarioActual();
        this.getServidores();
        this.getBasesDeDatos();
        this.getAmbientes();
        this.getMotores();
        this.alerta.info('Seleccione un servidor para ver más detalles');
    }

    setUsuarioActual() {
        this.usuarioActual = this.authService.getUsuario();
    }

    getServidorIdFromRoute() {
        return this.activatedRoute.paramMap.subscribe((params) => {
            const idServidor = Number(params.get('idServidor'));
            this.idServidor = idServidor;
            this.setBasesDeDatosByServidor();
        });
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
        let servidores = structuredClone(this.servidores);
        if (this.idServidor && !isNaN(this.idServidor)) {
            servidores = servidores.filter(
                (servidor) => servidor.id === this.idServidor
            );
        }

        servidores.forEach((servidor) => {
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
                idBaseDeDatos: baseDeDatos.id,
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

    openCreateBaseDeDatosDialog() {
        const dialog = this.dialogService.open(CreateBaseDeDatosComponent, {
            header: 'Crear base de datos',
            width: '70%',
        });
        dialog.onClose.subscribe(() => {
            this.getBasesDeDatos();
        });
    }

    openUpdateBaseDeDatosDialog(baseDeDatos: BaseDeDatos) {
        const dialog = this.dialogService.open(CreateBaseDeDatosComponent, {
            data: { idServidor: baseDeDatos.idServidor, baseDeDatos },
            header: 'Actualizar base de datos',
            width: '70%',
        });
        dialog.onClose.subscribe(() => {
            this.getBasesDeDatos();
        });
    }

    deleteBaseDeDatos(baseDeDatos: BaseDeDatos) {
        this.confirmationService.confirm({
            header: 'Eliminar base de datos',
            message: '¿Estás seguro de que deseas eliminar la base de datos?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.BASE_DE_DATOS.delete(
                    baseDeDatos.id
                ).subscribe(
                    () => {
                        this.basesDeDatos = this.basesDeDatos.filter(
                            (bd) => bd.id !== baseDeDatos.id
                        );
                        this.setBasesDeDatosByServidor();
                    },
                    () => {
                        this.alerta.error(
                            'No se pudo eliminar la base de datos'
                        );
                    }
                );
            },
        });
    }
}

interface ItemListBaseDeDatos {
    servidor: Servidor;
    basesDeDatos: BaseDeDatos[];
}
