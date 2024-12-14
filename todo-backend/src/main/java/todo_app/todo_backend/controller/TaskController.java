package todo_app.todo_backend.controller;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import todo_app.todo_backend.dto.TaskDto;
import todo_app.todo_backend.service.TaskService;

@AllArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto){
        TaskDto savedTask = taskService.createTask(taskDto);
        return new ResponseEntity<>(savedTask,HttpStatus.CREATED);
    }
    // SELECT * FROM tasks JOIN users ON tasks.id = users.id;


    @GetMapping("{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable("id")Long id){
        TaskDto taskDto = taskService.getTaskById(id);
        return ResponseEntity.ok(taskDto);
    }
}
