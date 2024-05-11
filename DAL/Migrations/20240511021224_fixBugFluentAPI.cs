using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class fixBugFluentAPI : Migration
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

            migrationBuilder.DropForeignKey(
                name: "FK_WAnalyst",
                table: "Task");

            migrationBuilder.DropForeignKey(
                name: "FK_WCoder",
                table: "Task");

            migrationBuilder.DropForeignKey(
                name: "FK_WMentor",
                table: "Task");

            migrationBuilder.DropForeignKey(
                name: "FK_WTester",
                table: "Task");

            migrationBuilder.AddForeignKey(
                name: "FK_Task",
                table: "Message",
                column: "IDTask",
                principalTable: "Task",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Worker",
                table: "Message",
                column: "IDWorker",
                principalTable: "Worker",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WAnalyst",
                table: "Task",
                column: "IDWorkerAnalyst",
                principalTable: "Worker",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_WCoder",
                table: "Task",
                column: "IDWorkerCoder",
                principalTable: "Worker",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_WMentor",
                table: "Task",
                column: "IDWorkerMentor",
                principalTable: "Worker",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_WTester",
                table: "Task",
                column: "IDWorkerTester",
                principalTable: "Worker",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Task",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Worker",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_WAnalyst",
                table: "Task");

            migrationBuilder.DropForeignKey(
                name: "FK_WCoder",
                table: "Task");

            migrationBuilder.DropForeignKey(
                name: "FK_WMentor",
                table: "Task");

            migrationBuilder.DropForeignKey(
                name: "FK_WTester",
                table: "Task");

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

            migrationBuilder.AddForeignKey(
                name: "FK_WAnalyst",
                table: "Task",
                column: "IDWorkerAnalyst",
                principalTable: "Worker",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WCoder",
                table: "Task",
                column: "IDWorkerCoder",
                principalTable: "Worker",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WMentor",
                table: "Task",
                column: "IDWorkerMentor",
                principalTable: "Worker",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WTester",
                table: "Task",
                column: "IDWorkerTester",
                principalTable: "Worker",
                principalColumn: "Id");
        }
    }
}
