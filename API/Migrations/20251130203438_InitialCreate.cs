using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Emprestimos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Livro = table.Column<string>(type: "TEXT", nullable: true),
                    Aluno = table.Column<string>(type: "TEXT", nullable: true),
                    DataRetirada = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DataPrevista = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DataDevolucaoReal = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Multa = table.Column<double>(type: "REAL", nullable: true),
                    Status = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emprestimos", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Emprestimos");
        }
    }
}
