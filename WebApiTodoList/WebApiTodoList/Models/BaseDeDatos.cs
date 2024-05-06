using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class BaseDeDatos
    {
        public int Id { get; set; }
        public required int IdServidor { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdServidor")]
        public required Servidor Servidor { get; set; }

        public required int IdMotor { get; set; }

        // Propiedad de navegación
        [ForeignKey("IdMotor")]
        public required Motor Motor { get; set; }

        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
        public required string Collation { get; set; }
        public required int IdAmbiente { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdAmbiente")]
        public required Ambiente Ambiente { get; set; }
        public required bool AplicaMantenimiento { get; set; }
        public required int IdEstado { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdEstado")]
        public required Estado Estado { get; set; }
    }
}
