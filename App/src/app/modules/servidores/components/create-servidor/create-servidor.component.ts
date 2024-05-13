import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
    Ambiente,
    Ciudad,
    Servidor,
    ServidorPostOrUpdate,
    SistemaOperativo,
    TipoServidor,
} from 'src/app/interfaces/types';
import { AlertaService } from 'src/app/services/alerta.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-create-servidor',
    templateUrl: './create-servidor.component.html',
})
export class CreateServidorComponent {
    sistemasOperativos: SistemaOperativo[] = [];
    ambientes: Ambiente[] = [];
    ciudades: Ciudad[] = [];
    tipos: TipoServidor[] = [];
    servidores: Servidor[] = [];

    data: {
        id: number;
        servidor: Servidor;
    } | null = null;

    newServidor: ServidorPostOrUpdate = {
        nombre: '',
        descripcion: '',
        dominio: '',
        aplicaMantenimiento: true,
        idAmbiente: 0,
        idCiudad: 0,
        idEstado: 4,
        idSistemaOperativo: 0,
        idTipo: 0,
        requierePerfil: false,
    };

    constructor(
        private generalService: GeneralService,
        private alerta: AlertaService,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig
    ) {
        this.getDataFromConfig();
        this.getSistemasOperativos();
        this.getAmbientes();
        this.getCiudades();
        this.getTipos();
        this.getServidores();
    }

    getDataFromConfig() {
        this.data = this.dialogConfig.data;
        if (this.data) {
            this.newServidor = {
                nombre: this.data.servidor.nombre,
                descripcion: this.data.servidor.descripcion,
                dominio: this.data.servidor.dominio,
                aplicaMantenimiento: this.data.servidor.aplicaMantenimiento,
                idAmbiente: this.data.servidor.idAmbiente,
                idCiudad: this.data.servidor.idCiudad,
                idEstado: this.data.servidor.idEstado,
                idSistemaOperativo: this.data.servidor.idSistemaOperativo,
                idTipo: this.data.servidor.idTipo,
                requierePerfil: this.data.servidor.requierePerfil,
            };
        }
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

    getCiudades() {
        this.generalService.CIUDADES.get().subscribe((res) => {
            this.ciudades = res;
        });
    }

    getTipos() {
        this.generalService.TIPOS_SERVIDORES.get().subscribe((res) => {
            this.tipos = res;
        });
    }

    getServidores() {
        this.generalService.SERVIDORES.get().subscribe((res) => {
            this.servidores = res;
        });
    }

    validateForm() {
        if (
            this.servidores
                .map((s) => s.nombre)
                .includes(this.newServidor.nombre)
        ) {
            this.alerta.warn('Ya existe un servidor con ese nombre');
            return false;
        }

        const valido =
            this.newServidor.nombre &&
            this.newServidor.descripcion &&
            this.newServidor.dominio &&
            this.newServidor.idAmbiente &&
            this.newServidor.idCiudad &&
            this.newServidor.idSistemaOperativo &&
            this.newServidor.idTipo;

        if (!valido) {
            this.alerta.warn('Todos los campos son requeridos');
        }

        return valido;
    }

    createServidor() {
        if (!this.validateForm()) {
            return;
        }
        this.generalService.SERVIDORES.post(this.newServidor).subscribe(
            (res) => {
                this.alerta.success('Servidor creado correctamente');
                this.dialogRef.close();
            }
        );
    }

    updateServidor() {
        if (!this.validateForm()) {
            this.alerta.warn('Todos los campos son requeridos');
            return;
        }
        if (!this.data) return this.createServidor();

        this.generalService.SERVIDORES.put(
            this.data.id,
            this.newServidor
        ).subscribe((res) => {
            this.alerta.success('Servidor actualizado correctamente');
            this.dialogRef.close();
        });
    }

    close() {
        this.dialogRef.close();
    }
}
