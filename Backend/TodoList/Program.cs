using Microsoft.AspNetCore.Http.HttpResults;
using static TaskList;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var list = new Dictionary<Guid, TaskListItem>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();


app.MapGet("/TaskList", () =>
{
    return list.Values;
})
.WithName("GetAllTaskList");

app.MapGet("/TaskList/{id}", (Guid id ) =>
{
    if(list.ContainsKey(id))
    {
        return list[id];
    }
    throw new NotImplementedException();
});

app.MapPost("/TaskList/", (String content) =>
{
    list.Add(Guid.NewGuid(), new TaskListItem(content));
});

app.MapPost("/TaskList/{id}", (Guid id, String content) =>
{
    if(list.ContainsKey(id))
    {
        list[id] = new TaskListItem(content);

    }
});


app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
