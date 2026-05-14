import { Component, inject, Input } from "@angular/core";
import { TaskListItem } from "./TaskList/api/models";
import { promises } from "dns";
import { TaskListService } from "./TaskList/api/services";

@Component({
  selector: 'TaskItem',
  standalone: true,
  template: `
    @if(item)
    {
        <div class="row">
            <div class="col-xs-6"> {{ item.id }} </div>
            <input [value]=item.content (blur)=CreateOrUpdateTask($event.target.value) placeholder="Add Task">
        </div>
    }
    `
})

export class TaskItem {
  
  private taskListService = inject(TaskListService);
  @Input() item: TaskListItem | undefined;
  @Input() addToTaskList : ((item: TaskListItem) => Promise<void>) | undefined;


  async CreateOrUpdateTask(content: string)
  {
    console.log(this.item);
    console.log(content);

    if(!this.item)
    {
      this.item = {id:undefined,content:undefined};
      console.log("no item");
    }
    if(this.item.id)
    {
        await this.taskListService.v1TaskListIdPost({ id: this.item.id, body:{content:content}});
        this.item.content = (await this.taskListService.v1TaskListIdGet$Json({id:this.item.id})).content;
    }
    else
    {
        console.log("create");
        let id = await this.taskListService.v1TaskListPost$Plain({ body:{content:content}});
        let taskItem :TaskListItem = (await this.taskListService.v1TaskListIdGet$Json({id:id}));
        await this.addToTaskList!(taskItem);
    }
  }

}