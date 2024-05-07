using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTodoList.Models
{
    public class RolesXPermisos
    {
        public required int Id { get; set; }
        public required int IdRol { get; set; }
        public required int IdPermiso { get; set; }
        public required DateTime TmpAsignado { get; set; }
        public required int IdUsuarioAsigno { get; set; }
    }
}
