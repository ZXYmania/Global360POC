using System.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
TaskList.Initialise();
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddCors(o => o.AddPolicy("AllowFrontEnd", builder =>
{
    builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
}));

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "TaskList", Version = "v1" });
});



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapSwagger();
}
app.UseSwagger();

app.UseCors("AllowFrontEnd"); 


app.Use(async (context, next) =>
{
    if (context.Request.Method == HttpMethods.Options)
    {
        context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
        context.Response.Headers.Append("Allow", "GET, POST, PUT, OPTIONS");
        context.Response.StatusCode = (int)HttpStatusCode.OK;
        return;
    }
    await next.Invoke();
});


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
