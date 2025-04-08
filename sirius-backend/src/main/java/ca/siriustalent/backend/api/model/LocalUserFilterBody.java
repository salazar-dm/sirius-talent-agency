package ca.siriustalent.backend.api.model;

import java.util.List;

public class LocalUserFilterBody {
    private String firstName;
    private String lastName;
    private List<String> unionStatuses;
    private Integer ageMin;
    private Integer ageMax;
    private List<String> cities;
    private String state;
    private Boolean selfDrive;
    private List<String> genders;
    private List<String> ethnicities;
    private List<String> hairColors;
    private List<String> eyeColors;
    private Integer sizeHeightMin;
    private Integer sizeHeightMax;
    private Integer sizeWeightMin;
    private Integer sizeWeightMax;
    private Integer sizeChestMin;
    private Integer sizeChestMax;
    private Integer sizeWaistMin;
    private Integer sizeWaistMax;
    private Integer sizeHipsMin;
    private Integer sizeHipsMax;
    private Float sizeShoeMin;
    private Float sizeShoeMax;
    private Integer sizeInseamMin;
    private Integer sizeInseamMax;
    private Integer sizeSleeveMin;
    private Integer sizeSleeveMax;
    private Integer sizeNeckMin;
    private Integer sizeNeckMax;
    private Integer sizeHatMin;
    private Integer sizeHatMax;


    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public List<String> getUnionStatuses() {
        return unionStatuses;
    }
    public List<String> getCities() {
        return cities;
    }
    public String getState() {
        return state;
    }
    public Boolean isSelfDrive() {
        return selfDrive;
    }
    public List<String> getGenders() {
        return genders;
    }
    public List<String> getEthnicities() {
        return ethnicities;
    }
    public List<String> getHairColors() {
        return hairColors;
    }
    public List<String> getEyeColors() {
        return eyeColors;
    }
    public Integer getAgeMin() {
        return ageMin;
    }
    public Integer getAgeMax() {
        return ageMax;
    }
    public Integer getSizeHeightMin() {
        return sizeHeightMin;
    }
    public Integer getSizeHeightMax() {
        return sizeHeightMax;
    }
    public Integer getSizeWeightMin() {
        return sizeWeightMin;
    }
    public Integer getSizeWeightMax() {
        return sizeWeightMax;
    }
    public Integer getSizeChestMin() {
        return sizeChestMin;
    }
    public Integer getSizeChestMax() {
        return sizeChestMax;
    }
    public Integer getSizeWaistMin() {
        return sizeWaistMin;
    }
    public Integer getSizeWaistMax() {
        return sizeWaistMax;
    }
    public Integer getSizeHipsMin() {
        return sizeHipsMin;
    }
    public Integer getSizeHipsMax() {
        return sizeHipsMax;
    }
    public Float getSizeShoeMin() {
        return sizeShoeMin;
    }
    public Float getSizeShoeMax() {
        return sizeShoeMax;
    }
    public Integer getSizeInseamMin() {
        return sizeInseamMin;
    }
    public Integer getSizeInseamMax() {
        return sizeInseamMax;
    }
    public Integer getSizeSleeveMin() {
        return sizeSleeveMin;
    }
    public Integer getSizeSleeveMax() {
        return sizeSleeveMax;
    }
    public Integer getSizeNeckMin() {
        return sizeNeckMin;
    }
    public Integer getSizeNeckMax() {
        return sizeNeckMax;
    }
    public Integer getSizeHatMin() {
        return sizeHatMin;
    }
    public Integer getSizeHatMax() {
        return sizeHatMax;
    }
}
