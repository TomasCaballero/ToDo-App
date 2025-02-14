package todo_app.todo_backend.service;

import todo_app.todo_backend.dto.TaskDto;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);
    TaskDto getTaskById(Long id);
    TaskDto updateTask(Long id, TaskDto updateTask);
    void deleteTask(Long id);
}
