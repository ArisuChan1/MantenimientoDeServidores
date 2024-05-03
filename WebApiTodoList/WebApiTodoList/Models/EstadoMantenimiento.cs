namespace WebApiTodoList.Models
{
    public class EstadoMantenimiento
    {
        public int Id { get; set; }
        public required string Descripcion { get; set; }
        public required bool Terminado { get; set; }
    }
}
