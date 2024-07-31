using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTodoList.Migrations
{
    /// <inheritdoc />
    public partial class NewCampos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AfectacionAS400",
                table: "Mantenimientos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AgenciasAfectadas",
                table: "Mantenimientos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AutorizacionTarjetasDebito",
                table: "Mantenimientos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CodigoPerfil",
                table: "Mantenimientos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "IdUsuarioResponsable",
                table: "Mantenimientos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PersonalInvolucrado",
                table: "Mantenimientos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PlanB",
                table: "Mantenimientos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PuntosDeVerificacion",
                table: "Mantenimientos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SoporteProveedores",
                table: "Mantenimientos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AfectacionAS400",
                table: "Mantenimientos");

            migrationBuilder.DropColumn(
                name: "AgenciasAfectadas",
                table: "Mantenimientos");

            migrationBuilder.DropColumn(
                name: "AutorizacionTarjetasDebito",
                table: "Mantenimientos");

            migrationBuilder.DropColumn(
                name: "CodigoPerfil",
                table: "Mantenimientos");

            migrationBuilder.DropColumn(
                name: "IdUsuarioResponsable",
                table: "Mantenimientos");

            migrationBuilder.DropColumn(
                name: "PersonalInvolucrado",
                table: "Mantenimientos");

            migrationBuilder.DropColumn(
                name: "PlanB",
                table: "Mantenimientos");

            migrationBuilder.DropColumn(
                name: "PuntosDeVerificacion",
                table: "Mantenimientos");

            migrationBuilder.DropColumn(
                name: "SoporteProveedores",
                table: "Mantenimientos");
        }
    }
}
