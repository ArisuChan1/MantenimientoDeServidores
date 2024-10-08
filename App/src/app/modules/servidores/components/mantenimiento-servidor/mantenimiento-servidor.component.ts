import { Component } from '@angular/core';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import {
    Ambiente,
    BaseDeDatos,
    Ciudad,
    EstadoMantenimiento,
    Mantenimiento,
    Razon,
    Servidor,
    SistemaOperativo,
    TipoServidor,
    Usuario,
} from 'src/app/interfaces/types';
import { AlertaService } from 'src/app/services/alerta.service';
import { GeneralService } from 'src/app/services/general.service';
import { CreateMantenimientoComponent } from '../create-mantenimiento/create-mantenimiento.component';
import { EditPerfilComponent } from '../edit-perfil/edit-perfil.component';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'app-mantenimiento-servidor',
    templateUrl: './mantenimiento-servidor.component.html',
    providers: [ConfirmationService],
})
export class MantenimientoServidorComponent {
    sistemasOperativos: SistemaOperativo[] = [];
    ambientes: Ambiente[] = [];
    ciudades: Ciudad[] = [];
    tipos: TipoServidor[] = [];
    mantenimientos: Mantenimiento[] = [];
    manteniemientosByServidor: Mantenimiento[] = [];
    razones: Razon[] = [];
    basesDeDatos: BaseDeDatos[] = [];
    servidores: Servidor[] = [];
    usuarios: Usuario[] = [];
    estadosManteniemiento: EstadoMantenimiento[] = [];

    data: {
        id: number;
        servidor: Servidor | null;
        baseDeDatos: BaseDeDatos | null;
    } | null = null;

    usuarioActual: Usuario;

    constructor(
        private generalService: GeneralService,
        private alerta: AlertaService,
        private dialogService: DialogService,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig,
        private confirmationService: ConfirmationService,
        private authService: AuthService
    ) {
        this.setUsuarioActual();
        this.getDataFromConfig();
        this.getSistemasOperativos();
        this.getAmbientes();
        this.getCiudades();
        this.getTipos();
        this.getMantenimientos();
        this.getEstadosMantenimiento();
        this.getRazones();
        this.getBasesDeDatos();
        this.getServidores();
        this.getUsuarios();
    }

    getDataFromConfig() {
        this.data = this.dialogConfig.data;
        if (this.data) {
        }
    }

    setUsuarioActual() {
        this.usuarioActual = this.authService.getUsuario();
    }

    getRazones() {
        this.generalService.RAZONES.get().subscribe((res) => {
            this.razones = res;
        });
    }

    getBasesDeDatos() {
        this.generalService.BASE_DE_DATOS.get().subscribe((res) => {
            this.basesDeDatos = res;
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

    getUsuarios() {
        this.generalService.USUARIOS.get().subscribe((res) => {
            this.usuarios = res;
        });
    }

    getMantenimientos() {
        this.generalService.MANTENIMIENTOS.get().subscribe((res) => {
            this.mantenimientos = res;
            this.setMantenimientos();
        });
    }

    getEstadosMantenimiento() {
        this.generalService.ESTADOS_MANTENIMIENTO.get().subscribe((res) => {
            this.estadosManteniemiento = res;
        });
    }

    getEstadoMantenimientoById(id: number) {
        return this.estadosManteniemiento.find((estado) => estado.id === id);
    }

    setMantenimientos() {
        if (this.data?.servidor) {
            this.setMantenimientosByServidor();
        } else {
            this.setMantenimientosByBaseDeDatos();
        }
    }

    setMantenimientosByServidor() {
        this.manteniemientosByServidor = this.mantenimientos.filter(
            (mantenimiento) => mantenimiento.idServidor === this.data?.id
        );
    }

    setMantenimientosByBaseDeDatos() {
        this.manteniemientosByServidor = this.mantenimientos.filter(
            (mantenimiento) =>
                mantenimiento.idBaseDeDatos === this.data?.baseDeDatos?.id
        );
    }

    openDialogCreateMantenimiento() {
        const dialog = this.dialogService.open(CreateMantenimientoComponent, {
            header: 'Crear mantenimiento',
            data: {
                idServidor: this.data?.id,
                idBaseDeDatos: this.data?.baseDeDatos?.id,
            },
        });
        dialog.onClose.subscribe(() => {
            this.getMantenimientos();
        });
    }

    openModalEditPerfil(mantenimiento: Mantenimiento) {
        this.dialogService.open(EditPerfilComponent, {
            header: 'Editar perfil',
            data: {
                idMantenimiento: mantenimiento.id,
                mantenimiento: mantenimiento,
            },
        });
    }

    openDialogUpdateMantenimiento(mantenimiento: Mantenimiento) {
        const dialog = this.dialogService.open(CreateMantenimientoComponent, {
            header: 'Actualizar mantenimiento',
            data: {
                id: mantenimiento.id,
                idServidor: mantenimiento.idServidor,
                idBaseDeDatos: mantenimiento.idBaseDeDatos,
                mantenimiento: mantenimiento,
            },
        });
        dialog.onClose.subscribe(() => {
            this.getMantenimientos();
        });
    }

    deleteMantenimiento(id: number) {
        this.confirmationService.confirm({
            header: 'Eliminar mantenimiento',
            message: '¿Estás seguro de que deseas eliminar el mantenimiento?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.MANTENIMIENTOS.delete(id).subscribe(() => {
                    this.getMantenimientos();
                });
            },
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
}
