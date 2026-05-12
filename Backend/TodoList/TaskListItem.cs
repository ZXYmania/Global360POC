public class TaskList
{
    public List<TaskList> itemList;
    public TaskList()
    {
        itemList = new List<TaskList>();
    }
    public class TaskListItem
    {
        Guid id;
        string content;

        public TaskListItem(string content)
        {
            id = Guid.NewGuid();
            this.content = content;
        }
    }
}