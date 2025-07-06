package ca.siriustalent.backend.service;

import ca.siriustalent.backend.api.model.LocalUserBody;
import ca.siriustalent.backend.api.model.LocalUserFilterBody;
import ca.siriustalent.backend.exception.*;
import ca.siriustalent.backend.model.dao.filter.PerformerProfileFilter;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Optional<LocalUser> getUserById(String id) {
        return localUserRepository.findById(id);
    }

    public LocalUser getUserByTel(String tel) { return localUserRepository.findByTel(tel); }

    public List<LocalUser> getAllUsers() { return localUserRepository.findAll(); }

    public Page<LocalUser> getAllUsersByPageable(Pageable pageable) {
        return localUserRepository.findAll(pageable);
    }

    public List<LocalUser> getAllUsersByRole(String role) { return localUserRepository.findAllByRole(role); }

    public List<LocalUser> getAllUsersByRoleAndUserActivated(String role, boolean userActivated) { return localUserRepository.findAllByRoleAndUserActivated(role, userActivated); }

    public List<LocalUser> getAllUsersByListIds(List<String> ids) { return localUserRepository.findAllById(ids); }

    public Page<LocalUser> searchUsers(String query, Pageable pageable) {
        return localUserRepository.searchUsers(query, pageable);
    }

    public void deleteUser(String id) { localUserRepository.deleteById(id);}

    public LocalUser createUser(LocalUserBody localUserBody, boolean sendVerificationEmail) {
        LocalUser user = new LocalUser();
        setLocalUser(user, localUserBody, true);

        if (sendVerificationEmail) {
            sendVerificationEmail(user);
        } else {
            user.setEmailVerified(true);
        }

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
        throw new AuthenticationException("Your phone number or password is incorrect");
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

        setLocalUser(user, localUserBody, true);
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

        if (user.isUserActivated() && user.isTestPassed()) {
            return user;
        }

        user.setTestPassed(true);
        user.setUserActivated(true);
        emailUtil.sendActivationEmail(user.getEmail());
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

    @Transactional
    public LocalUser update(String id, LocalUserBody localUserBody) {
        LocalUser user = localUserRepository.findById(id).orElse(null);

        if (user == null) {
            throw new ResourceNotFoundException("UpdateUser: User not found with id: " + localUserBody.getId());
        }

        boolean encodePassword = !user.getPassword().equals(localUserBody.getPassword());

        setLocalUser(user, localUserBody, encodePassword);
        return localUserRepository.save(user);
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

    private void setLocalUser(LocalUser localUser, LocalUserBody localUserBody, boolean encodePassword) {
        localUser.setTel(localUserBody.getTel());
        localUser.setEmail(localUserBody.getEmail());
        if (encodePassword) {
            localUser.setPassword(encryptionUtil.encodePassword(localUserBody.getPassword()));
        } else {
            localUser.setPassword(localUserBody.getPassword());
        }
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

    public List<LocalUser> filterPerformers(PerformerProfileFilter filter) {
        List<LocalUser> all = localUserRepository.findAllByRoleAndUserActivated("Performer", true);

        return all.stream()
                .filter(user -> {
                    PerformerProfile p = user.getProfile();
                    if (p == null) return false;

                    if (!matchIgnoreCase(p.getGender(), filter.getGender())) return false;
                    if (!matchIgnoreCase(p.getUnionStatus(), filter.getUnionStatus())) return false;
                    if (!matchIgnoreCase(p.getHairColor(), filter.getHairColor())) return false;
                    if (!matchIgnoreCase(p.getEyeColor(), filter.getEyeColor())) return false;
                    if (!matchIgnoreCase(p.getEthnicity(), filter.getEthnicity())) return false;
                    if (!matchIgnoreCase(p.getSizeJacket(), filter.getSizeJacket())) return false;
                    if (!matchIgnoreCase(p.getSizeDress(), filter.getSizeDress())) return false;
                    if (!matchIgnoreCase(p.getSizeBustCup(), filter.getSizeBustCup())) return false;

                    if (!matchBoolean(p.getLgbt(), filter.getLgbt())) return false;
                    if (!matchBoolean(p.getBipoc(), filter.getBipoc())) return false;
                    if (!matchBoolean(p.getTrans(), filter.getTrans())) return false;
                    if (!matchBoolean(p.getVisibleTattoos(), filter.getVisibleTattoos())) return false;
                    if (!matchBoolean(p.getSelfDrive(), filter.getSelfDrive())) return false;

                    if (!matchRange(p.getSizeHeight(), filter.getSizeHeightMin(), filter.getSizeHeightMax()))
                        return false;
                    if (!matchRange(p.getSizeWeight(), filter.getSizeWeightMin(), filter.getSizeWeightMax()))
                        return false;
                    if (!matchRange(p.getSizeChest(), filter.getSizeChestMin(), filter.getSizeChestMax())) return false;
                    if (!matchRange(p.getSizeWaist(), filter.getSizeWaistMin(), filter.getSizeWaistMax())) return false;
                    if (!matchRange(p.getSizeHips(), filter.getSizeHipsMin(), filter.getSizeHipsMax())) return false;
                    if (!matchRange(p.getSizeInseam(), filter.getSizeInseamMin(), filter.getSizeInseamMax()))
                        return false;
                    if (!matchRange(p.getSizeNeck(), filter.getSizeNeckMin(), filter.getSizeNeckMax())) return false;
                    if (!matchRange(p.getSizeSleeve(), filter.getSizeSleeveMin(), filter.getSizeSleeveMax()))
                        return false;
                    if (!matchRange(p.getSizeHat(), filter.getSizeHatMin(), filter.getSizeHatMax())) return false;
                    if (!matchRange(p.getSizeBustBand(), filter.getSizeBustBandMin(), filter.getSizeBustBandMax()))
                        return false;
                    if (!matchRange(p.getSizeShoe(), filter.getSizeShoeMin(), filter.getSizeShoeMax())) return false;

                    return true;
                })
                .collect(Collectors.toList());
    }

    private boolean matchIgnoreCase(String value, String filterValue) {
        return filterValue == null || (value != null && value.equalsIgnoreCase(filterValue));
    }

    private boolean matchBoolean(boolean actual, Boolean filter) {
        return filter == null || actual == filter;
    }

    private boolean matchRange(int actual, Integer min, Integer max) {
        if (min != null && actual < min) return false;
        if (max != null && actual > max) return false;
        return true;
    }

    private boolean matchRange(float actual, Float min, Float max) {
        if (min != null && actual < min) return false;
        if (max != null && actual > max) return false;
        return true;
    }




}

