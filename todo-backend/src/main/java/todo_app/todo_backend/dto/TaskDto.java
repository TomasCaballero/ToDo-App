package todo_app.todo_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import todo_app.todo_backend.entity.User;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {
    private Long id;
    private String title;
    private String content;
    private LocalDate date;
    private User user;

//    public TaskDto(Long id, String title, String content, Date date, User user) {
//        this.id = id;
//        this.title = title;
//        this.content = content;
//        this.date = date;
//        this.user = user;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public String getContent() {
//        return content;
//    }
//
//    public Date getDate() {
//        return date;
//    }
//
//    public User getUser() {
//        return user;
//    }
}
