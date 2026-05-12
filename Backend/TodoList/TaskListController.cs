using Microsoft.AspNetCore.Mvc;
using static TaskList;

[ApiController]
[Route("TaskList")]
public class TaskListController : ControllerBase
{
    public TaskListController()
    {

    }

    [HttpGet]
    public ActionResult<IEnumerable<TaskListItem>> GetAllTaskList()
    {
        var output = TaskList.list.Values.ToList<TaskListItem>();
        return new ActionResult<IEnumerable<TaskListItem>>(output);
    }

    [HttpGet]
    [Route("{id}")]
    public ActionResult<TaskListItem> GetTaskById([FromRoute] Guid id)
    {
        if(TaskList.list.ContainsKey(id))
        {
            return new ActionResult<TaskListItem>(TaskList.list[id]);
        }
        return new NotFoundResult();
    }

    [HttpPost]
    public ActionResult<Guid> CreateTaskListItem([FromBody] string content)
    {
        var item = new TaskListItem(Guid.NewGuid(), content);
        TaskList.list.Add(item.id, item);
        return new ActionResult<Guid>(item.id);
    }

    [HttpPost]
    [Route("{id}")]
    public ActionResult UpdateTaskListItem(Guid id, [FromBody] string content)
    {
        if(TaskList.list.ContainsKey(id))
        {
            TaskList.list[id] = new TaskListItem(id, content);
            return new OkResult();
        }
        return new NotFoundResult();
    }

}