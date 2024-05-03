using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace WebApiTodoList.Models
{
    public class Mantenimiento
    {
        public int Id { get; set; }
        public required int IdRazon { get; set; }
        public required int IdBaseDeDatos { get; set; }
        public required int IdServidor { get; set; }
        public required string Descripcion { get; set; }
        public required DateTime FechaInicio { get; set; }
        public required DateTime FechaFin { get; set; }
        public required int IdUsuario { get; set; }
        public required int IdEstado { get; set; }
      
                

    }
}
