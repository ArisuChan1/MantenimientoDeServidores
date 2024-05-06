using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class RolesXPermisos
    {
        public required int Id { get; set; }
        public required int IdRol { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdRol")]
        public required Rol Rol { get; set; }
        public required int IdPermiso { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdPermiso")]
        public required Permiso Permiso { get; set; }
        public required DateTime TmpAsignado { get; set; }
        public required int IdUsuarioAsigno { get; set; }
        // Propiedad de navegación
        [ForeignKey("IdUsuarioAsigno")]
        public required Usuario Usuario { get; set; }
    }
}
