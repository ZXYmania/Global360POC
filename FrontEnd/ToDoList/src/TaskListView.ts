import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskListService } from './TaskList/api/services';
import { TaskListItem } from './TaskList/api/models';
import { TaskItem } from './TaskItem';

@Component({
  selector: 'TaskListView',
  standalone: true,
  imports: [TaskItem],
  template: `

      @for (item of results(); track item) {
        <TaskItem [item]=item [addToTaskList]="addTask"/>
      }
      <TaskItem [item]=addTaskItem />

    `
})

export class TaskListView implements OnInit {
  protected readonly results = signal<TaskListItem[] | null>(null);

  private taskListService = inject(TaskListService);
  protected addTaskItem : TaskListItem | undefined;

  async ngOnInit() {
    this.refreshTaskList();
  }

  async addTask(item: TaskListItem)
  {
    this.results()?.push(item);
    this.addTaskItem = {id: undefined, content: undefined};
  }

  async refreshTaskList()
  {
    this.results.set(await this.taskListService.v1TaskListGet$Json({ limit: 5 }));
    this.addTaskItem = {id: undefined, content: undefined};
  }
};