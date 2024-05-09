﻿// <auto-generated />
using System;
using DomainModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataAccess.Migrations
{
    [DbContext(typeof(ControlProjectSystemContext))]
    [Migration("20240508222925_resfreshMessage")]
    partial class resfreshMessage
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DomainModel.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityAlwaysColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DateMessage")
                        .HasColumnType("date");

                    b.Property<int>("Idtask")
                        .HasColumnType("integer")
                        .HasColumnName("IDTask");

                    b.Property<int>("Idworker")
                        .HasColumnType("integer")
                        .HasColumnName("IDWorker");

                    b.Property<string>("TextMessage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id")
                        .HasName("Message_pkey");

                    b.HasIndex("Idtask");

                    b.HasIndex("Idworker");

                    b.ToTable("Message", (string)null);
                });

            modelBuilder.Entity("DomainModel.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityAlwaysColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DeadLine")
                        .HasColumnType("date");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying");

                    b.HasKey("Id")
                        .HasName("Project_pkey");

                    b.ToTable("Project", (string)null);
                });

            modelBuilder.Entity("DomainModel.Task", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityAlwaysColumn(b.Property<int>("Id"));

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)");

                    b.Property<DateOnly?>("Deadline")
                        .HasColumnType("date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Idproject")
                        .HasColumnType("integer")
                        .HasColumnName("IDProject");

                    b.Property<int?>("IdworkerAnalyst")
                        .HasColumnType("integer")
                        .HasColumnName("IDWorkerAnalyst");

                    b.Property<int?>("IdworkerCoder")
                        .HasColumnType("integer")
                        .HasColumnName("IDWorkerCoder");

                    b.Property<int?>("IdworkerMentor")
                        .HasColumnType("integer")
                        .HasColumnName("IDWorkerMentor");

                    b.Property<int?>("IdworkerTester")
                        .HasColumnType("integer")
                        .HasColumnName("IDWorkerTester");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying");

                    b.Property<string>("Priority")
                        .IsRequired()
                        .HasMaxLength(16)
                        .HasColumnType("character varying(16)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)");

                    b.HasKey("Id")
                        .HasName("Task_pkey");

                    b.HasIndex("Idproject");

                    b.HasIndex("IdworkerAnalyst");

                    b.HasIndex("IdworkerCoder");

                    b.HasIndex("IdworkerMentor");

                    b.HasIndex("IdworkerTester");

                    b.ToTable("Task", (string)null);
                });

            modelBuilder.Entity("DomainModel.Track", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityAlwaysColumn(b.Property<int>("Id"));

                    b.Property<int>("CountHours")
                        .HasColumnType("integer");

                    b.Property<DateOnly>("DateTrack")
                        .HasColumnType("date");

                    b.Property<int>("Idtask")
                        .HasColumnType("integer")
                        .HasColumnName("IDTask");

                    b.Property<int>("Idworker")
                        .HasColumnType("integer")
                        .HasColumnName("IDWorker");

                    b.Property<string>("StatusTask")
                        .IsRequired()
                        .HasColumnType("character varying");

                    b.HasKey("Id")
                        .HasName("Track_pkey");

                    b.HasIndex("Idtask");

                    b.HasIndex("Idworker");

                    b.ToTable("Track", (string)null);
                });

            modelBuilder.Entity("DomainModel.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<int?>("idWorker")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("DomainModel.Worker", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityAlwaysColumn(b.Property<int>("Id"));

                    b.Property<int>("PassportNum")
                        .HasColumnType("integer");

                    b.Property<int>("PassportSeries")
                        .HasColumnType("integer");

                    b.Property<string>("Person")
                        .IsRequired()
                        .HasColumnType("character varying");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("character varying");

                    b.HasKey("Id")
                        .HasName("Worker_pkey");

                    b.ToTable("Worker", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("DomainModel.Message", b =>
                {
                    b.HasOne("DomainModel.Task", "IdtaskNavigation")
                        .WithMany("Messages")
                        .HasForeignKey("Idtask")
                        .IsRequired()
                        .HasConstraintName("FK_Task");

                    b.HasOne("DomainModel.Worker", "IdworkerNavigation")
                        .WithMany("Messages")
                        .HasForeignKey("Idworker")
                        .IsRequired()
                        .HasConstraintName("FK_Worker");

                    b.Navigation("IdtaskNavigation");

                    b.Navigation("IdworkerNavigation");
                });

            modelBuilder.Entity("DomainModel.Task", b =>
                {
                    b.HasOne("DomainModel.Project", "IdprojectNavigation")
                        .WithMany("Tasks")
                        .HasForeignKey("Idproject")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Project");

                    b.HasOne("DomainModel.Worker", "IdworkerAnalystNavigation")
                        .WithMany("TaskIdworkerAnalystNavigations")
                        .HasForeignKey("IdworkerAnalyst")
                        .HasConstraintName("FK_WAnalyst");

                    b.HasOne("DomainModel.Worker", "IdworkerCoderNavigation")
                        .WithMany("TaskIdworkerCoderNavigations")
                        .HasForeignKey("IdworkerCoder")
                        .HasConstraintName("FK_WCoder");

                    b.HasOne("DomainModel.Worker", "IdworkerMentorNavigation")
                        .WithMany("TaskIdworkerMentorNavigations")
                        .HasForeignKey("IdworkerMentor")
                        .HasConstraintName("FK_WMentor");

                    b.HasOne("DomainModel.Worker", "IdworkerTesterNavigation")
                        .WithMany("TaskIdworkerTesterNavigations")
                        .HasForeignKey("IdworkerTester")
                        .HasConstraintName("FK_WTester");

                    b.Navigation("IdprojectNavigation");

                    b.Navigation("IdworkerAnalystNavigation");

                    b.Navigation("IdworkerCoderNavigation");

                    b.Navigation("IdworkerMentorNavigation");

                    b.Navigation("IdworkerTesterNavigation");
                });

            modelBuilder.Entity("DomainModel.Track", b =>
                {
                    b.HasOne("DomainModel.Task", "IdtaskNavigation")
                        .WithMany("Tracks")
                        .HasForeignKey("Idtask")
                        .IsRequired()
                        .HasConstraintName("FK_Task");

                    b.HasOne("DomainModel.Worker", "IdworkerNavigation")
                        .WithMany("Tracks")
                        .HasForeignKey("Idworker")
                        .IsRequired()
                        .HasConstraintName("FK_Worker");

                    b.Navigation("IdtaskNavigation");

                    b.Navigation("IdworkerNavigation");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("DomainModel.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("DomainModel.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DomainModel.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("DomainModel.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DomainModel.Project", b =>
                {
                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("DomainModel.Task", b =>
                {
                    b.Navigation("Messages");

                    b.Navigation("Tracks");
                });

            modelBuilder.Entity("DomainModel.Worker", b =>
                {
                    b.Navigation("Messages");

                    b.Navigation("TaskIdworkerAnalystNavigations");

                    b.Navigation("TaskIdworkerCoderNavigations");

                    b.Navigation("TaskIdworkerMentorNavigations");

                    b.Navigation("TaskIdworkerTesterNavigations");

                    b.Navigation("Tracks");
                });
#pragma warning restore 612, 618
        }
    }
}
