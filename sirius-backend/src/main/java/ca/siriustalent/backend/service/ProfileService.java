package ca.siriustalent.backend.service;

import ca.siriustalent.backend.api.model.ProfileBody;
import ca.siriustalent.backend.model.dao.LocalUserRepository;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.model.entities.PerformerProfile;
import ca.siriustalent.backend.utils.JwtUtil;
import org.joda.time.format.PeriodFormat;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private JwtUtil jwtUtil;
    private UserService userService;
    private LocalUserRepository localUserRepository;

    ProfileService(JwtUtil jwtUtil, UserService userService, LocalUserRepository localUserRepository) {
        this.localUserRepository = localUserRepository;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    public PerformerProfile getProfile(String token) {
        LocalUser user = userService.getUser(jwtUtil.extractSubject(token));
        return user.getProfile();
    }

    public LocalUser getUser(String token) {
        LocalUser user = userService.getUser(jwtUtil.extractSubject(token));
        return user;
    }

    public PerformerProfile createProfile(String token, ProfileBody profileBody) {
        LocalUser user = userService.getUser(jwtUtil.extractSubject(token));
        setProfile(user, profileBody);

        user.setUserActivated(true);
        localUserRepository.save(user);
        return user.getProfile();
    }

    public void deleteProfile(String token) {
        LocalUser user = userService.getUser(jwtUtil.extractSubject(token));
        setProfile(user, new ProfileBody());

        user.setUserActivated(false);
        localUserRepository.save(user);
    }

    @Transactional
    public void updateProfile(String token, ProfileBody profileBody) {
        LocalUser user = userService.getUser(jwtUtil.extractSubject(token));
        setProfile(user, profileBody);
        localUserRepository.save(user);
    }

    private void setProfile(LocalUser user, ProfileBody profileBody) {
        PerformerProfile performerProfile = new PerformerProfile();
        performerProfile.setKeyName(profileBody.getKeyName());
        performerProfile.setFullBodyKeyName(profileBody.getFullBodyKeyName());
        performerProfile.setDocumentKeyName(profileBody.getDocumentKeyName());
        performerProfile.setActraCardKeyName(profileBody.getActraCardKeyName());
        performerProfile.setWhasaKeyName(profileBody.getWhasaKeyName());
        performerProfile.setFirstName(profileBody.getFirstName());
        performerProfile.setMiddleName(profileBody.getMiddleName());
        performerProfile.setLastName(profileBody.getLastName());
        performerProfile.setUnionStatus(profileBody.getUnionStatus());
        performerProfile.setUnionId(profileBody.getUnionId());
        performerProfile.setDateOfBirth(profileBody.getDateOfBirth());
        performerProfile.setGuardianFullName(profileBody.getGuardianFullName());
        performerProfile.setGuardianTel(profileBody.getGuardianTel());
        performerProfile.setSocialInsuranceNumber(profileBody.getSocialInsuranceNumber());
        performerProfile.setEmergencyFullName(profileBody.getEmergencyFullName());
        performerProfile.setEmergencyTel(profileBody.getEmergencyTel());
        performerProfile.setCity(profileBody.getCity());
        performerProfile.setState(profileBody.getState());
        performerProfile.setPostalCode(profileBody.getPostalCode());
        performerProfile.setCountry(profileBody.getCountry());
        performerProfile.setSelfDrive(profileBody.isSelfDrive());
        performerProfile.setGender(profileBody.getGender());
        performerProfile.setEthnicity(profileBody.getEthnicity());
        performerProfile.setLgbt(profileBody.getLgbt());
        performerProfile.setBipoc(profileBody.getBipoc());
        performerProfile.setTrans(profileBody.getTrans());
        performerProfile.setVisibleTattoos(profileBody.getVisibleTattoos());
        performerProfile.setHairColor(profileBody.getHairColor());
        performerProfile.setEyeColor(profileBody.getEyeColor());
        performerProfile.setSizeHeight(profileBody.getSizeHeight());
        performerProfile.setSizeWeight(profileBody.getSizeWeight());
        performerProfile.setSizeChest(profileBody.getSizeChest());
        performerProfile.setSizeWaist(profileBody.getSizeWaist());
        performerProfile.setSizeHips(profileBody.getSizeHips());
        performerProfile.setSizeShoe(profileBody.getSizeShoe());
        performerProfile.setSizeInseam(profileBody.getSizeInseam());
        performerProfile.setSizeSleeve(profileBody.getSizeSleeve());
        performerProfile.setSizeNeck(profileBody.getSizeNeck());
        performerProfile.setSizeHat(profileBody.getSizeHat());
        performerProfile.setSizeJacket(profileBody.getSizeJacket());
        performerProfile.setSizeDress(profileBody.getSizeDress());
        performerProfile.setSizeBustBand(profileBody.getSizeBustBand());
        performerProfile.setSizeBustCup(profileBody.getSizeBustCup());
        user.setProfile(performerProfile);
    }
}
