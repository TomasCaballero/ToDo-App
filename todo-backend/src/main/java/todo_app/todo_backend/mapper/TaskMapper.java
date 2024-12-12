package todo_app.todo_backend.mapper;

import todo_app.todo_backend.dto.TaskDto;
import todo_app.todo_backend.entity.Task;

public class TaskMapper {
    public static TaskDto mapToTaskDto(Task task){
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getContent(),
                task.getDate(),
                task.getUser()
        );
    }

    public static Task mapToTask(TaskDto taskDto){
        return new Task(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getContent(),
                taskDto.getDate(),
                taskDto.getUser()
        );
    }
}
