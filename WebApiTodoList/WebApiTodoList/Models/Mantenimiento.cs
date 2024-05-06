using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class Mantenimiento
    {
        public int Id { get; set; }
        public required int IdRazon { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdRazon")]
        public required Razon Razon { get; set; }
        public required int IdBaseDeDatos { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdBaseDeDatos")]
        public BaseDeDatos? BaseDeDatos { get; set; }
        public required int IdServidor { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdServidor")]
        public Servidor? Servidor { get; set; }
        public required string Descripcion { get; set; }
        public required DateTime FechaInicio { get; set; }
        public required DateTime FechaFin { get; set; }
        public required int IdUsuario { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdUsuario")]
        public Usuario? Usuario { get; set; }
        public required int IdEstado { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdEstado")]
        public EstadoMantenimiento? EstadoMantenimiento { get; set; }



    }
}
