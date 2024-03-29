

using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TodoApi;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSingleton<ToDoDbContext>(); 


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseCors("AllowAll");



// builder.Services.AddSwaggerGen(c =>
// {
//     c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Description = "Keep track of your tasks", Version = "v1" });
// });

// app.UseSwagger();
// app.UseSwaggerUI(c =>
// {
//     c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1");
// });


// builder.Services.AddSwaggerGen(c =>
// {
//     c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Version = "v1" });
// });
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(options =>
//     {
//         options.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API v1");
//         options.RoutePrefix = string.Empty;
//     });
// }



app.MapGet("/", () => "Hello World!");


app.MapGet("/tasks", async (ToDoDbContext db) => 
await db.Items.ToListAsync()
);

app.MapPost("/tasks", async (ToDoDbContext dbContext, HttpRequest request) =>
{
    // Read the task data from the request body
    var newTask = await request.ReadFromJsonAsync<Item>();

    // Add the new task to the database
    dbContext.Items.Add(newTask);
    await dbContext.SaveChangesAsync();

    // Return a success message
    return "Task created successfully";
});

app.MapPut("/tasks/{id}", async (int id, ToDoDbContext dbContext, HttpRequest request) =>
{
    // Retrieve the task with the given ID from the database
    var taskToUpdate = await dbContext.Items.FindAsync(id);
    if (taskToUpdate == null)
    {
        return $"Task with ID {id} not found";
    }

    // Read the updated task data from the request body
    var updatedTaskData = await request.ReadFromJsonAsync<Item>();

    // Update the task properties with the new values
    taskToUpdate.Name = updatedTaskData.Name;
    taskToUpdate.IsComplete = updatedTaskData.IsComplete;

    // Save the changes back to the database
    await dbContext.SaveChangesAsync();

    // Return a success message
    return $"Task with ID {id} updated successfully";
});


app.MapDelete("/tasks/{id}", async (int id, ToDoDbContext dbContext) =>
{
    // Retrieve the task with the given ID from the database
    var taskToDelete = await dbContext.Items.FindAsync(id);
    if (taskToDelete == null)
    {
        return $"Task with ID {id} not found";
    }

    // Remove the task from the database
    dbContext.Items.Remove(taskToDelete);
    await dbContext.SaveChangesAsync();

    // Return a success message
    return $"Task with ID {id} deleted successfully";
});

app.Run();





