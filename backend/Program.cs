using EmpHub.Models;
using EmpHub.Services.Interfaces;
using EmpHub.Services;
using EmpHub.Repositories.Interfaces;
using EmpHub.Repositories;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

// Use Scoped with Interfaces
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
// builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
// builder.Services.AddScoped<IEmployeeService, EmployeeService>();



builder.Services.AddControllers();

builder.Services.AddHttpsRedirection(options =>
{
    options.HttpsPort = 7024; 
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//CORS configuration
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());


              
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}else
{
    // Use the restrictive policy in production
    app.UseCors();
}

app.UseHttpsRedirection();
app.UseCors(); // use CORS before Authorization
app.UseAuthorization();
app.MapControllers();

app.Run();