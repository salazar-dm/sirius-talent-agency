package ca.siriustalent.backend.model.dao.filter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PerformerProfileFilter {

    // string
    private String gender;
    private String unionStatus;
    private String hairColor;
    private String eyeColor;
    private String ethnicity;
    private String sizeJacket;
    private String sizeDress;
    private String sizeBustCup;

    // range
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

    private Integer sizeInseamMin;
    private Integer sizeInseamMax;

    private Integer sizeNeckMin;
    private Integer sizeNeckMax;

    private Integer sizeSleeveMin;
    private Integer sizeSleeveMax;

    private Float sizeShoeMin;
    private Float sizeShoeMax;

    private Integer sizeHatMin;
    private Integer sizeHatMax;

    private Integer sizeBustBandMin;
    private Integer sizeBustBandMax;

    // boolean
    private Boolean lgbt;
    private Boolean bipoc;
    private Boolean trans;
    private Boolean visibleTattoos;
    private Boolean selfDrive;
}
