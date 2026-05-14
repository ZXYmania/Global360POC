import { Component, EventEmitter, inject, OnInit, Output, output, signal } from '@angular/core';
import { TaskListService } from './TaskList/api/services';
import { TaskListItem, PaginatedTaskListResponse } from './TaskList/api/models';
import { TaskItem } from './TaskItem';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'TaskListView',
  standalone: true,
  imports: [TaskItem],
  template: `
      @for (item of results()?.content; track item) {
        <TaskItem [id]=item.id [content]=item.content (refreshEvent)=OnRefreshEvent()/>
      }
      <div class ="row">
          <button (click)=UpdatePagination(false)> < </button>
          <button (click)=UpdatePagination(true)> > </button>
      </div>
    `
})

export class TaskListView implements OnInit {
  protected readonly results = signal<PaginatedTaskListResponse | null>(null);

  private taskListService = inject(TaskListService);
  protected start : number | undefined;
  protected amount : number | undefined;

  async ngOnInit() {
    this.RefreshTaskList();
  }

  async OnRefreshEvent()
  {
    this.RefreshTaskList();
  }

  async FetchPaginatedTaskList()
  {
    await this.taskListService.v2TaskListGet$Json({ start: this.start, amount: this.amount}).then(
      results => this.results.set({
            total: results.total,
            content: results.content? [...results.content, {content:""}] : [{content:""}]
          })
    ).catch(
      async error =>  {
        let httpError = error as HttpErrorResponse;
        if(httpError.status == 400 )
        {
          this.start = 0;
          let results : PaginatedTaskListResponse = await this.taskListService.v2TaskListGet$Json({ start:this.start, amount: this.amount});
          this.results.set({
            total: results.total,
            content: results?.content? [...results.content, {content:""}] : [{content:""}]
          })
            
        }
      }
    );
  }

  async RefreshTaskList()
  {
    this.start = this.start? this.start : 0;
    this.amount = this.amount? this.amount : 10;
    await this.FetchPaginatedTaskList();
  }

  UpdatePagination(more: boolean)
  {
    let total = this.results()?.total;
    this.start = this.start? this.start : 0;
    this.amount = this.amount? this.amount : 10;

    if(total)
    {
      if(more)
      {
        if(this.start + this.amount < total)
        {
          this.start += this.amount;
          this.RefreshTaskList();
        }
      }
      else
      {
        if(this.start - this.amount >= 0)
        {
            this.start -= this.amount;
            this.RefreshTaskList();
        }
      }
    }
  }
};