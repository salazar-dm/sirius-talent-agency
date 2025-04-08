package ca.siriustalent.backend.model.dao;

import ca.siriustalent.backend.model.entities.LocalUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocalUserRepository extends MongoRepository<LocalUser, String> {

    Optional<LocalUser> findById(String id);

    LocalUser findByTel(String tel);

    List<LocalUser> findAllBySubmissionPending(boolean submissionPending);

    List<LocalUser> findAllByRole(String role);

    List<LocalUser> findAllByRoleAndUserActivated(String role, boolean userActivated);
}