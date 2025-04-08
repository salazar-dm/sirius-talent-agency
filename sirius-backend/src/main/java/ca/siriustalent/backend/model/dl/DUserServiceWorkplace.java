package ca.siriustalent.backend.model.dl;

import jakarta.annotation.PostConstruct;
import ca.siriustalent.backend.model.dao.LocalUserRepository;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.service.UserService;
import ca.siriustalent.backend.utils.JwtUtil;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Profile("dev_change")
public class DUserServiceWorkplace {
    private final UserService userService;
    private final LocalUserRepository localUserRepository;
    private final JwtUtil jwtUtil;

    public DUserServiceWorkplace(UserService userService, LocalUserRepository localUserRepository, JwtUtil jwtUtil) {
        this.localUserRepository = localUserRepository;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostConstruct
    @Transactional
    public void init() {
        System.out.println(jwtUtil.extractRole("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2N2JmNGU0ZjI0YzhhZjY1Mjg0NmZkMzQiLCJyb2xlIjoiQ2FzdGluZyIsImV4cCI6MTc0MjQwNTExMywiaWF0IjoxNzQwNTkwNzEzfQ.GO9mv5Num3fhhT4n-IYo5J0jMJvFSwF5nv9J8LDxn-I"));
    }
}
