package todo_app.todo_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "Title")
    private String title;
    @Column(name = "Content")
    private String content;
    @Column(name = "Date")
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

//    public Task(Long id, String title, String content, Date date, User user) {
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
