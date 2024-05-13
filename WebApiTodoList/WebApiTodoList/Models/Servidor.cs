using System.ComponentModel;
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
        public required int IdSistemaOperativo { get; set; }
        public required int IdTipo { get; set; }
        public required int IdAmbiente { get; set; }
        public required int IdEstado { get; set; }
        [DefaultValue(false)]
        public required bool RequierePerfil { get; set; }
    }
}
