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

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
})
export class MainComponent {
    servidores: Servidor[] = [];
    listaServidores: ItemList[] = [];

    ciudades: Ciudad[] = [];
    sistemasOperativos: SistemaOperativo[] = [];
    ambientes: Ambiente[] = [];
    tipos: TipoServidor[] = [];

    constructor(
        private generalService: GeneralService,
        private dialogService: DialogService
    ) {
        this.getServidores();
        this.getCiudades();
        this.getSistemasOperativos();
        this.getAmbientes();
        this.getTipos();
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
        this.generalService.SERVIDORES.delete(id).subscribe(() => {
            this.getServidores();
        });
    }
}

interface ItemList {
    ciudad: Ciudad;
    servidores: Servidor[];
}
