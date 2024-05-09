using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class resfreshMessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Message_IDTask",
                table: "Message");

            migrationBuilder.CreateIndex(
                name: "IX_Message_IDTask",
                table: "Message",
                column: "IDTask");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Message_IDTask",
                table: "Message");

            migrationBuilder.CreateIndex(
                name: "IX_Message_IDTask",
                table: "Message",
                column: "IDTask",
                unique: true);
        }
    }
}
