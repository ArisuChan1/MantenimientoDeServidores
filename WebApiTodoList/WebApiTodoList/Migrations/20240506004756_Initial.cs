using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTodoList.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ambientes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ambientes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Estados",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ocupado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estados", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EstadosMantenimiento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Terminado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstadosMantenimiento", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Motores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Motores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Paises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permisos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permisos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Razones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Razones", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SistemasOperativos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SistemasOperativos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TiposServidores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposServidores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Regiones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdPais = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regiones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Regiones_Paises_IdPais",
                        column: x => x.IdPais,
                        principalTable: "Paises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Alias = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Correo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NombreCompleto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdRol = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Usuarios_Roles_IdRol",
                        column: x => x.IdRol,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ciudades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdRegion = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ciudades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ciudades_Regiones_IdRegion",
                        column: x => x.IdRegion,
                        principalTable: "Regiones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RolesXPermisos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdRol = table.Column<int>(type: "int", nullable: false),
                    IdPermiso = table.Column<int>(type: "int", nullable: false),
                    TmpAsignado = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUsuarioAsigno = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolesXPermisos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RolesXPermisos_Permisos_IdPermiso",
                        column: x => x.IdPermiso,
                        principalTable: "Permisos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RolesXPermisos_Roles_IdRol",
                        column: x => x.IdRol,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RolesXPermisos_Usuarios_IdUsuarioAsigno",
                        column: x => x.IdUsuarioAsigno,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Servidores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dominio = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AplicaMantenimiento = table.Column<bool>(type: "bit", nullable: false),
                    IdCiudad = table.Column<int>(type: "int", nullable: false),
                    IdSistemaOperativo = table.Column<int>(type: "int", nullable: false),
                    IdTipo = table.Column<int>(type: "int", nullable: false),
                    IdAmbiente = table.Column<int>(type: "int", nullable: false),
                    IdEstado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Servidores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Servidores_Ambientes_IdAmbiente",
                        column: x => x.IdAmbiente,
                        principalTable: "Ambientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Servidores_Ciudades_IdCiudad",
                        column: x => x.IdCiudad,
                        principalTable: "Ciudades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Servidores_Estados_IdEstado",
                        column: x => x.IdEstado,
                        principalTable: "Estados",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Servidores_SistemasOperativos_IdSistemaOperativo",
                        column: x => x.IdSistemaOperativo,
                        principalTable: "SistemasOperativos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Servidores_TiposServidores_IdTipo",
                        column: x => x.IdTipo,
                        principalTable: "TiposServidores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BasesDeDatos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdServidor = table.Column<int>(type: "int", nullable: false),
                    IdMotor = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Collation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdAmbiente = table.Column<int>(type: "int", nullable: false),
                    AplicaMantenimiento = table.Column<bool>(type: "bit", nullable: false),
                    IdEstado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasesDeDatos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BasesDeDatos_Ambientes_IdAmbiente",
                        column: x => x.IdAmbiente,
                        principalTable: "Ambientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BasesDeDatos_Estados_IdEstado",
                        column: x => x.IdEstado,
                        principalTable: "Estados",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BasesDeDatos_Motores_IdMotor",
                        column: x => x.IdMotor,
                        principalTable: "Motores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BasesDeDatos_Servidores_IdServidor",
                        column: x => x.IdServidor,
                        principalTable: "Servidores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Mantenimientos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdRazon = table.Column<int>(type: "int", nullable: false),
                    IdBaseDeDatos = table.Column<int>(type: "int", nullable: false),
                    IdServidor = table.Column<int>(type: "int", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    IdEstado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mantenimientos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mantenimientos_BasesDeDatos_IdBaseDeDatos",
                        column: x => x.IdBaseDeDatos,
                        principalTable: "BasesDeDatos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mantenimientos_EstadosMantenimiento_IdEstado",
                        column: x => x.IdEstado,
                        principalTable: "EstadosMantenimiento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mantenimientos_Razones_IdRazon",
                        column: x => x.IdRazon,
                        principalTable: "Razones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mantenimientos_Servidores_IdServidor",
                        column: x => x.IdServidor,
                        principalTable: "Servidores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mantenimientos_Usuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BasesDeDatos_IdAmbiente",
                table: "BasesDeDatos",
                column: "IdAmbiente");

            migrationBuilder.CreateIndex(
                name: "IX_BasesDeDatos_IdEstado",
                table: "BasesDeDatos",
                column: "IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_BasesDeDatos_IdMotor",
                table: "BasesDeDatos",
                column: "IdMotor");

            migrationBuilder.CreateIndex(
                name: "IX_BasesDeDatos_IdServidor",
                table: "BasesDeDatos",
                column: "IdServidor");

            migrationBuilder.CreateIndex(
                name: "IX_Ciudades_IdRegion",
                table: "Ciudades",
                column: "IdRegion");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimientos_IdBaseDeDatos",
                table: "Mantenimientos",
                column: "IdBaseDeDatos");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimientos_IdEstado",
                table: "Mantenimientos",
                column: "IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimientos_IdRazon",
                table: "Mantenimientos",
                column: "IdRazon");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimientos_IdServidor",
                table: "Mantenimientos",
                column: "IdServidor");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimientos_IdUsuario",
                table: "Mantenimientos",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Regiones_IdPais",
                table: "Regiones",
                column: "IdPais");

            migrationBuilder.CreateIndex(
                name: "IX_RolesXPermisos_IdPermiso",
                table: "RolesXPermisos",
                column: "IdPermiso");

            migrationBuilder.CreateIndex(
                name: "IX_RolesXPermisos_IdRol",
                table: "RolesXPermisos",
                column: "IdRol");

            migrationBuilder.CreateIndex(
                name: "IX_RolesXPermisos_IdUsuarioAsigno",
                table: "RolesXPermisos",
                column: "IdUsuarioAsigno");

            migrationBuilder.CreateIndex(
                name: "IX_Servidores_IdAmbiente",
                table: "Servidores",
                column: "IdAmbiente");

            migrationBuilder.CreateIndex(
                name: "IX_Servidores_IdCiudad",
                table: "Servidores",
                column: "IdCiudad");

            migrationBuilder.CreateIndex(
                name: "IX_Servidores_IdEstado",
                table: "Servidores",
                column: "IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_Servidores_IdSistemaOperativo",
                table: "Servidores",
                column: "IdSistemaOperativo");

            migrationBuilder.CreateIndex(
                name: "IX_Servidores_IdTipo",
                table: "Servidores",
                column: "IdTipo");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_IdRol",
                table: "Usuarios",
                column: "IdRol");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mantenimientos");

            migrationBuilder.DropTable(
                name: "RolesXPermisos");

            migrationBuilder.DropTable(
                name: "BasesDeDatos");

            migrationBuilder.DropTable(
                name: "EstadosMantenimiento");

            migrationBuilder.DropTable(
                name: "Razones");

            migrationBuilder.DropTable(
                name: "Permisos");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Motores");

            migrationBuilder.DropTable(
                name: "Servidores");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Ambientes");

            migrationBuilder.DropTable(
                name: "Ciudades");

            migrationBuilder.DropTable(
                name: "Estados");

            migrationBuilder.DropTable(
                name: "SistemasOperativos");

            migrationBuilder.DropTable(
                name: "TiposServidores");

            migrationBuilder.DropTable(
                name: "Regiones");

            migrationBuilder.DropTable(
                name: "Paises");
        }
    }
}
