package ca.siriustalent.backend.model.dao;

import ca.siriustalent.backend.model.entities.ProductionDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductionDayRepository extends MongoRepository<ProductionDay, String>, ProductionDayRepositoryCustom {

    List<ProductionDay> findAllByClientId(String clientId);

    Optional<ProductionDay> findByProductionAndDate(String production, LocalDate date);

    void deleteByClientIdAndProductionAndDate(String clientId, String production, LocalDate date);
}