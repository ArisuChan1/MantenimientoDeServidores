using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class Mantenimiento
    {
        private Servidor? servidor;
        private BaseDeDatos? baseDeDatos;
        public int Id { get; set; }
        public required int IdRazon { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdRazon")]
        public required Razon Razon { get; set; }
        public int? IdBaseDeDatos { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdBaseDeDatos")]
        public BaseDeDatos? BaseDeDatos { get => baseDeDatos; set => baseDeDatos = value; }
        public int? IdServidor { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdServidor")]
        public Servidor? Servidor { get => servidor; set => servidor = value; }
        public string? Descripcion { get; set; }
        public required DateTime FechaInicio { get; set; }
        public required DateTime FechaFin { get; set; }
        public required int IdUsuario { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdUsuario")]
        public required Usuario Usuario { get; set; }
        public required int IdEstado { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdEstado")]
        public required EstadoMantenimiento EstadoMantenimiento { get; set; }
    }
}
