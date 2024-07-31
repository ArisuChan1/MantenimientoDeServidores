using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTodoList.Migrations
{
    /// <inheritdoc />
    public partial class LogginTable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NewValues",
                table: "ChangeLogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OldValues",
                table: "ChangeLogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "User",
                table: "ChangeLogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewValues",
                table: "ChangeLogs");

            migrationBuilder.DropColumn(
                name: "OldValues",
                table: "ChangeLogs");

            migrationBuilder.DropColumn(
                name: "User",
                table: "ChangeLogs");
        }
    }
}
