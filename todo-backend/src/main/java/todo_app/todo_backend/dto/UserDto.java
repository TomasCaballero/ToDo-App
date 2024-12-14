package todo_app.todo_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import todo_app.todo_backend.entity.Task;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private List<Task> tasks = new ArrayList<>();

//    public UserDto(Long id, String name, String email, String password, List<Task> tasks) {
//        this.id = id;
//        this.name = name;
//        this.email = email;
//        this.password = password;
//        this.tasks = tasks;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public List<Task> getTasks() {
//        return tasks;
//    }
//

}
