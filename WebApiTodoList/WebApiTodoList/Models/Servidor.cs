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
        public Ciudad? Ciudad { get; set; }
        public required int IdSistemaOperativo { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdSistemaOperativo")]
        public SistemaOperativo? SistemaOperativo { get; set; }
        public required int IdTipo { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdTipo")]
        public TipoServidor? TipoServidor { get; set; }
        public required int IdAmbiente { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdAmbiente")]
        public Ambiente? Ambiente { get; set; }
        public required int IdEstado { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdEstado")]
        public Estado? Estado { get; set; }
    }
}
