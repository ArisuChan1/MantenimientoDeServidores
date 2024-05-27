import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import {
    Ambiente,
    BaseDeDatos,
    EstadoMantenimiento,
    Mantenimiento,
    Razon,
    Servidor,
    Usuario,
} from 'src/app/interfaces/types';
import { CreateMantenimientoComponent } from 'src/app/modules/servidores/components/create-mantenimiento/create-mantenimiento.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
})
export class MainComponent {
    fechaSeleccionada = new Date();
    mantenimientos: Mantenimiento[] = [];
    mantenimientosByYear: Mantenimiento[] = [];
    mantenimientoSeleccionado: Mantenimiento | null = null;
    estadosMantenimiento: EstadoMantenimiento[] = [];
    estadosSeleccionados: EstadoMantenimiento[] = [];
    razones: Razon[] = [];
    basesDeDatos: BaseDeDatos[] = [];
    servidores: Servidor[] = [];
    usuarios: Usuario[] = [];
    ambientes: Ambiente[] = [];

    // Listas
    listaServidores: ItemListServidor[] = [];
    listaBasesDeDatos: ItemListBaseDeDatos[] = [];

    constructor(
        private generalService: GeneralService,
        private dialogService: DialogService
    ) {
        this.getRazones();
        this.getBasesDeDatos();
        this.getServidores();
        this.getEstadosMantenimiento();
        this.getMantenimientos();
        this.getUsuarios();
        this.getAmbientes();
    }

    getMantenimientos() {
        this.generalService.MANTENIMIENTOS.get().subscribe((res) => {
            this.mantenimientos = res;
            this.filterMantenimientos();
        });
    }

    filterMantenimientos() {
        this.mantenimientosByYear = this.mantenimientos
            .filter(
                (mantenimiento) =>
                    new Date(mantenimiento.fechaInicio).getFullYear() ===
                    this.fechaSeleccionada.getFullYear()
            )
            .filter((mantenimiento) => {
                if (this.estadosSeleccionados.length === 0) {
                    return true;
                }
                return this.estadosSeleccionados.includes(
                    this.getEstadoMantenimientoById(mantenimiento.idEstado)
                );
            });
        this.setMantenimientosByServidor();
        this.setMantenimientosByBaseDeDatos();
    }

    getRazones() {
        this.generalService.RAZONES.get().subscribe((res) => {
            this.razones = res;
        });
    }

    getBasesDeDatos() {
        this.generalService.BASE_DE_DATOS.get().subscribe((res) => {
            this.basesDeDatos = res;
            this.setMantenimientosByBaseDeDatos();
        });
    }

    getServidores() {
        this.generalService.SERVIDORES.get().subscribe((res) => {
            this.servidores = res;
            this.setMantenimientosByServidor();
        });
    }

    getEstadosMantenimiento() {
        this.generalService.ESTADOS_MANTENIMIENTO.get().subscribe((res) => {
            this.estadosMantenimiento = res;
        });
    }

    getUsuarios() {
        this.generalService.USUARIOS.get().subscribe((res) => {
            this.usuarios = res;
        });
    }

    getAmbientes() {
        this.generalService.AMBIENTES.get().subscribe((res) => {
            this.ambientes = res;
        });
    }

    getRazonById(id: number) {
        return this.razones.find((razon) => razon.id === id);
    }

    getBaseDeDatosById(id: number) {
        return this.basesDeDatos.find((base) => base.id === id);
    }

    getServidorById(id: number) {
        return this.servidores.find((servidor) => servidor.id === id);
    }

    getUsuarioById(id: number) {
        return this.usuarios.find((usuario) => usuario.id === id);
    }

    getEstadoMantenimientoById(id: number) {
        return this.estadosMantenimiento.find((estado) => estado.id === id);
    }

    getAmbienteById(id: number) {
        return this.ambientes.find((ambiente) => ambiente.id === id);
    }

    getServidorByBaseDeDatosId(id: number) {
        const base = this.getBaseDeDatosById(id);
        return this.getServidorById(base.idServidor);
    }

    getAmbienteByBaseDeDatosId(id: number) {
        const base = this.getBaseDeDatosById(id);

        return this.getAmbienteById(base.idAmbiente);
    }

    setMantenimientosByServidor() {
        const lista: ItemListServidor[] = [];
        this.servidores.forEach((servidor) => {
            const mantenimientos = this.mantenimientosByYear.filter(
                (mantenimiento) => mantenimiento.idServidor === servidor.id
            );
            lista.push({ servidor, mantenimientos });
        });
        this.listaServidores = lista;
    }

    setMantenimientosByBaseDeDatos() {
        const lista: ItemListBaseDeDatos[] = [];
        this.basesDeDatos.forEach((base) => {
            const mantenimientos = this.mantenimientosByYear.filter(
                (mantenimiento) => mantenimiento.idBaseDeDatos === base.id
            );
            lista.push({ baseDeDatos: base, mantenimientos });
        });
        this.listaBasesDeDatos = lista;
    }

    openModalMantenimiento(mantenimiento: Mantenimiento) {
        const dialog = this.dialogService.open(CreateMantenimientoComponent, {
            header: 'Editar mantenimiento',
            data: {
                id: mantenimiento.id,
                mantenimiento: mantenimiento,
            },
        });
        dialog.onClose.subscribe(() => {
            this.getMantenimientos();
        });
    }
}

interface ItemListServidor {
    servidor: Servidor;
    mantenimientos: Mantenimiento[];
}

interface ItemListBaseDeDatos {
    baseDeDatos: BaseDeDatos;
    mantenimientos: Mantenimiento[];
}
