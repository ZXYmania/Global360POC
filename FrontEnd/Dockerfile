FROM node:latest

EXPOSE 4200
COPY ./ToDoList /App/ToDoList
WORKDIR /App/ToDoList
RUN npm install
RUN npm install -g @angular/cli
# RUN ng build
ENTRYPOINT command ng serve --allowed-hosts true --host '0.0.0.0' --proxy-config 'src/proxy.conf.json'