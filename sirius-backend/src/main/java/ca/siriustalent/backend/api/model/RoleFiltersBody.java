package ca.siriustalent.backend.api.model;

public class RoleFiltersBody {
    private String unionStatus;
    private Range age;
    private String city;
    private Boolean selfDrive;
    private String gender;
    private String ethnicity;
    private Boolean lgbt;
    private Boolean bipoc;
    private Boolean trans;
    private Boolean visibleTattoos;

    private Range sizeHeight;
    private Range sizeWeight;
    private Range sizeChest;
    private Range sizeWaist;
    private Range sizeHips;
    private Range sizeShoe;
    private Range sizeInseam;

    // --- Inner static classes for structured ranges ---

    public static class Range {
        private Integer min;
        private Integer max;

        public Integer getMin() {
            return min;
        }

        public void setMin(Integer min) {
            this.min = min;
        }

        public Integer getMax() {
            return max;
        }

        public void setMax(Integer max) {
            this.max = max;
        }
    }

    // --- Getters and setters ---

    public String getUnionStatus() {
        return unionStatus;
    }

    public void setUnionStatus(String unionStatus) {
        this.unionStatus = unionStatus;
    }

    public Range getAge() {
        return age;
    }

    public void setAge(Range age) {
        this.age = age;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Boolean getSelfDrive() {
        return selfDrive;
    }

    public void setSelfDrive(Boolean selfDrive) {
        this.selfDrive = selfDrive;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEthnicity() {
        return ethnicity;
    }

    public void setEthnicity(String ethnicity) {
        this.ethnicity = ethnicity;
    }

    public Boolean getLgbt() {
        return lgbt;
    }

    public void setLgbt(Boolean lgbt) {
        this.lgbt = lgbt;
    }

    public Boolean getBipoc() {
        return bipoc;
    }

    public void setBipoc(Boolean bipoc) {
        this.bipoc = bipoc;
    }

    public Boolean getTrans() {
        return trans;
    }

    public void setTrans(Boolean trans) {
        this.trans = trans;
    }

    public Boolean getVisibleTattoos() {
        return visibleTattoos;
    }

    public void setVisibleTattoos(Boolean visibleTattoos) {
        this.visibleTattoos = visibleTattoos;
    }

    public Range getSizeHeight() {
        return sizeHeight;
    }

    public void setSizeHeight(Range sizeHeight) {
        this.sizeHeight = sizeHeight;
    }

    public Range getSizeWeight() {
        return sizeWeight;
    }

    public void setSizeWeight(Range sizeWeight) {
        this.sizeWeight = sizeWeight;
    }

    public Range getSizeChest() {
        return sizeChest;
    }

    public void setSizeChest(Range sizeChest) {
        this.sizeChest = sizeChest;
    }

    public Range getSizeWaist() {
        return sizeWaist;
    }

    public void setSizeWaist(Range sizeWaist) {
        this.sizeWaist = sizeWaist;
    }

    public Range getSizeHips() {
        return sizeHips;
    }

    public void setSizeHips(Range sizeHips) {
        this.sizeHips = sizeHips;
    }

    public Range getSizeShoe() {
        return sizeShoe;
    }

    public void setSizeShoe(Range sizeShoe) {
        this.sizeShoe = sizeShoe;
    }

    public Range getSizeInseam() {
        return sizeInseam;
    }

    public void setSizeInseam(Range sizeInseam) {
        this.sizeInseam = sizeInseam;
    }
}

