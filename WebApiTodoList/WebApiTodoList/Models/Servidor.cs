using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class Servidor
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Dominio { get; set; }
        public required string Descripcion { get; set; }
        public required bool AplicaMantenimiento { get; set; }
        public required int IdCiudad { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdCiudad")]
        public required Ciudad Ciudad { get; set; }
        public required int IdSistemaOperativo { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdSistemaOperativo")]
        public required SistemaOperativo SistemaOperativo { get; set; }
        public required int IdTipo { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdTipo")]
        public required TipoServidor TipoServidor { get; set; }
        public required int IdAmbiente { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdAmbiente")]
        public required Ambiente Ambiente { get; set; }
        public required int IdEstado { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdEstado")]
        public required Estado Estado { get; set; }
    }
}
