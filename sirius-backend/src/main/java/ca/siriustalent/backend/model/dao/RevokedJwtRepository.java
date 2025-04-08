package ca.siriustalent.backend.model.dao;

import ca.siriustalent.backend.model.entities.RevokedJwt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevokedJwtRepository extends MongoRepository<RevokedJwt, String> {

    RevokedJwt findByToken(String token);

    void deleteByToken(String token);
}