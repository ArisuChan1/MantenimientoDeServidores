using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public required string Alias { get; set; }
        public required string Password { get; set; }
        public required string Correo { get; set; }
        public required string NombreCompleto { get; set; }
        public required int IdRol { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdRol")]
        public required Rol Rol { get; set; }
    }
}
