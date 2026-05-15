import { Component, EventEmitter, inject, input, Input, InputSignal, OnInit, Output, signal } from "@angular/core";
import { TaskListService } from "./TaskList/api/services";

@Component({
  selector: 'TaskItem',
  standalone: true,
  template: `
        <div class="row">
            <input [value]=this.content() (change)="UpdateContent($event.target.value)" (blur)=CreateOrUpdateTask($event.target.value) placeholder="Add Task">
            @if(this.id){<button (click)=DeleteItem()> Delete </button>}
        </div>
    `
})

export class TaskItem implements OnInit {
  ngOnInit(): void {
  }
  private taskListService = inject(TaskListService);
  @Input() id: string | undefined;
  content : InputSignal<string | undefined | null> = input("") as InputSignal<string | undefined | null>;
  @Output() refreshEvent = new EventEmitter<void>;
  @Output() updateContentEvent = new EventEmitter<string>;

  async UpdateContent(content:string)
  {
    await this.updateContentEvent.emit(content);
  }

  async CreateOrUpdateTask(content: string)
  {
    if(this.id && content)
    {
      await this.taskListService.v1TaskListIdPost({ id: this.id, body:{content:content}});
    }
    else if(content)
    {
      await this.taskListService.v1TaskListPost$Plain({ body:{content:content}});
      await this.refreshEvent.emit();
      await this.updateContentEvent.emit(content);
    }
  }

  async DeleteItem()
  {
    if(this.id)
    {
      await this.taskListService.v1TaskListDeleteIdPost({id:this.id});
      await this.refreshEvent.emit();
    }
  }

}
