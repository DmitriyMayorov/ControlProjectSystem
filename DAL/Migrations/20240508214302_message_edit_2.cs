using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class message_edit_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IDTask",
                table: "Message",
                newName: "Idtask");

            migrationBuilder.RenameIndex(
                name: "IX_Message_IDTask",
                table: "Message",
                newName: "IX_Message_Idtask");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Idtask",
                table: "Message",
                newName: "IDTask");

            migrationBuilder.RenameIndex(
                name: "IX_Message_Idtask",
                table: "Message",
                newName: "IX_Message_IDTask");
        }
    }
}
