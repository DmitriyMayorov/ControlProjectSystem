using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class first : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    Name = table.Column<string>(type: "character varying", nullable: false),
                    DeadLine = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Project_pkey", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Worker",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    Person = table.Column<string>(type: "character varying", nullable: false),
                    PassportNum = table.Column<int>(type: "integer", nullable: false),
                    PassportSeries = table.Column<int>(type: "integer", nullable: false),
                    Position = table.Column<string>(type: "character varying", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Worker_pkey", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Task",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    Name = table.Column<string>(type: "character varying", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IDWorkerCoder = table.Column<int>(type: "integer", nullable: true),
                    IDWorkerAnalyst = table.Column<int>(type: "integer", nullable: true),
                    IDWorkerMentor = table.Column<int>(type: "integer", nullable: true),
                    IDWorkerTester = table.Column<int>(type: "integer", nullable: true),
                    IDProject = table.Column<int>(type: "integer", nullable: false),
                    Category = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    State = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    Priority = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    Deadline = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Task_pkey", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Project",
                        column: x => x.IDProject,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WAnalyst",
                        column: x => x.IDWorkerAnalyst,
                        principalTable: "Worker",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WCoder",
                        column: x => x.IDWorkerCoder,
                        principalTable: "Worker",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WMentor",
                        column: x => x.IDWorkerMentor,
                        principalTable: "Worker",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WTester",
                        column: x => x.IDWorkerTester,
                        principalTable: "Worker",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    IDTask = table.Column<int>(type: "integer", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    TextMessage = table.Column<string>(type: "text", nullable: false),
                    DateMessage = table.Column<DateOnly>(type: "date", nullable: false),
                    IDWorker = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Message_pkey", x => x.IDTask);
                    table.ForeignKey(
                        name: "FK_Task",
                        column: x => x.IDTask,
                        principalTable: "Task",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Worker",
                        column: x => x.IDWorker,
                        principalTable: "Worker",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Track",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    IDTask = table.Column<int>(type: "integer", nullable: false),
                    DateTrack = table.Column<DateOnly>(type: "date", nullable: false),
                    CountHours = table.Column<int>(type: "integer", nullable: false),
                    IDWorker = table.Column<int>(type: "integer", nullable: false),
                    StatusTask = table.Column<string>(type: "character varying", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Track_pkey", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Task",
                        column: x => x.IDTask,
                        principalTable: "Task",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Worker",
                        column: x => x.IDWorker,
                        principalTable: "Worker",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Message_IDWorker",
                table: "Message",
                column: "IDWorker");

            migrationBuilder.CreateIndex(
                name: "IX_Task_IDProject",
                table: "Task",
                column: "IDProject");

            migrationBuilder.CreateIndex(
                name: "IX_Task_IDWorkerAnalyst",
                table: "Task",
                column: "IDWorkerAnalyst");

            migrationBuilder.CreateIndex(
                name: "IX_Task_IDWorkerCoder",
                table: "Task",
                column: "IDWorkerCoder");

            migrationBuilder.CreateIndex(
                name: "IX_Task_IDWorkerMentor",
                table: "Task",
                column: "IDWorkerMentor");

            migrationBuilder.CreateIndex(
                name: "IX_Task_IDWorkerTester",
                table: "Task",
                column: "IDWorkerTester");

            migrationBuilder.CreateIndex(
                name: "IX_Track_IDTask",
                table: "Track",
                column: "IDTask");

            migrationBuilder.CreateIndex(
                name: "IX_Track_IDWorker",
                table: "Track",
                column: "IDWorker");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "Track");

            migrationBuilder.DropTable(
                name: "Task");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropTable(
                name: "Worker");
        }
    }
}
