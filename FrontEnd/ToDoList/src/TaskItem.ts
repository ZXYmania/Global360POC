import { Component, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import { TaskListItem } from "./TaskList/api/models";
import { TaskListService } from "./TaskList/api/services";

@Component({
  selector: 'TaskItem',
  standalone: true,
  template: `
        <div class="row">
            <input [value]=this.content (blur)=CreateOrUpdateTask($event.target.value) placeholder="Add Task">
            @if(this.id){<button (click)=DeleteItem()> Delete </button>}
        </div>
    `
})

export class TaskItem implements OnInit {
  ngOnInit(): void {
  }
  private taskListService = inject(TaskListService);
  @Input() id: string | undefined;
  @Input() content: string | null | undefined;
  @Output() refreshEvent = new EventEmitter<void>;

  async CreateOrUpdateTask(content: string)
  {
    if(this.id && content)
    {
        await this.taskListService.v1TaskListIdPost({ id: this.id, body:{content:content}});
    }
    else if(content)
    {
      await this.taskListService.v1TaskListPost$Plain({ body:{content:content}});
      this.refreshEvent.emit();
    }
  }

  async DeleteItem()
  {
    if(this.id)
    {
      await this.taskListService.v1TaskListDeleteIdPost({id:this.id});
      this.refreshEvent.emit();
    }
  }

}