package ca.siriustalent.backend.model.dl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import ca.siriustalent.backend.api.model.LocalUserBody;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.model.dao.LocalUserRepository;
import ca.siriustalent.backend.model.entities.PerformerProfile;
import ca.siriustalent.backend.service.UserService;
import org.junit.jupiter.api.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cglib.core.Local;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("dev")
public class DUserServiceLoader {

    private final Logger logger = LoggerFactory.getLogger(DUserServiceLoader.class);
    private final ObjectMapper objectMapper;

    private final UserService userService;
    private final LocalUserRepository localUserRepository;

    public DUserServiceLoader(UserService userService, LocalUserRepository localUserRepository, ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.userService = userService;
        this.localUserRepository = localUserRepository;
    }

    @PostConstruct
    public void init() throws JsonProcessingException {
        LocalUserBody localUserBody = new LocalUserBody();
        localUserBody.setTel("1-647-762-0123");
        localUserBody.setEmail("igor.hkrisanfov@gmail.com");
        localUserBody.setPassword("Igorhris1");
        localUserBody.setRole("Casting");

        LocalUser user = userService.register(localUserBody);

        user.setEmailVerified(true);
        localUserRepository.save(user);

        logger.info("DUser registered: {}", objectMapper.writeValueAsString(localUserBody));

        LocalUserBody localUserBodyPerformer = new LocalUserBody();
        localUserBodyPerformer.setTel("1-647-762-0121");
        localUserBodyPerformer.setEmail("igor.khriss@gmail.com");
        localUserBodyPerformer.setPassword("Igorhris1");
        localUserBodyPerformer.setRole("Performer");

        LocalUser userPerformer = userService.register(localUserBodyPerformer);

        userPerformer.setEmailVerified(true);
        userPerformer.setUserActivated(true);

        PerformerProfile profile = new PerformerProfile();

        profile.setKeyName("AB123");
        profile.setFirstName("Igor");
        profile.setLastName("Khrisanfov");
        profile.setUnionStatus("ACTRA Apprentice");
        profile.setUnionId("AM-37551");
        profile.setDateOfBirth("2004-11-30");
        profile.setSocialInsuranceNumber("123-456-789");
        profile.setCity("Toronto");
        profile.setState("ON");
        profile.setPostalCode("N1R 5S2");
        profile.setCountry("Canada");
        profile.setSelfDrive(true);
        profile.setGender("Male");
        profile.setEthnicity("Caucasian");
        profile.setHairColor("Brown");
        profile.setEyeColor("Blue");
        profile.setSizeHeight(180);  // in cm
        profile.setSizeWeight(75);   // in kg
        profile.setSizeChest(100);   // in cm
        profile.setSizeWaist(85);    // in cm
        profile.setSizeHips(95);     // in cm
        profile.setSizeShoe(42.5f); // European shoe size
        profile.setSizeInseam(32);   // in inches
        profile.setSizeSleeve(34);   // in inches
        profile.setSizeNeck(15);     // in inches
        profile.setSizeHat(7);       // hat size (inches)

        userPerformer.setProfile(profile);
        localUserRepository.save(userPerformer);

        logger.info("DUser authenticated: {}", objectMapper.writeValueAsString(localUserBodyPerformer));
    }
}