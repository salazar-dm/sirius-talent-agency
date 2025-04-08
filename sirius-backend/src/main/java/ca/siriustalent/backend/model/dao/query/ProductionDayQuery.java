package ca.siriustalent.backend.model.dao.query;

import ca.siriustalent.backend.model.dao.LocalUserRepository;
import ca.siriustalent.backend.model.dao.ProductionDayRepositoryCustom;
import ca.siriustalent.backend.model.entities.ProductionDay;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Queue;

@Component
public class ProductionDayQuery implements ProductionDayRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public ProductionDayQuery(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<ProductionDay> findAllByClientIdAndFilter(String clientId, List<LocalDate> dates) {
        Query query = new Query();
        addClientIdToQuery(query, clientId);
        addDatesToQuery(query, dates);
        return mongoTemplate.find(query, ProductionDay.class);
    }

    public void addClientIdToQuery(Query query, String clientId) {
        if (clientId != null) {
            query.addCriteria(Criteria.where("clientId").is(clientId));
        }
    }

    public void addDatesToQuery(Query query, List<LocalDate> dates) {
        if (dates != null) {
            query.addCriteria(Criteria.where("date").in(dates));
        }
    }
}
