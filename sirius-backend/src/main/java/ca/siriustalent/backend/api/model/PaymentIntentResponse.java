package ca.siriustalent.backend.api.model;

import com.stripe.model.PaymentIntent;

public class PaymentIntentResponse {
    private String id;
    private String clientSecret;
    private String status;

    public PaymentIntentResponse(PaymentIntent paymentIntent) {
        this.id = paymentIntent.getId();
        this.clientSecret = paymentIntent.getClientSecret();
        this.status = paymentIntent.getStatus();
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getClientSecret() {
        return clientSecret;
    }
    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
