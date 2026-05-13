import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { TaskListView } from '../TaskListView';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskListView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('ToDoList');
}

bootstrapApplication(App);
