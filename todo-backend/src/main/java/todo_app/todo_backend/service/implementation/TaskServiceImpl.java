package todo_app.todo_backend.service.implementation;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import todo_app.todo_backend.dto.TaskDto;
import todo_app.todo_backend.entity.Task;
import todo_app.todo_backend.exception.ResourceNotFoundExeption;
import todo_app.todo_backend.mapper.TaskMapper;
import todo_app.todo_backend.repository.TaskRepository;
import todo_app.todo_backend.service.TaskService;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Task task = TaskMapper.mapToTask(taskDto);
        Task savedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(savedTask);
    }

    @Override
    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundExeption("No existe tarea con id "+id));
        return TaskMapper.mapToTaskDto(task);
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto updateTask) {
        Task task = taskRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundExeption("No existe tarea con id "+ id)
        );
        task.setTitle(updateTask.getTitle());
        task.setContent(updateTask.getContent());

        Task updateTaskObj = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(updateTaskObj);
    }


}
