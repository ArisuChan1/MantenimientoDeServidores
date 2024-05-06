using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class Region
    {
        public int Id { get; set; }
        public required string Descripcion { get; set; }
        public required int IdPais { get; set; }

        // Propiedad de navegación
        [ForeignKey("IdPais")]
        public required Pais Pais { get; set; }
    }
}
