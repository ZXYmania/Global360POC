using System.Drawing;

public class TaskList
{
    public static Dictionary<Guid, TaskListItem> list;
    public static void Initialise()
    {
        list = new Dictionary<Guid,TaskListItem>();
    }
    public record TaskListItem(Guid id, string content);

    public record CreateTaskListbody(String content);

    public struct PaginatedTaskList
    {
        public int total;
        public List<TaskListItem> content;

        public PaginatedTaskList(IEnumerable<TaskListItem> list, int start, int amount)
        {
            this.total = list.Count();
            int range = list.Count() - start;
            this.content = list.ToList().GetRange(start, range < amount? range: amount);
        }
    }

    public record PaginatedTaskListResponse(int total, List<TaskListItem> content);
}
