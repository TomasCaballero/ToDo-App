package todo_app.todo_backend.service.implementation;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import todo_app.todo_backend.dto.UserDto;
import todo_app.todo_backend.entity.User;
import todo_app.todo_backend.mapper.UserMapper;
import todo_app.todo_backend.repository.UserRepository;
import todo_app.todo_backend.service.UserService;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }
}