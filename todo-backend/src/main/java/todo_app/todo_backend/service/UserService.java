package todo_app.todo_backend.service;

import todo_app.todo_backend.dto.UserDto;

public interface UserService {

    UserDto createUser(UserDto userDto);
    UserDto getUserById(Long id);

}
