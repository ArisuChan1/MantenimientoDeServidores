import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
    Ambiente,
    AmbientePostOrUpdate,
    BaseDeDatos,
    BaseDeDatosPostOrUpdate,
    Ciudad,
    CiudadPostOrUpdate,
    Estado,
    EstadoPostOrUpdate,
    EstadoMantenimiento,
    EstadoMantenimientoPostOrUpdate,
    Mantenimiento,
    Motor,
    MotorPostOrUpdate,
    Pais,
    PaisPostOrUpdate,
    Permiso,
    PermisoPostOrUpdate,
    Razon,
    RazonPostOrUpdate,
    Region,
    RegionPostOrUpdate,
    Rol,
    RolPostOrUpdate,
    RolXPermiso,
    RolXPermisoPostOrUpdate,
    Servidor,
    ServidorPostOrUpdate,
    SistemaOperativo,
    SistemaOperativoPostOrUpdate,
    TipoServidor,
    TipoServidorPostOrUpdate,
    Usuario,
    UsuarioPostOrUpdate,
} from 'src/app/interfaces/types';
import { SESSION_KEY_USER, WEB_API_URL } from 'src/config/config';

// Ambientes
// BaseDeDatos
// Ciudades
// Estados
// EstadosMantenimiento
// Mantenimientos
// Motores
// Paises
// Permisos
// Razones
// Regiones
// Roles
// RolesXPermisos
// Servidores
// SistemasOperativos
// TiposServidores
// Usuarios

const URL_AMBIENTES = `${WEB_API_URL}/Ambientes`;
const URL_BASE_DE_DATOS = `${WEB_API_URL}/BaseDeDatos`;
const URL_CIUDADES = `${WEB_API_URL}/Ciudades`;
const URL_ESTADOS = `${WEB_API_URL}/Estados`;
const URL_ESTADOS_MANTENIMIENTO = `${WEB_API_URL}/EstadosMantenimiento`;
const URL_MANTENIMIENTOS = `${WEB_API_URL}/Mantenimientos`;
const URL_MOTORES = `${WEB_API_URL}/Motores`;
const URL_PAISES = `${WEB_API_URL}/Paises`;
const URL_PERMISOS = `${WEB_API_URL}/Permisos`;
const URL_RAZONES = `${WEB_API_URL}/Razones`;
const URL_REGIONES = `${WEB_API_URL}/Regiones`;
const URL_ROLES = `${WEB_API_URL}/Roles`;
const URL_ROLES_X_PERMISOS = `${WEB_API_URL}/RolesXPermisos`;
const URL_SERVIDORES = `${WEB_API_URL}/Servidores`;
const URL_SISTEMAS_OPERATIVOS = `${WEB_API_URL}/SistemasOperativos`;
const URL_TIPOS_SERVIDORES = `${WEB_API_URL}/TiposServidores`;
const URL_USUARIOS = `${WEB_API_URL}/Usuarios`;

@Injectable({
    providedIn: 'root',
})
export class GeneralService {
    constructor(private http: HttpClient, private router: Router) {}

    AMBIENTES = {
        get: () => this.http.get<Ambiente[]>(URL_AMBIENTES),
        getById: (id: number) =>
            this.http.get<Ambiente>(`${URL_AMBIENTES}/${id}`),
        post: (ambiente: Ambiente) => this.http.post(URL_AMBIENTES, ambiente),
        put: (id: number, ambiente: AmbientePostOrUpdate) =>
            this.http.put(`${URL_AMBIENTES}/${id}`, ambiente),
        delete: (id: number) => this.http.delete(`${URL_AMBIENTES}/${id}`),
    };

    BASE_DE_DATOS = {
        get: () => this.http.get<BaseDeDatos[]>(URL_BASE_DE_DATOS),
        getById: (id: number) =>
            this.http.get<BaseDeDatos>(`${URL_BASE_DE_DATOS}/${id}`),
        post: (baseDeDatos: BaseDeDatos) =>
            this.http.post(URL_BASE_DE_DATOS, baseDeDatos),
        put: (id: number, baseDeDatos: BaseDeDatosPostOrUpdate) =>
            this.http.put(`${URL_BASE_DE_DATOS}/${id}`, baseDeDatos),
        delete: (id: number) => this.http.delete(`${URL_BASE_DE_DATOS}/${id}`),
    };

    BASES_DE_DATOS_BY_SERVIDOR = {
        get: async (idServidor: number) => {
            const baseDeDatos = await firstValueFrom(this.BASE_DE_DATOS.get());
            const baseDeDatosByServidor = baseDeDatos.filter(
                (baseDeDato) => baseDeDato.idServidor === idServidor
            );
            return baseDeDatosByServidor;
        },
    };

