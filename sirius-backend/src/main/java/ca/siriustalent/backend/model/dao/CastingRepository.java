package ca.siriustalent.backend.model.dao;

import ca.siriustalent.backend.model.entities.Casting;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CastingRepository extends MongoRepository<Casting, String> {
}
