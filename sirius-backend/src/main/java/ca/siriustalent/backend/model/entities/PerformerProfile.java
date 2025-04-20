package ca.siriustalent.backend.model.entities;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class PerformerProfile {

    private String keyName;
    private String fullBodyKeyName;
    private String documentKeyName;
    // === ЕСЛИ ВЫБРАН АКТРА СТАТУС ===
    private String actraCardKeyName;

    private String whasaKeyName;

    private String firstName;
    private String middleName;
    private String lastName;
    private String unionStatus;
    private String unionId;
    private String dateOfBirth;
    private String guardianFullName;
    private String guardianTel;
    private String socialInsuranceNumber;
    private String emergencyFullName;
    private String emergencyTel;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private boolean selfDrive;
    private String gender;
    private String ethnicity;
    private boolean lgbt;
    private boolean bipoc;
    private boolean trans;
    private boolean visibleTattoos;
    private String hairColor;
    private String eyeColor;
    // === ОБЩИЕ ДЛЯ ВСЕХ ===
    private int sizeHeight;
    private int sizeWeight;
    private int sizeChest;
    private int sizeWaist;
    private int sizeHips;
    private int sizeInseam;
    private int sizeNeck;
    private int sizeSleeve;
    private float sizeShoe;
    private int sizeHat;

    // === ТОЛЬКО ДЛЯ МУЖЧИН ===
    private String sizeJacket;   // short, regular, tall

    // === ТОЛЬКО ДЛЯ ЖЕНЩИН ===
    private String sizeBustCup;  // AA, A, B, C, D, DD/E, DDD/F
    private int sizeBustBand;    // 30, 32, 34, ...
    private String sizeDress;    // 0, 0-2, 2, 2-4, ..., 14

    public PerformerProfile() {
        this.keyName = "";
        this.fullBodyKeyName = "";
        this.documentKeyName = "";

        this.actraCardKeyName = "";
        this.whasaKeyName = "";
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.unionStatus = "";
        this.unionId = "";
        this.dateOfBirth = "";

        this.guardianFullName = "";
        this.guardianTel = "";
        this.socialInsuranceNumber = "";

        this.emergencyFullName = "";
        this.emergencyTel = "";
        this.city = "";
        this.state = "";
        this.postalCode = "";
        this.country = "";
        this.selfDrive = false;
        this.gender = "";
        this.ethnicity = "";

        this.lgbt = false;
        this.bipoc = false;
        this.trans = false;
        this.visibleTattoos = false;
        this.hairColor = "";
        this.eyeColor = "";
        this.sizeHeight = 0;
        this.sizeWeight = 0;
        this.sizeChest = 0;
        this.sizeWaist = 0;
        this.sizeHips = 0;
        this.sizeShoe = 0.0f;
        this.sizeInseam = 0;
        this.sizeSleeve = 0;
        this.sizeNeck = 0;
        this.sizeHat = 0;
        this.sizeJacket = "";
        this.sizeBustCup = "";
        this.sizeBustBand = 0;
        this.sizeDress = "";
    }


    public boolean getLgbt() {
        return lgbt;
    }

    public void setLgbt(boolean lgbt) {
        this.lgbt = lgbt;
    }

    public boolean getBipoc() {
        return bipoc;
    }

    public void setBipoc(boolean bipoc) {
        this.bipoc = bipoc;
    }

    public boolean getTrans() {
        return trans;
    }

    public void setTrans(boolean trans) {
        this.trans = trans;
    }
    public String getGuardianFullName() {
        return guardianFullName;
    }
    public void setGuardianFullName(String guardianFullName) {
        this.guardianFullName = guardianFullName;
    }
    public String getGuardianTel() {
        return guardianTel;
    }
    public void setGuardianTel(String guardianTel) {
        this.guardianTel = guardianTel;
    }

    public String getEmergencyFullName() {
        return emergencyFullName;
    }
    public void setEmergencyFullName(String emergencyFullName) {
        this.emergencyFullName = emergencyFullName;
    }
    public String getEmergencyTel() {
        return emergencyTel;
    }
    public void setEmergencyTel(String emergencyTel) {
        this.emergencyTel = emergencyTel;
    }

    public String getKeyName() {
        return keyName;
    }
    public void setKeyName(String keyName) {
        this.keyName = keyName;
    }
    public String getFullBodyKeyName() {
        return fullBodyKeyName;
    }
    public void setFullBodyKeyName(String fullBodyKeyName) {
        this.fullBodyKeyName = fullBodyKeyName;
    }
    public String getDocumentKeyName() {
        return documentKeyName;
    }
    public void setDocumentKeyName(String documentKeyName) {
        this.documentKeyName = documentKeyName;
    }

    public String getActraCardKeyName() {
        return actraCardKeyName;
    }
    public void setActraCardKeyName(String actraCardKeyName) {
        this.actraCardKeyName = actraCardKeyName;
    }

    public String getWhasaKeyName() {
        return whasaKeyName;
    }
    public void setWhasaKeyName(String whasaKeyName) {
        this.whasaKeyName = whasaKeyName;
    }

    public String getMiddleName() {
        return middleName;
    }
    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public int getSizeHat() {
        return sizeHat;
    }

    public void setSizeHat(int sizeHat) {
        this.sizeHat = sizeHat;
    }

    public int getSizeNeck() {
        return sizeNeck;
    }

    public void setSizeNeck(int sizeNeck) {
        this.sizeNeck = sizeNeck;
    }

    public int getSizeSleeve() {
        return sizeSleeve;
    }

    public void setSizeSleeve(int sizeSleeve) {
        this.sizeSleeve = sizeSleeve;
    }

    public int getSizeInseam() {
        return sizeInseam;
    }

    public void setSizeInseam(int sizeInseam) {
        this.sizeInseam = sizeInseam;
    }

    public float getSizeShoe() {
        return sizeShoe;
    }

    public void setSizeShoe(float sizeShoe) {
        this.sizeShoe = sizeShoe;
    }

    public int getSizeHips() {
        return sizeHips;
    }

    public void setSizeHips(int sizeHips) {
        this.sizeHips = sizeHips;
    }

    public int getSizeWaist() {
        return sizeWaist;
    }

    public void setSizeWaist(int sizeWaist) {
        this.sizeWaist = sizeWaist;
    }

    public int getSizeChest() {
        return sizeChest;
    }

    public void setSizeChest(int sizeChest) {
        this.sizeChest = sizeChest;
    }

    public int getSizeWeight() {
        return sizeWeight;
    }

    public void setSizeWeight(int sizeWeight) {
        this.sizeWeight = sizeWeight;
    }

    public int getSizeHeight() {
        return sizeHeight;
    }

    public void setSizeHeight(int sizeHeight) {
        this.sizeHeight = sizeHeight;
    }

    public String getEyeColor() {
        return eyeColor;
    }

    public void setEyeColor(String eyeColor) {
        this.eyeColor = eyeColor;
    }

    public String getHairColor() {
        return hairColor;
    }

    public void setHairColor(String hairColor) {
        this.hairColor = hairColor;
    }

    public String getEthnicity() {
        return ethnicity;
    }

    public void setEthnicity(String ethnicity) {
        this.ethnicity = ethnicity;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean getSelfDrive() {
        return selfDrive;
    }

    public void setVisibleTattoos(boolean visibleTattoos) {
        this.visibleTattoos = visibleTattoos;
    }

    public boolean getVisibleTattoos() {
        return visibleTattoos;
    }

    public void setSelfDrive(boolean selfDrive) {
        this.selfDrive = selfDrive;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getSocialInsuranceNumber() {
        return socialInsuranceNumber;
    }

    public void setSocialInsuranceNumber(String socialInsuranceNumber) {
        this.socialInsuranceNumber = socialInsuranceNumber;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getUnionId() {
        return unionId;
    }

    public void setUnionId(String unionId) {
        this.unionId = unionId;
    }

    public String getUnionStatus() {
        return unionStatus;
    }

    public void setUnionStatus(String unionStatus) {
        this.unionStatus = unionStatus;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSizeJacket() {
        return sizeJacket;
    }

    public void setSizeJacket(String sizeJacket) {
        this.sizeJacket = sizeJacket;
    }

    public String getSizeBustCup() {
        return sizeBustCup;
    }

    public void setSizeBustCup(String sizeBustCup) {
        this.sizeBustCup = sizeBustCup;
    }

    public int getSizeBustBand() {
        return sizeBustBand;
    }

    public void setSizeBustBand(int sizeBustBand) {
        this.sizeBustBand = sizeBustBand;
    }

    public String getSizeDress() {
        return sizeDress;
    }

    public void setSizeDress(String sizeDress) {
        this.sizeDress = sizeDress;
    }

}