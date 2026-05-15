# How to Use
Run the Following commands
* docker compose build
* docker compose up


# Development Commands
## Publish BackEnd
dotnet publish --os linux --arch x64 -p:PublishProfile=DefaultContainer -c Release
dotnet swagger tofile --output ..\..\FrontEnd\ToDoList\swagger.json --host /backend .\bin\Release\net10.0\linux-x64\TodoList.dll v1

## AutoGen AngularAPI
npm install -g ng-openapi-gen
ng-openapi-gen --input swagger.json --output src/TaskList/api --services true