using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.ComponentModel;
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

        public required int IdUsuarioResponsable { get; set; }

        [DefaultValue(false)]
        public required bool Automatica { get; set; }

        public string? PlanB { get; set; }

        [DefaultValue(false)]
        public required bool RequierePerfil { get; set; }
        
        public string? CodigoPerfil { get; set; }
        public string? AgenciasAfectadas { get; set; }
        public string? AfectacionAS400 { get; set; }
        public string? AutorizacionTarjetasDebito { get; set; }
        public string? SoporteProveedores { get; set; }
        public string? PersonalInvolucrado { get; set; }
        public string? PuntosDeVerificacion { get; set; }

    }
}
