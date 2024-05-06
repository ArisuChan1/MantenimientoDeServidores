export interface Usuario {
    id: number;
    alias: string;
    password: string;
    correo: string;
    nombreCompleto: string;
    idRol: number;
    rol: Rol;
}

export interface Base {
    id: number;
    descripcion: string;
}

export interface Rol extends Base {}
export interface Permiso extends Base {}
export interface Motor extends Base {}
export interface Ambiente extends Base {}
export interface Ambiente extends Base {}
export interface TipoServidor extends Base {}
export interface SistemaOperativo extends Base {}
export interface Razon extends Base {}
export interface Pais extends Base {}
export interface Region extends Base {
    idPais: number;
    pais: Pais;
}
export interface Ciudad extends Base {
    idRegion: number;
    region: Region;
}
export interface Estado extends Base {
    ocupado: boolean;
}
export interface EstadoMantenimiento extends Base {
    terminado: boolean;
}

export interface Servidor {
    id: number;
    nombre: string;
    dominio: string;
    descripcion: string;
    aplicaMantenimiento: boolean;
    idCiudad: number;
    ciudad: Ciudad;
    idSistemaOperativo: number;
    sistemaOperativo: SistemaOperativo;
    idTipo: number;
    tipoServidor: TipoServidor;
    idAmbiente: number;
    ambiente: Ambiente;
    idEstado: number;
    estado: Estado;
}

export interface BaseDeDatos {
    id: number;
    idServidor: number;
    servidor: Servidor;
    idMotor: number;
    motor: Motor;
    nombre: string;
    descripcion: string;
    collation: string;
    idAmbiente: number;
    ambiente: Ambiente;
    aplicaMantenimiento: boolean;
    idEstado: number;
    estado: Estado;
}

export interface Mantenimiento {
    id: number;
    idRazon: number;
    razon: Razon;
    idBaseDeDatos: number | null;
    baseDeDatos: BaseDeDatos | null;
    idServidor: number | null;
    servidor: Servidor | null;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    idUsuario: number;
    usuario: Usuario;
    idEstado: number;
    estadoMantenimiento: EstadoMantenimiento;
}

export interface RolXPermiso {
    id: 0;
    idRol: 0;
    rol: Rol;
    idPermiso: 0;
    permiso: Permiso;
    tmpAsignado: '2024-05-06T02:40:18.119Z';
    idUsuarioAsigno: 0;
    usuario: Usuario;
}

// Interfaces para Post or Put
export type UsuarioPostOrUpdate = Omit<Usuario, 'id' | 'rol'>;
export type RolPostOrUpdate = Omit<Rol, 'id'>;
export type PermisoPostOrUpdate = Omit<Permiso, 'id'>;
export type MotorPostOrUpdate = Omit<Motor, 'id'>;
export type AmbientePostOrUpdate = Omit<Ambiente, 'id'>;
export type TipoServidorPostOrUpdate = Omit<TipoServidor, 'id'>;
export type SistemaOperativoPostOrUpdate = Omit<SistemaOperativo, 'id'>;
export type RazonPostOrUpdate = Omit<Razon, 'id'>;
export type PaisPostOrUpdate = Omit<Pais, 'id'>;
export type RegionPostOrUpdate = Omit<Region, 'id'>;
export type CiudadPostOrUpdate = Omit<Ciudad, 'id'>;
export type EstadoPostOrUpdate = Omit<Estado, 'id'>;
export type EstadoMantenimientoPostOrUpdate = Omit<EstadoMantenimiento, 'id'>;
export type ServidorPostOrUpdate = Omit<Servidor, 'id'>;
export type BaseDeDatosPostOrUpdate = Omit<BaseDeDatos, 'id'>;
export type MantenimientoPostOrUpdate = Omit<Mantenimiento, 'id'>;
export type RolXPermisoPostOrUpdate = Omit<RolXPermiso, 'id'>;
