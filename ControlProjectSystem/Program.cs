using BusinesLogic.Service;
using DataAccess.RepositoryPostgreSQL;
using DomainModel;
using Interfaces.Repository;
using Interfaces.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ControlProjectSystemContext>(opt =>
opt.UseInMemoryDatabase("ControlProjectSystem"));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
    builder =>
    {
        builder.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();

    });
});

builder.Services.AddTransient<IDbRepos, DbReposPgs>();
builder.Services.AddTransient<IWorkerService, WorkerService>();
builder.Services.AddTransient<IProjectService, ProjectService>();
builder.Services.AddTransient<ITaskService, TaskService>();
builder.Services.AddTransient<ITrackService, TrackService>();
builder.Services.AddTransient<IMessageService, MessageService>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors();

app.Run();
