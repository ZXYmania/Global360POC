FROM node:latest
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200
COPY ./ToDoList /App/ToDoList
WORKDIR /App/ToDoList
RUN npm install
RUN npm install -g @angular/cli
ENTRYPOINT command ng serve --allowed-hosts true