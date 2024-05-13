using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTodoList.Migrations
{
    /// <inheritdoc />
    public partial class Initial2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "RequierePerfil",
                table: "Servidores",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "RequierePerfil",
                table: "Mantenimientos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "RequierePerfil",
                table: "BasesDeDatos",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequierePerfil",
                table: "Servidores");

            migrationBuilder.DropColumn(
                name: "RequierePerfil",
                table: "Mantenimientos");

            migrationBuilder.DropColumn(
                name: "RequierePerfil",
                table: "BasesDeDatos");
        }
    }
}
