import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskListService } from './TaskList/api/services';
import { TaskListItem } from './TaskList/api/models';

@Component({
  selector: 'TaskListView',
  standalone: true,
  template: `
    <h3>Hello {{ results() }}</h3>
  `
})

export class TaskListView implements OnInit {
  protected readonly results = signal<TaskListItem[] | null>(null);

  private taskListService = inject(TaskListService);

  async ngOnInit() {
    this.results.set(await this.taskListService.v1TaskListGet$Json({ limit: 5 }));
  }
};