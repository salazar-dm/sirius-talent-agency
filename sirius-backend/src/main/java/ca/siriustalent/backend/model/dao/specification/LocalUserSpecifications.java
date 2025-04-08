package ca.siriustalent.backend.model.dao.specification;

import ca.siriustalent.backend.api.model.LocalUserFilterBody;
import ca.siriustalent.backend.model.entities.LocalUser;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.time.LocalDate;

public class LocalUserSpecifications {
    public static Query filterBy(LocalUserFilterBody filterBody) {
        Query query = new Query();

        if (filterBody.getFirstName() != null) {
            query.addCriteria(Criteria.where("firstName").is(filterBody.getFirstName()));
        }
        if (filterBody.getLastName() != null) {
            query.addCriteria(Criteria.where("lastName").is(filterBody.getLastName()));
        }
        if (filterBody.getUnionStatuses() != null && !filterBody.getUnionStatuses().isEmpty()) {
            query.addCriteria(Criteria.where("unionStatus").in(filterBody.getUnionStatuses()));
        }
        if (filterBody.getAgeMin() != null && filterBody.getAgeMax() != null) {
            LocalDate today = LocalDate.now();
            LocalDate minDate = today.minusYears(filterBody.getAgeMax());
            LocalDate maxDate = today.minusYears(filterBody.getAgeMin());
            query.addCriteria(Criteria.where("dateOfBirth").gte(minDate).lte(maxDate));
        }
        if (filterBody.isSelfDrive() != null) {
            query.addCriteria(Criteria.where("selfDrive").is(filterBody.isSelfDrive()));
        }
        if (filterBody.getCities() != null && !filterBody.getCities().isEmpty()) {
            query.addCriteria(Criteria.where("city").in(filterBody.getCities()));
        }
        if (filterBody.getState() != null) {
            query.addCriteria(Criteria.where("state").is(filterBody.getState()));
        }
        if (filterBody.getGenders() != null && !filterBody.getGenders().isEmpty()) {
            query.addCriteria(Criteria.where("gender").in(filterBody.getGenders()));
        }
        if (filterBody.getEthnicities() != null && !filterBody.getEthnicities().isEmpty()) {
            query.addCriteria(Criteria.where("ethnicity").in(filterBody.getEthnicities()));
        }
        if (filterBody.getHairColors() != null && !filterBody.getHairColors().isEmpty()) {
            query.addCriteria(Criteria.where("hairColor").in(filterBody.getHairColors()));
        }
        if (filterBody.getEyeColors() != null && !filterBody.getEyeColors().isEmpty()) {
            query.addCriteria(Criteria.where("eyeColor").in(filterBody.getEyeColors()));
        }
        if (filterBody.getSizeHeightMin() != null && filterBody.getSizeHeightMax() != null) {
            query.addCriteria(Criteria.where("sizeHeight").gte(filterBody.getSizeHeightMin()).lte(filterBody.getSizeHeightMax()));
        }
        if (filterBody.getSizeWeightMin() != null && filterBody.getSizeWeightMax() != null) {
            query.addCriteria(Criteria.where("sizeWeight").gte(filterBody.getSizeWeightMin()).lte(filterBody.getSizeWeightMax()));
        }
        if (filterBody.getSizeChestMin() != null && filterBody.getSizeChestMax() != null) {
            query.addCriteria(Criteria.where("sizeChest").gte(filterBody.getSizeChestMin()).lte(filterBody.getSizeChestMax()));
        }
        if (filterBody.getSizeWaistMin() != null && filterBody.getSizeWaistMax() != null) {
            query.addCriteria(Criteria.where("sizeWaist").gte(filterBody.getSizeWaistMin()).lte(filterBody.getSizeWaistMax()));
        }
        if (filterBody.getSizeHipsMin() != null && filterBody.getSizeHipsMax() != null) {
            query.addCriteria(Criteria.where("sizeHips").gte(filterBody.getSizeHipsMin()).lte(filterBody.getSizeHipsMax()));
        }
        if (filterBody.getSizeShoeMin() != null && filterBody.getSizeShoeMax() != null) {
            query.addCriteria(Criteria.where("sizeShoe").gte(filterBody.getSizeShoeMin()).lte(filterBody.getSizeShoeMax()));
        }
        if (filterBody.getSizeInseamMin() != null && filterBody.getSizeInseamMax() != null) {
            query.addCriteria(Criteria.where("sizeInseam").gte(filterBody.getSizeInseamMin()).lte(filterBody.getSizeInseamMax()));
        }
        if (filterBody.getSizeSleeveMin() != null && filterBody.getSizeSleeveMax() != null) {
            query.addCriteria(Criteria.where("sizeSleeve").gte(filterBody.getSizeSleeveMin()).lte(filterBody.getSizeSleeveMax()));
        }
        if (filterBody.getSizeNeckMin() != null && filterBody.getSizeNeckMax() != null) {
            query.addCriteria(Criteria.where("sizeNeck").gte(filterBody.getSizeNeckMin()).lte(filterBody.getSizeNeckMax()));
        }
        if (filterBody.getSizeHatMin() != null && filterBody.getSizeHatMax() != null) {
            query.addCriteria(Criteria.where("sizeHat").gte(filterBody.getSizeHatMin()).lte(filterBody.getSizeHatMax()));
        }

        return query;
    }
}