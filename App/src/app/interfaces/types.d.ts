export interface Usuario {
    id: number;
    alias: string;
    password: string;
    correo: string;
    nombreCompleto: string;
    idRol: number;
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
}
export interface Ciudad extends Base {
    idRegion: number;
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
    idSistemaOperativo: number;
    idTipo: number;
    idAmbiente: number;
    idEstado: number;
}

export interface BaseDeDatos {
    id: number;
    idServidor: number;
    idMotor: number;
    nombre: string;
    descripcion: string;
    collation: string;
    idAmbiente: number;
    aplicaMantenimiento: boolean;
    idEstado: number;
}

export interface Mantenimiento {
    id: number;
    idRazon: number;
    idBaseDeDatos: number | null;
    idServidor: number | null;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    idUsuario: number;
    idEstado: number;
}

export interface RolXPermiso {
    id: 0;
    idRol: 0;
    idPermiso: 0;
    tmpAsignado: Date;
    idUsuarioAsigno: 0;
}

// Interfaces para Post or Put
export type UsuarioPostOrUpdate = Omit<Usuario, 'id'>;
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
