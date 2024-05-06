using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class Ciudad
    {
        public int Id { get; set; }
        public required string Descripcion { get; set; }
        public required int IdRegion { get; set; }

        // Propiedad de navegación
        [ForeignKey("IdRegion")]
        public required Region Region { get; set; }
    }
}
