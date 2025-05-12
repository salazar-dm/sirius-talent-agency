package ca.siriustalent.backend.model.dao;

import ca.siriustalent.backend.model.entities.LocalUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
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

    @Query("{ $or: [ " +
            "{ 'email': { $regex: ?0, $options: 'i' } }, " +
            "{ 'tel': { $regex: ?0, $options: 'i' } }, " +
            "{ 'reason': { $regex: ?0, $options: 'i' } }, " +
            "{ 'userActivated': { $regex: ?0, $options: 'i' } }, " +
            "{ 'performerProfile.firstName': { $regex: ?0, $options: 'i' } }, " +
            "{ 'performerProfile.lastName': { $regex: ?0, $options: 'i' } } " +
            "] }")
    Page<LocalUser> searchUsers(String keyword, Pageable pageable);
}