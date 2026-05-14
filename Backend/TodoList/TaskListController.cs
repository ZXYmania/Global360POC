using System.Net;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using static TaskList;

[ApiController]
[EnableCors("AllowFrontEnd")]
[Route("TaskList")]
public class TaskListController : ControllerBase
{    
    public TaskListController()
    {

    }

    [HttpGet]
    [Route("/v1/[controller]")]
    public ActionResult<IEnumerable<TaskListItem>> GetAllTaskList()
    {
        var output = TaskList.list.Values.ToList();
        return new ActionResult<IEnumerable<TaskListItem>>(output);
    }

    [HttpGet]
    [Route("/v2/[controller]")]
    public ActionResult<PaginatedTaskListResponse> GetAllTaskList([FromQuery]int start, [FromQuery] int amount)
    {
        if(start < 0 || start > TaskList.list.Count)
        {
            return new BadRequestResult();
        }
        var output = new PaginatedTaskList(TaskList.list.Values.ToList(), start, amount);
       
        return new PaginatedTaskListResponse(output.total, output.content);
    }

    [HttpGet]
    [Route("/v1/[controller]/{id}")]
    public ActionResult<TaskListItem> GetTaskById([FromRoute] Guid id)
    {
        if(TaskList.list.ContainsKey(id))
        {
            return new NotFoundResult();
        }
        return TaskList.list[id];
    }

    [HttpPost]
    [Route("/v1/[controller]")]
    public ActionResult<Guid> CreateTaskListItem([FromBody] CreateTaskListbody body)
    {
        var item = new TaskListItem(Guid.NewGuid(), body.content);
        TaskList.list.Add(item.id, item);
        return new ActionResult<Guid>(item.id);
    }

    [HttpPost]
    [Route("/v1/[controller]/{id}")]
    public ActionResult UpdateTaskListItem([FromRoute] Guid id, [FromBody] CreateTaskListbody body)
    {
        if(TaskList.list.ContainsKey(id))
        {
            TaskList.list[id] = new TaskListItem(id, body.content);
            return new OkResult();
        }
        return new NotFoundResult();
    }

    [HttpPost]
    [Route("/v1/[controller]/Delete/{id}")]
    public ActionResult DeleteTaskListItem([FromRoute] Guid id)
    {
        if(TaskList.list.ContainsKey(id))
        {
            TaskList.list.Remove(id);
            return new OkResult();
        }
        return new NotFoundResult();
    }

}