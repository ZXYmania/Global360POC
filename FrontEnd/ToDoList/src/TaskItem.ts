import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { TaskListItem } from "./TaskList/api/models";
import { TaskListService } from "./TaskList/api/services";

@Component({
  selector: 'TaskItem',
  standalone: true,
  template: `
    @if(item)
    {
        <div class="row">
            <div class="col-xs-6"> {{ item.id }} </div>
            <input [value]=item.content (focus)=ResetContent() (blur)=CreateOrUpdateTask($event.target.value) placeholder="Add Task">
            @if(this.item.id){<button (click)=DeleteItem()> Delete </button>}
        </div>
    }
    `
})

export class TaskItem {
  private taskListService = inject(TaskListService);
  @Input() item: TaskListItem = {id: undefined, content: ""};
  @Output() refreshEvent = new EventEmitter<void>;

  async ngOnInit() {
    console.log("inti");
    this.ResetContent();
  }

  async CreateOrUpdateTask(content: string)
  {
    if(this.item.id && content)
    {
        await this.taskListService.v1TaskListIdPost({ id: this.item.id, body:{content:content}});
        this.item.content = (await this.taskListService.v1TaskListIdGet$Json({id:this.item.id})).content;
    }
    else if(content)
    {
      await this.taskListService.v1TaskListPost$Plain({ body:{content:content}});
      this.refreshEvent.emit();
    }
  }

  ResetContent()
  {
    this.item = this.item?.id? {id: this.item.id, content: this.item.content} : { content: ""} ;
  }

  async DeleteItem()
  {
    if(this.item?.id)
    {
      await this.taskListService.v1TaskListDeleteIdPost({id:this.item.id});
      this.refreshEvent.emit();
    }
  }

}