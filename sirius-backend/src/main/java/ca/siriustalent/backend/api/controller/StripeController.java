package ca.siriustalent.backend.api.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.validation.Valid;
import ca.siriustalent.backend.api.model.RecordPaymentBody;
import ca.siriustalent.backend.api.model.PaymentBody;
import ca.siriustalent.backend.api.model.PaymentIntentResponse;
import ca.siriustalent.backend.service.StripeService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/performer/stripe")
@Validated
public class StripeController {

    private final StripeService stripeService;

    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentIntentResponse> createPaymentIntent(@RequestBody @Valid PaymentBody paymentBody, @RequestHeader("Authorization") String token) throws StripeException {
        String userToken = token.startsWith("Bearer ") ? token.substring(7) : token;

        PaymentIntent paymentIntent = stripeService.createPaymentIntent(userToken, paymentBody);
        PaymentIntentResponse response = new PaymentIntentResponse(paymentIntent);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/confirm-payment")
    public ResponseEntity recordPayment(@RequestBody @Valid RecordPaymentBody recordPaymentBody, @RequestHeader("Authorization") String jwtToken) throws StripeException {
        String token = jwtToken.startsWith("Bearer ") ? jwtToken.substring(7) : jwtToken;
        //stripeService.recordPayment(token, recordPaymentBody.getDates());

        return ResponseEntity.ok().build();
    }
}
