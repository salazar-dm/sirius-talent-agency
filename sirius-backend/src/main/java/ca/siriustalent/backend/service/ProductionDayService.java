package ca.siriustalent.backend.service;

import ca.siriustalent.backend.api.model.ProductionDayBody;
import ca.siriustalent.backend.exception.EmailFailureException;
import ca.siriustalent.backend.exception.ProductionDayAlreadyExistsException;
import ca.siriustalent.backend.exception.ResourceNotFoundException;
import ca.siriustalent.backend.model.dao.LocalUserRepository;
import ca.siriustalent.backend.model.dao.ProductionDayRepository;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.model.entities.Participant;
import ca.siriustalent.backend.model.entities.ProductionDay;
import ca.siriustalent.backend.utils.EmailUtil;
import ca.siriustalent.backend.utils.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductionDayService {

    private final QueryService queryService;
    private final ProductionDayRepository productionDayRepository;
    private final UserService userService;
    private final EmailUtil emailUtil;
    private final JwtUtil jwtUtil;

    private static final String STATUS_AVAILABILITY_CHECK = "Availability Check";
    private static final String STATUS_AWAITING_CONFIRMATION = "Awaiting Confirmation";
    private static final String STATUS_AWAITING_DRAFT_CALL_TIMES = "Awaiting Draft Call Times";
    private static final String STATUS_AWAITING_FINAL_CALL_TIMES = "Awaiting Final Call Times";
    private static final String STATUS_BOOKED = "Booked";
    private static final String STATUS_CANCELLED = "Cancelled";
    private final LocalUserRepository localUserRepository;

    public ProductionDayService(QueryService queryService, ProductionDayRepository productionDayRepository, UserService userService, EmailUtil emailUtil, JwtUtil jwtUtil,
                                LocalUserRepository localUserRepository) {
        this.jwtUtil = jwtUtil;
        this.emailUtil = emailUtil;
        this.userService = userService;
        this.queryService = queryService;
        this.productionDayRepository = productionDayRepository;
        this.localUserRepository = localUserRepository;
    }

    public Optional<ProductionDay> getProductionDayByProductionAndDate(String production, LocalDate date) {
        return productionDayRepository.findByProductionAndDate(production, date);
    }

    public Optional<ProductionDay> getProductionDayById(String id) {
        return productionDayRepository.findById(id);
    }

    public List<List<ProductionDay>> getAllByClientId(String clientId) {
        return queryService.groupAndSortProductionDaysByClientId(productionDayRepository.findAll(), clientId);
    }

    @Transactional
    public ProductionDay createProductionDay(String clientId, ProductionDayBody productionDayBody) {
        ProductionDay productionDay = new ProductionDay();
        setProductionDay(productionDayBody, productionDay);

        ProductionDay existingProductionDay = getProductionDayByProductionAndDate(productionDay.getProduction(), productionDay.getDate()).orElse(null);
        if (!existingProductionDay.equals(null)) {
            throw new ProductionDayAlreadyExistsException("Production day already exists");
        }

        productionDay.setClientId(clientId);
        productionDay.setClientEmail(userService.getUser(clientId).getEmail());
        productionDay.setStatus(STATUS_AVAILABILITY_CHECK);

        productionDayRepository.save(productionDay);

        try {
            for (Participant participant : productionDay.getParticipants()) {
                LocalUser user = localUserRepository.findById(participant.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));

                emailUtil.sendAvailabilityEmail(
                        user.getEmail(),
                        jwtUtil.generateAvailabilityToken(
                                productionDay.getProduction(),
                                productionDay.getDate(),
                                user.getEmail(),
                                participant.getRole()),
                        productionDay.getProduction(),
                        productionDay.getDate());
            }
        } catch (EmailFailureException e) {
            throw new EmailFailureException("Failed to send availability email: " + e.getMessage());
        }

        return productionDay;
    }

    private void setProductionDay(ProductionDayBody productionDayBody, ProductionDay productionDay) {
        productionDay.setProduction(productionDayBody.getProduction());
        productionDay.setDate(productionDayBody.getDate());
        productionDay.setRoles(productionDayBody.getRoles());
        productionDay.setParticipants(productionDayBody.getParticipants());
        productionDay.setUnionStatus(productionDayBody.getUnionStatus());
        productionDay.setLocation(productionDayBody.getLocation());
        productionDay.setExterior(productionDayBody.getExterior());
        productionDay.setSelfDriveOnly(productionDayBody.isSelfDriveOnly());
        productionDay.setNewFacesOnly(productionDayBody.isNewFacesOnly());
        productionDay.setNotes(productionDayBody.getNotes());
    }
}