    CIUDADES = {
        get: () => this.http.get<Ciudad[]>(URL_CIUDADES),
        getById: (id: number) => this.http.get<Ciudad>(`${URL_CIUDADES}/${id}`),
        post: (ciudad: Ciudad) => this.http.post(URL_CIUDADES, ciudad),
        put: (id: number, ciudad: CiudadPostOrUpdate) =>
            this.http.put(`${URL_CIUDADES}/${id}`, ciudad),
        delete: (id: number) => this.http.delete(`${URL_CIUDADES}/${id}`),
    };

    ESTADOS = {
        get: () => this.http.get<Estado[]>(URL_ESTADOS),
        getById: (id: number) => this.http.get<Estado>(`${URL_ESTADOS}/${id}`),
        post: (estado: Estado) => this.http.post(URL_ESTADOS, estado),
        put: (id: number, estado: EstadoPostOrUpdate) =>
            this.http.put(`${URL_ESTADOS}/${id}`, estado),
        delete: (id: number) => this.http.delete(`${URL_ESTADOS}/${id}`),
    };

    ESTADOS_MANTENIMIENTO = {
        get: () =>
            this.http.get<EstadoMantenimiento[]>(URL_ESTADOS_MANTENIMIENTO),
        getById: (id: number) =>
            this.http.get<EstadoMantenimiento>(
                `${URL_ESTADOS_MANTENIMIENTO}/${id}`
            ),
        post: (estadoMantenimiento: EstadoMantenimiento) =>
            this.http.post(URL_ESTADOS_MANTENIMIENTO, estadoMantenimiento),
        put: (
            id: number,
            estadoMantenimiento: EstadoMantenimientoPostOrUpdate
        ) =>
            this.http.put(
                `${URL_ESTADOS_MANTENIMIENTO}/${id}`,
                estadoMantenimiento
            ),
        delete: (id: number) =>
            this.http.delete(`${URL_ESTADOS_MANTENIMIENTO}/${id}`),
    };

    MANTENIMIENTOS = {
        get: () => this.http.get<Mantenimiento[]>(URL_MANTENIMIENTOS),
        getById: (id: number) =>
            this.http.get<Mantenimiento>(`${URL_MANTENIMIENTOS}/${id}`),
        post: (mantenimiento: Mantenimiento) =>
            this.http.post(URL_MANTENIMIENTOS, mantenimiento),
        put: (id: number, mantenimiento: Mantenimiento) =>
            this.http.put(`${URL_MANTENIMIENTOS}/${id}`, mantenimiento),
        delete: (id: number) => this.http.delete(`${URL_MANTENIMIENTOS}/${id}`),
    };

    MANTENIMIENTOS_BY_SERVIDOR = {
        get: async (idServidor: number) => {
            const mantenimientos = await firstValueFrom(
                this.MANTENIMIENTOS.get()
            );
            const mantenimientosByServidor = mantenimientos.filter(
                (mantenimiento) => mantenimiento.idServidor === idServidor
            );
            return mantenimientosByServidor;
        },
    };

    MANTENIMIENTOS_BY_USUARIO = {
        get: async (idUsuario: number) => {
            const mantenimientos = await firstValueFrom(
                this.MANTENIMIENTOS.get()
            );
            const mantenimientosByUsuario = mantenimientos.filter(
                (mantenimiento) => mantenimiento.idUsuario === idUsuario
            );
            return mantenimientosByUsuario;
        },
    };

    MOTORES = {
        get: () => this.http.get<Motor[]>(URL_MOTORES),
        getById: (id: number) => this.http.get<Motor>(`${URL_MOTORES}/${id}`),
        post: (motor: Motor) => this.http.post(URL_MOTORES, motor),
        put: (id: number, motor: MotorPostOrUpdate) =>
            this.http.put(`${URL_MOTORES}/${id}`, motor),
        delete: (id: number) => this.http.delete(`${URL_MOTORES}/${id}`),
    };

    PAISES = {
        get: () => this.http.get<Pais[]>(URL_PAISES),
        getById: (id: number) => this.http.get<Pais>(`${URL_PAISES}/${id}`),
        post: (pais: Pais) => this.http.post(URL_PAISES, pais),
        put: (id: number, pais: PaisPostOrUpdate) =>
            this.http.put(`${URL_PAISES}/${id}`, pais),
        delete: (id: number) => this.http.delete(`${URL_PAISES}/${id}`),
    };

    PERMISOS = {
        get: () => this.http.get<Permiso[]>(URL_PERMISOS),
        getById: (id: number) =>
            this.http.get<Permiso>(`${URL_PERMISOS}/${id}`),
        post: (permiso: Permiso) => this.http.post(URL_PERMISOS, permiso),
        put: (id: number, permiso: PermisoPostOrUpdate) =>
            this.http.put(`${URL_PERMISOS}/${id}`, permiso),
        delete: (id: number) => this.http.delete(`${URL_PERMISOS}/${id}`),
    };

