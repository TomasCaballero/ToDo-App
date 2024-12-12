package todo_app.todo_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import todo_app.todo_backend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
