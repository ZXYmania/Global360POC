public class TaskList
{
    public static Dictionary<Guid, TaskListItem> list;
    public static void Initialise()
    {
        list = new Dictionary<Guid,TaskListItem>();
    }
    public record TaskListItem(Guid id, string content);

    public record CreateTaskListbody(String content);

}
