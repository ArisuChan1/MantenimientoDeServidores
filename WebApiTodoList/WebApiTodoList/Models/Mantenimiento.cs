using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class Mantenimiento
    {
        public int Id { get; set; }
        public required int IdRazon { get; set; }
        public int? IdBaseDeDatos { get; set; }
        public int? IdServidor { get; set; }
        public string? Descripcion { get; set; }
        public required DateTime FechaInicio { get; set; }
        public required DateTime FechaFin { get; set; }
        public required int IdUsuario { get; set; }
        public required int IdEstado { get; set; }
    }
}
