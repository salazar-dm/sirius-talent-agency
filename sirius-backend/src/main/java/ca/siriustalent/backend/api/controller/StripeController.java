package ca.siriustalent.backend.api.controller;

import ca.siriustalent.backend.api.model.LocalUserBody;
import ca.siriustalent.backend.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth/stripe")
@Validated
public class StripeController {

    private final UserService userService;
    private final String stripeWebhookSecret;

    public StripeController(UserService userService, @Value("${stripe.webhook.secret}") String stripeWebhookSecret) {
        this.userService = userService;
        this.stripeWebhookSecret = stripeWebhookSecret;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody LocalUserBody localUserBody) {
        try {
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("https://siriustalent.ca/register/paid?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl("https://siriustalent.ca/register/cancel")
                    .addLineItem(SessionCreateParams.LineItem.builder()
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("cad")
                                            .setUnitAmount(10000L)
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName("Registration Fee")
                                                            .build())
                                            .build())
                            .setQuantity(1L)
                            .build())
                    .putMetadata("password", localUserBody.getPassword())
                    .putMetadata("email", localUserBody.getEmail())
                    .putMetadata("tel", localUserBody.getTel())
                    .putMetadata("role", localUserBody.getRole())
                    .build();

            Session session = Session.create(params);
            return ResponseEntity.ok(Map.of("url", session.getUrl()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Stripe error"));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) throws JsonProcessingException, StripeException {
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        if ("checkout.session.completed".equals(event.getType())) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode jsonNode = mapper.readTree(payload);
                String sessionId = jsonNode.get("data").get("object").get("id").asText();

                Session session = Session.retrieve(sessionId);

                String email = session.getMetadata().get("email");
                String tel = session.getMetadata().get("tel");
                String role = session.getMetadata().get("role");
                String password = session.getMetadata().get("password");

                LocalUserBody userBody = new LocalUserBody();
                userBody.setEmail(email);
                userBody.setTel(tel);
                userBody.setRole(role);
                userBody.setPassword(password);

                userService.register(userBody);
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/session-status/{id}")
    public ResponseEntity<Map<String, String>> getSessionStatus(@PathVariable("id") String sessionId) {
        try {
            Session session = Session.retrieve(sessionId);
            return ResponseEntity.ok(Map.of(
                    "status", session.getStatus(),
                    "paymentStatus", session.getPaymentStatus()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("status", "error"));
        }
    }




}
