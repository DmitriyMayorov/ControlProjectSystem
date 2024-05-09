using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class message_edit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "Message_pkey",
                table: "Message");

            migrationBuilder.AddPrimaryKey(
                name: "Message_pkey",
                table: "Message",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Message_IDTask",
                table: "Message",
                column: "IDTask",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "Message_pkey",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_IDTask",
                table: "Message");

            migrationBuilder.AddPrimaryKey(
                name: "Message_pkey",
                table: "Message",
                column: "IDTask");
        }
    }
}
