using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControlProjectSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddGetSetUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "idWorker",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "idWorker",
                table: "AspNetUsers");
        }
    }
}
