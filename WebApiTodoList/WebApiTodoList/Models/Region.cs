namespace WebApiTodoList.Models
{
    public class Region
    {
        public int Id { get; set; }
        public required string Descripcion { get; set; }
        public required int IdPais { get; set; }
    }
}
