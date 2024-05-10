using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DomainModel;

public partial class ControlProjectSystemContext : IdentityDbContext<User>
{
    public ControlProjectSystemContext()
    {
    }

    public ControlProjectSystemContext(DbContextOptions<ControlProjectSystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<Track> Tracks { get; set; }

    public virtual DbSet<Worker> Workers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=ControlProjectSystem;Username=postgres;Password=P@ssw0rd");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Message_pkey");

            entity.ToTable("Message");

            entity.Property(e => e.Idtask).HasColumnName("IDTask");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .UseIdentityAlwaysColumn();

            entity.Property(e => e.Idworker).HasColumnName("IDWorker");

            entity.HasOne(d => d.IdtaskNavigation).WithMany(p => p.Messages)
                .HasForeignKey(d => d.Idtask)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Task");

            entity.HasOne(d => d.IdworkerNavigation).WithMany(p => p.Messages)
                .HasForeignKey(d => d.Idworker)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Worker");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Project_pkey");

            entity.ToTable("Project");

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
            entity.Property(e => e.Name).HasColumnType("character varying");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Task_pkey");

            entity.ToTable("Task");

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
            entity.Property(e => e.Category).HasMaxLength(128);
            entity.Property(e => e.Idproject).HasColumnName("IDProject");
            entity.Property(e => e.IdworkerAnalyst).HasColumnName("IDWorkerAnalyst");
            entity.Property(e => e.IdworkerCoder).HasColumnName("IDWorkerCoder");
            entity.Property(e => e.IdworkerMentor).HasColumnName("IDWorkerMentor");
            entity.Property(e => e.IdworkerTester).HasColumnName("IDWorkerTester");
            entity.Property(e => e.Name).HasColumnType("character varying");
            entity.Property(e => e.Priority).HasMaxLength(16);
            entity.Property(e => e.State).HasMaxLength(128);

            entity.HasOne(d => d.IdprojectNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.Idproject)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Project");

            entity.HasOne(d => d.IdworkerAnalystNavigation).WithMany(p => p.TaskIdworkerAnalystNavigations)
                .HasForeignKey(d => d.IdworkerAnalyst)
                .HasConstraintName("FK_WAnalyst");

            entity.HasOne(d => d.IdworkerCoderNavigation).WithMany(p => p.TaskIdworkerCoderNavigations)
                .HasForeignKey(d => d.IdworkerCoder)
                .HasConstraintName("FK_WCoder");

            entity.HasOne(d => d.IdworkerMentorNavigation).WithMany(p => p.TaskIdworkerMentorNavigations)
                .HasForeignKey(d => d.IdworkerMentor)
                .HasConstraintName("FK_WMentor");

            entity.HasOne(d => d.IdworkerTesterNavigation).WithMany(p => p.TaskIdworkerTesterNavigations)
                .HasForeignKey(d => d.IdworkerTester)
                .HasConstraintName("FK_WTester");
        });

        modelBuilder.Entity<Track>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Track_pkey");

            entity.ToTable("Track");

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
            entity.Property(e => e.Idtask).HasColumnName("IDTask");
            entity.Property(e => e.Idworker).HasColumnName("IDWorker");
            entity.Property(e => e.StatusTask).HasColumnType("character varying");

            entity.HasOne(d => d.IdtaskNavigation).WithMany(p => p.Tracks)
                .HasForeignKey(d => d.Idtask)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Task");

            entity.HasOne(d => d.IdworkerNavigation).WithMany(p => p.Tracks)
                .HasForeignKey(d => d.Idworker)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Worker");
        });

        modelBuilder.Entity<Worker>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Worker_pkey");

            entity.ToTable("Worker");

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
            entity.Property(e => e.Person).HasColumnType("character varying");
            entity.Property(e => e.Position).HasColumnType("character varying");
        });


/*        IList<Project> projectsData = new List<Project>
        {
            new Project() {Name = "FirstProject", DeadLine = DateOnly.MaxValue },
            new Project() {Name = "SecondProject", DeadLine = DateOnly.MinValue},
        };

        modelBuilder.Entity<Project>().HasData(projectsData);*/

        base.OnModelCreating(modelBuilder);
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
