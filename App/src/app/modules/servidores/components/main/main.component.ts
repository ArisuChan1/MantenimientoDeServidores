import { Component } from '@angular/core';
import {
    Ambiente,
    Ciudad,
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
import { routesConfig } from 'src/app/routes/routesConfig';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    providers: [ConfirmationService],
})
export class MainComponent {
    routes = routesConfig;
    servidores: Servidor[] = [];
    listaServidores: ItemList[] = [];

    ciudades: Ciudad[] = [];
    sistemasOperativos: SistemaOperativo[] = [];
    ambientes: Ambiente[] = [];
    tipos: TipoServidor[] = [];

    constructor(
        private generalService: GeneralService,
        private dialogService: DialogService,
        private alerta: AlertaService,
        private confirmationService: ConfirmationService
    ) {
        this.getServidores();
        this.getCiudades();
        this.getSistemasOperativos();
        this.getAmbientes();
        this.getTipos();
        this.alerta.info('Seleccione un servidor para ver más detalles');
    }

    getServidores() {
        this.generalService.SERVIDORES.get().subscribe((res) => {
            this.servidores = res;
            this.setServidoresByCiudad();
        });
    }

    getCiudades() {
        this.generalService.CIUDADES.get().subscribe((res) => {
            this.ciudades = res;
            this.setServidoresByCiudad();
        });
    }

    getSistemasOperativos() {
        this.generalService.SISTEMAS_OPERATIVOS.get().subscribe((res) => {
            this.sistemasOperativos = res;
        });
    }

    getAmbientes() {
        this.generalService.AMBIENTES.get().subscribe((res) => {
            this.ambientes = res;
        });
    }

    getTipos() {
        this.generalService.TIPOS_SERVIDORES.get().subscribe((res) => {
            this.tipos = res;
        });
    }

    setServidoresByCiudad() {
        const lista: ItemList[] = [];
        this.ciudades.forEach((ciudad) => {
            const servidores = this.servidores.filter(
                (servidor) => servidor.idCiudad === ciudad.id
            );
            lista.push({ ciudad, servidores });
        });
        this.listaServidores = lista;
    }

    openDialogCreateServidor() {
        const dialog = this.dialogService.open(CreateServidorComponent, {
            header: 'Crear servidor',
        });
        dialog.onClose.subscribe(() => {
            this.getServidores();
        });
    }

    openDialogUpdateServidor(servidor: Servidor) {
        const dialog = this.dialogService.open(CreateServidorComponent, {
            header: 'Crear servidor',
            data: {
                id: servidor.id,
                servidor: servidor,
            },
        });
        dialog.onClose.subscribe(() => {
            this.getServidores();
        });
    }

    openDialogMantenimientos(servidor: Servidor) {
        const header = `Mantenimientos de ${servidor.nombre}`;
        const dialog = this.dialogService.open(MantenimientoServidorComponent, {
            header,
            width: '70%',
            data: {
                id: servidor.id,
                servidor: servidor,
            },
        });
        dialog.onClose.subscribe(() => {
            this.getServidores();
        });
    }

    openDialogBasesDeDatos(servidor: Servidor) {
        const dialog = this.dialogService.open(BasesDeDatosServidorComponent, {
            header: 'Bases de datos',
            width: '70%',
            data: {
                id: servidor.id,
                servidor: servidor,
            },
        });
        dialog.onClose.subscribe(() => {
            this.getServidores();
        });
    }

    getCiudadById(id: number) {
        return this.ciudades.find((ciudad) => ciudad.id === id);
    }

    getSistemaOperativoById(id: number) {
        return this.sistemasOperativos.find((sistema) => sistema.id === id);
    }

    getAmbienteById(id: number) {
        return this.ambientes.find((ambiente) => ambiente.id === id);
    }

    getTipoById(id: number) {
        return this.tipos.find((tipo) => tipo.id === id);
    }

    deleteServidor(id: number) {
        this.confirmationService.confirm({
            header: 'Eliminar servidor',
            message: '¿Estás seguro de que deseas eliminar el servidor?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.SERVIDORES.delete(id).subscribe(() => {
                    this.getServidores();
                });
            },
        });
    }
}

interface ItemList {
    ciudad: Ciudad;
    servidores: Servidor[];
}
