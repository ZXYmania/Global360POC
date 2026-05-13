FROM mcr.microsoft.com/dotnet/aspnet:10.0

COPY ./TodoList/bin/Release/net10.0/linux-x64 /App
WORKDIR /App
EXPOSE 8080

ENTRYPOINT ["dotnet", "./TodoList.dll"]