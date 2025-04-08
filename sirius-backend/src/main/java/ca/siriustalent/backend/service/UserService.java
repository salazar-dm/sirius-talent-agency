package ca.siriustalent.backend.service;

import ca.siriustalent.backend.api.model.LocalUserBody;
import ca.siriustalent.backend.api.model.LocalUserFilterBody;
import ca.siriustalent.backend.exception.*;
import ca.siriustalent.backend.model.dao.specification.LocalUserSpecifications;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.model.dao.LocalUserRepository;
import ca.siriustalent.backend.model.entities.PerformerProfile;
import ca.siriustalent.backend.utils.EmailUtil;
import ca.siriustalent.backend.utils.EncryptionUtil;
import ca.siriustalent.backend.utils.JwtUtil;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.cglib.core.Local;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final MongoTemplate mongoTemplate;
    private LocalUserRepository localUserRepository;
    private EmailUtil emailUtil;
    private JwtUtil jwtUtil;
    private EncryptionUtil encryptionUtil;

    public UserService(MongoTemplate mongoTemplate, LocalUserRepository localUserRepository, EmailUtil emailUtil, JwtUtil jwtUtil, EncryptionUtil encryptionUtil) {
        this.jwtUtil = jwtUtil;
        this.localUserRepository = localUserRepository;
        this.emailUtil = emailUtil;
        this.encryptionUtil = encryptionUtil;
        this.mongoTemplate = mongoTemplate;
    }

    public LocalUser getUser(String id) {
        return localUserRepository.findById(id).orElse(null);
    }

    public LocalUser getUserByTel(String tel) { return localUserRepository.findByTel(tel); }

    public List<LocalUser> getAllUsers() { return localUserRepository.findAll(); }

    public List<LocalUser> getAllUsersByRole(String role) { return localUserRepository.findAllByRole(role); }

    public List<LocalUser> getAllUsersByRoleAndUserActivated(String role, boolean userActivated) { return localUserRepository.findAllByRoleAndUserActivated(role, userActivated); }

    public List<LocalUser> getAllUsersByListIds(List<String> ids) { return localUserRepository.findAllById(ids); }

    public void deleteUser(String id) { localUserRepository.deleteById(id);}

    public LocalUser createUser(LocalUserBody localUserBody) {
        LocalUser user = new LocalUser();
        setLocalUser(user, localUserBody);

        if (!localUserBody.isEmailVerified()) {
            sendVerificationEmail(user);
        }

        return localUserRepository.save(user);
    }

    public LocalUser updateUser(LocalUserBody localUserBody) {
        LocalUser user = localUserRepository.findById(localUserBody.getId()).orElse(null);

        if (user == null) {
            throw new ResourceNotFoundException("UpdateUser: User not found with id: " + localUserBody.getId());
        }

        setLocalUser(user, localUserBody);
        return localUserRepository.save(user);
    }

    public String authenticate(LocalUserBody localUserBody) {
        LocalUser user = localUserRepository.findByTel(localUserBody.getTel());

        if (user != null && encryptionUtil.matches(localUserBody.getPassword(), user.getPassword())) {
            String id = user.getId();

            if (jwtUtil.isTokenRevokedByIdAndRevocable(id)) {
                String token = jwtUtil.getRevokedTokenById(id);
                jwtUtil.unrevokeToken(token);
            }

            if (!user.isEmailVerified()) {
                throw new AuthenticationException("Please verify your email first");
            }
            return jwtUtil.generateToken(id.toString(), user.getRole());
        }
        throw new AuthenticationException("Authenticate: Invalid credentials");
    }

    public LocalUser register(LocalUserBody localUserBody) {
        LocalUser user = new LocalUser();

        LocalUser existingUser = localUserRepository.findByTel(localUserBody.getTel());
        if (existingUser != null) {
            if (existingUser.isEmailVerified()) {
                throw new UserAlreadyExistsException("Register: User already exists");
            } else {
                deleteUser(existingUser.getId());
            }
        }

        setLocalUser(user, localUserBody);
        sendVerificationEmail(user);

        return localUserRepository.save(user);
    }

    public String verify(String token) {
        LocalUser user = getUserByTel(jwtUtil.extractSubject(token));

        if (user == null) {
            throw new ResourceNotFoundException("Verify: User not found with tel " + jwtUtil.extractSubject(token));
        }

        if (jwtUtil.isTokenExpired(token)) {
            deleteUser(user.getId());
            throw new AuthenticationException("Verify: Verification token has expired and user " + jwtUtil.extractSubject(token) + " has been deleted");
        }

        if (jwtUtil.validateToken(token, user.getTel())) {
            user.setEmailVerified(true);
            localUserRepository.save(user);

            String id = user.getId();
            return jwtUtil.generateToken(id.toString(), "Performer");
        } else {
            throw new AuthenticationException("Verify: Invalid verification token");
        }
    }

    public LocalUser activate(String token) {
        LocalUser user = getUser(jwtUtil.extractSubject(token));

        if (user == null) {
            throw new ResourceNotFoundException("Activate: User not found with id " + jwtUtil.extractSubject(token));
        }

        user.setUserActivated(true);
        return localUserRepository.save(user);
    }

    public LocalUser logout(String token) {
        LocalUser user = getUser(jwtUtil.extractSubject(token));

        if (user == null) {
            throw new ResourceNotFoundException("Logout: User not found by id " + jwtUtil.extractSubject(token));
        }

        jwtUtil.revokeToken(user.getId(), true);
        return user;
    }

    public String getCurrentUserRole(String token) {
        System.out.println(jwtUtil.extractRole(token));
        return jwtUtil.extractRole(token);
    }

    public List<LocalUser> filterUsers(LocalUserFilterBody filterBody) {
        Query query = LocalUserSpecifications.filterBy(filterBody);
        return mongoTemplate.find(query, LocalUser.class);
        //todo: controller
    }

    private void setLocalUser(LocalUser localUser, LocalUserBody localUserBody) {
        localUser.setTel(localUserBody.getTel());
        localUser.setEmail(localUserBody.getEmail());
        localUser.setPassword(encryptionUtil.encodePassword(localUserBody.getPassword()));
        localUser.setEmailVerified(localUserBody.isEmailVerified());
        localUser.setUserActivated(localUserBody.isUserActivated());
        localUser.setRole(localUserBody.getRole());
        localUser.setProfile(new PerformerProfile());
    }

    private void sendVerificationEmail(LocalUser user) {
        String email = user.getEmail();
        String token = jwtUtil.generateToken(user.getTel(), "");

        emailUtil.sendVerificationEmail(email, token);
    }

    private void isValidRole(String role) {
        if (!role.equals("Admin") && !role.equals("Performer") && !role.equals("Casting")) {
            throw new AuthenticationException("Register: Invalid role");
        }
    }

}
