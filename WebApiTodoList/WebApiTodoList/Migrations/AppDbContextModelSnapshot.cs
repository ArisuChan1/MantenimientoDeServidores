﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApiTodoList.Contexts;

#nullable disable

namespace WebApiTodoList.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebApiTodoList.Models.Ambiente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Ambientes");
                });

            modelBuilder.Entity("WebApiTodoList.Models.BaseDeDatos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("AplicaMantenimiento")
                        .HasColumnType("bit");

                    b.Property<string>("Collation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdAmbiente")
                        .HasColumnType("int");

                    b.Property<int>("IdEstado")
                        .HasColumnType("int");

                    b.Property<int>("IdMotor")
                        .HasColumnType("int");

                    b.Property<int>("IdServidor")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdAmbiente");

                    b.HasIndex("IdEstado");

                    b.HasIndex("IdMotor");

                    b.HasIndex("IdServidor");

                    b.ToTable("BasesDeDatos");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Ciudad", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdRegion")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdRegion");

                    b.ToTable("Ciudades");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Estado", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Ocupado")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Estados");
                });

            modelBuilder.Entity("WebApiTodoList.Models.EstadoMantenimiento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Terminado")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("EstadosMantenimiento");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Mantenimiento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FechaFin")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaInicio")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdBaseDeDatos")
                        .HasColumnType("int");

                    b.Property<int>("IdEstado")
                        .HasColumnType("int");

                    b.Property<int>("IdRazon")
                        .HasColumnType("int");

                    b.Property<int>("IdServidor")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdBaseDeDatos");

                    b.HasIndex("IdEstado");

                    b.HasIndex("IdRazon");

                    b.HasIndex("IdServidor");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Mantenimientos");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Motor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Motores");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Pais", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Paises");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Permiso", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Permisos");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Razon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Razones");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Region", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdPais")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdPais");

                    b.ToTable("Regiones");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Rol", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("WebApiTodoList.Models.RolesXPermisos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IdPermiso")
                        .HasColumnType("int");

                    b.Property<int>("IdRol")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuarioAsigno")
                        .HasColumnType("int");

                    b.Property<DateTime>("TmpAsignado")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("IdPermiso");

                    b.HasIndex("IdRol");

                    b.HasIndex("IdUsuarioAsigno");

                    b.ToTable("RolesXPermisos");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Servidor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("AplicaMantenimiento")
                        .HasColumnType("bit");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Dominio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdAmbiente")
                        .HasColumnType("int");

                    b.Property<int>("IdCiudad")
                        .HasColumnType("int");

                    b.Property<int>("IdEstado")
                        .HasColumnType("int");

                    b.Property<int>("IdSistemaOperativo")
                        .HasColumnType("int");

                    b.Property<int>("IdTipo")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdAmbiente");

                    b.HasIndex("IdCiudad");

                    b.HasIndex("IdEstado");

                    b.HasIndex("IdSistemaOperativo");

                    b.HasIndex("IdTipo");

                    b.ToTable("Servidores");
                });

            modelBuilder.Entity("WebApiTodoList.Models.SistemaOperativo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SistemasOperativos");
                });

            modelBuilder.Entity("WebApiTodoList.Models.TipoServidor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TiposServidores");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Alias")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Correo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdRol")
                        .HasColumnType("int");

                    b.Property<string>("NombreCompleto")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdRol");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("WebApiTodoList.Models.BaseDeDatos", b =>
                {
                    b.HasOne("WebApiTodoList.Models.Ambiente", "Ambiente")
                        .WithMany()
                        .HasForeignKey("IdAmbiente")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.Estado", "Estado")
                        .WithMany()
                        .HasForeignKey("IdEstado")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.Motor", "Motor")
                        .WithMany()
                        .HasForeignKey("IdMotor")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.Servidor", "Servidor")
                        .WithMany()
                        .HasForeignKey("IdServidor")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Ambiente");

                    b.Navigation("Estado");

                    b.Navigation("Motor");

                    b.Navigation("Servidor");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Ciudad", b =>
                {
                    b.HasOne("WebApiTodoList.Models.Region", "Region")
                        .WithMany()
                        .HasForeignKey("IdRegion")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Region");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Mantenimiento", b =>
                {
                    b.HasOne("WebApiTodoList.Models.BaseDeDatos", "BaseDeDatos")
                        .WithMany()
                        .HasForeignKey("IdBaseDeDatos")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.EstadoMantenimiento", "EstadoMantenimiento")
                        .WithMany()
                        .HasForeignKey("IdEstado")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.Razon", "Razon")
                        .WithMany()
                        .HasForeignKey("IdRazon")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.Servidor", "Servidor")
                        .WithMany()
                        .HasForeignKey("IdServidor")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("BaseDeDatos");

                    b.Navigation("EstadoMantenimiento");

                    b.Navigation("Razon");

                    b.Navigation("Servidor");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Region", b =>
                {
                    b.HasOne("WebApiTodoList.Models.Pais", "Pais")
                        .WithMany()
                        .HasForeignKey("IdPais")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Pais");
                });

            modelBuilder.Entity("WebApiTodoList.Models.RolesXPermisos", b =>
                {
                    b.HasOne("WebApiTodoList.Models.Permiso", "Permiso")
                        .WithMany()
                        .HasForeignKey("IdPermiso")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.Rol", "Rol")
                        .WithMany()
                        .HasForeignKey("IdRol")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuarioAsigno")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Permiso");

                    b.Navigation("Rol");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Servidor", b =>
                {
                    b.HasOne("WebApiTodoList.Models.Ambiente", "Ambiente")
                        .WithMany()
                        .HasForeignKey("IdAmbiente")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.Ciudad", "Ciudad")
                        .WithMany()
                        .HasForeignKey("IdCiudad")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.Estado", "Estado")
                        .WithMany()
                        .HasForeignKey("IdEstado")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.SistemaOperativo", "SistemaOperativo")
                        .WithMany()
                        .HasForeignKey("IdSistemaOperativo")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApiTodoList.Models.TipoServidor", "TipoServidor")
                        .WithMany()
                        .HasForeignKey("IdTipo")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Ambiente");

                    b.Navigation("Ciudad");

                    b.Navigation("Estado");

                    b.Navigation("SistemaOperativo");

                    b.Navigation("TipoServidor");
                });

            modelBuilder.Entity("WebApiTodoList.Models.Usuario", b =>
                {
                    b.HasOne("WebApiTodoList.Models.Rol", "Rol")
                        .WithMany()
                        .HasForeignKey("IdRol")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Rol");
                });
#pragma warning restore 612, 618
        }
    }
}
