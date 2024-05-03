namespace WebApiTodoList.Models
{
    public class Estado
    {
        public int Id { get; set; }
        public required string Descripcion { get; set; }
        public required bool Ocupado { get; set; }
    }
}
