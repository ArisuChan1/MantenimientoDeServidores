using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class BaseDeDatos
    {
        public int Id { get; set; }
        public required int IdServidor { get; set; }
        public required int IdMotor { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
        public required string Collation { get; set; }
        public required int IdAmbiente { get; set; }
        public required bool AplicaMantenimiento { get; set; }
        public required int IdEstado { get; set; }
    }
}
