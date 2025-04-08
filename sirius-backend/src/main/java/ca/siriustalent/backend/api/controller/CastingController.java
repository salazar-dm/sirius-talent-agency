package ca.siriustalent.backend.api.controller;

import jakarta.validation.Valid;
import ca.siriustalent.backend.api.model.ProductionDayBody;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.model.entities.ProductionDay;
import ca.siriustalent.backend.service.ProductionDayService;
import ca.siriustalent.backend.service.UserService;
import ca.siriustalent.backend.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/casting")
public class CastingController {
    private final ProductionDayService productionDayService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public CastingController(ProductionDayService productionDayService, JwtUtil jwtUtil, UserService userService) {
        this.userService = userService;
        this.productionDayService = productionDayService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/production-days/all")
    public ResponseEntity<List<List<ProductionDay>>> getAllProductionDays(@RequestHeader("Authorization") String token) {
        String id = jwtUtil.extractSubject(token.substring(7));
        List<List<ProductionDay>> groupedProductionDays = productionDayService.getAllByClientId(id);
        return new ResponseEntity<>(groupedProductionDays, HttpStatus.OK);
    }

    @GetMapping("/production-days/{id}")
    public ResponseEntity<ProductionDay> getProductionDayById(@PathVariable String id) {
        Optional<ProductionDay> productionDay = productionDayService.getProductionDayById(id);
        if (productionDay.isPresent()) {
            return new ResponseEntity<>(productionDay.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/performers/all")
    public ResponseEntity<List<LocalUser>> getAllPerformers() {
        List<LocalUser> performers = userService.getAllUsersByRoleAndUserActivated("Performer", true);
        return new ResponseEntity<>(performers, HttpStatus.OK);
    }

    @GetMapping("/performers/all-by-ids")
    public ResponseEntity<List<LocalUser>> getAllPerformersByIds(@RequestParam List<String> ids) {
        List<LocalUser> performers = userService.getAllUsersByListIds(ids);
        return new ResponseEntity<>(performers, HttpStatus.OK);
    }
}
