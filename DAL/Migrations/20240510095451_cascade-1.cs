using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class cascade1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Task",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Worker",
                table: "Message");

            migrationBuilder.AddForeignKey(
                name: "FK_Task",
                table: "Track",
                column: "IDTask",
                principalTable: "Task",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Worker",
                table: "Track",
                column: "IDWorker",
                principalTable: "Worker",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Task",
                table: "Track");

            migrationBuilder.DropForeignKey(
                name: "FK_Worker",
                table: "Track");

            migrationBuilder.AddForeignKey(
                name: "FK_Task",
                table: "Message",
                column: "IDTask",
                principalTable: "Task",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Worker",
                table: "Message",
                column: "IDWorker",
                principalTable: "Worker",
                principalColumn: "Id");
        }
    }
}