    RAZONES = {
        get: () => this.http.get<Razon[]>(URL_RAZONES),
        getById: (id: number) => this.http.get<Razon>(`${URL_RAZONES}/${id}`),
        post: (razon: Razon) => this.http.post(URL_RAZONES, razon),
        put: (id: number, razon: RazonPostOrUpdate) =>
            this.http.put(`${URL_RAZONES}/${id}`, razon),
        delete: (id: number) => this.http.delete(`${URL_RAZONES}/${id}`),
    };

    REGIONES = {
        get: () => this.http.get<Region[]>(URL_REGIONES),
        getById: (id: number) => this.http.get<Region>(`${URL_REGIONES}/${id}`),
        post: (region: Region) => this.http.post(URL_REGIONES, region),
        put: (id: number, region: RegionPostOrUpdate) =>
            this.http.put(`${URL_REGIONES}/${id}`, region),
        delete: (id: number) => this.http.delete(`${URL_REGIONES}/${id}`),
    };

    ROLES = {
        get: () => this.http.get<Rol[]>(URL_ROLES),
        getById: (id: number) => this.http.get<Rol>(`${URL_ROLES}/${id}`),
        post: (rol: Rol) => this.http.post(URL_ROLES, rol),
        put: (id: number, rol: RolPostOrUpdate) =>
            this.http.put(`${URL_ROLES}/${id}`, rol),
        delete: (id: number) => this.http.delete(`${URL_ROLES}/${id}`),
    };

    ROLES_X_PERMISOS = {
        get: () => this.http.get<RolXPermiso[]>(URL_ROLES_X_PERMISOS),
        getById: (id: number) =>
            this.http.get<RolXPermiso>(`${URL_ROLES_X_PERMISOS}/${id}`),
        post: (rolXPermiso: RolXPermiso) =>
            this.http.post(URL_ROLES_X_PERMISOS, rolXPermiso),
        put: (id: number, rolXPermiso: RolXPermisoPostOrUpdate) =>
            this.http.put(`${URL_ROLES_X_PERMISOS}/${id}`, rolXPermiso),
        delete: (id: number) =>
            this.http.delete(`${URL_ROLES_X_PERMISOS}/${id}`),
    };

    SERVIDORES = {
        get: () => this.http.get<Servidor[]>(URL_SERVIDORES),
        getById: (id: number) =>
            this.http.get<Servidor>(`${URL_SERVIDORES}/${id}`),
        post: (servidor: ServidorPostOrUpdate) =>
            this.http.post(URL_SERVIDORES, servidor),
        put: (id: number, servidor: ServidorPostOrUpdate) =>
            this.http.put(`${URL_SERVIDORES}/${id}`, { id, ...servidor }),
        delete: (id: number) => this.http.delete(`${URL_SERVIDORES}/${id}`),
    };

    SISTEMAS_OPERATIVOS = {
        get: () => this.http.get<SistemaOperativo[]>(URL_SISTEMAS_OPERATIVOS),
        getById: (id: number) =>
            this.http.get<SistemaOperativo>(`${URL_SISTEMAS_OPERATIVOS}/${id}`),
        post: (sistemaOperativo: SistemaOperativo) =>
            this.http.post(URL_SISTEMAS_OPERATIVOS, sistemaOperativo),
        put: (id: number, sistemaOperativo: SistemaOperativoPostOrUpdate) =>
            this.http.put(`${URL_SISTEMAS_OPERATIVOS}/${id}`, sistemaOperativo),
        delete: (id: number) =>
            this.http.delete(`${URL_SISTEMAS_OPERATIVOS}/${id}`),
    };

    TIPOS_SERVIDORES = {
        get: () => this.http.get<TipoServidor[]>(URL_TIPOS_SERVIDORES),
        getById: (id: number) =>
            this.http.get<TipoServidor>(`${URL_TIPOS_SERVIDORES}/${id}`),
        post: (tipoServidor: TipoServidor) =>
            this.http.post(URL_TIPOS_SERVIDORES, tipoServidor),
        put: (id: number, tipoServidor: TipoServidorPostOrUpdate) =>
            this.http.put(`${URL_TIPOS_SERVIDORES}/${id}`, tipoServidor),
        delete: (id: number) =>
            this.http.delete(`${URL_TIPOS_SERVIDORES}/${id}`),
    };

    USUARIOS = {
        get: () => this.http.get<Usuario[]>(URL_USUARIOS),
        getById: (id: number) =>
            this.http.get<Usuario>(`${URL_USUARIOS}/${id}`),
        post: (usuario: Usuario) => this.http.post(URL_USUARIOS, usuario),
        put: (id: number, usuario: UsuarioPostOrUpdate) =>
            this.http.put(`${URL_USUARIOS}/${id}`, usuario),
        delete: (id: number) => this.http.delete(`${URL_USUARIOS}/${id}`),
    };
}
