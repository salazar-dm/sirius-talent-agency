package ca.siriustalent.backend.service;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.tax.Registration;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PaymentIntentConfirmParams;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.validation.Valid;
import ca.siriustalent.backend.api.model.PaymentBody;
import ca.siriustalent.backend.exception.ResourceNotFoundException;
import ca.siriustalent.backend.model.dao.LocalUserRepository;
import ca.siriustalent.backend.model.dao.ProductionDayRepository;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.model.entities.Participant;
import ca.siriustalent.backend.model.entities.ProductionDay;
import ca.siriustalent.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StripeService {

    private static final BigDecimal TAX_RATE = new BigDecimal("13");
    private static final String CURRENCY = "cad";
    private static final BigDecimal CENTS_CONVERSION = new BigDecimal(100);
    private static final String PAYMENT_DESCRIPTION_TEMPLATE = "Payment for cheque: %s on %s";
    private static final String PRODUCTION_METADATA = "production";
    private static final String DATE_METADATA = "date";
    private static final String CLIENT_ID_METADATA = "clientId";
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-mm-dd");

    private JwtUtil jwtUtil;
    private UserService userService;
    private LocalUserRepository userRepository;
    private ProductionDayRepository productionDayRepository;

    public StripeService(JwtUtil jwtUtil, UserService userService, LocalUserRepository userRepository, ProductionDayRepository productionDayRepository) {
        this.productionDayRepository = productionDayRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Transactional
    public PaymentIntent createPaymentIntent(String token, PaymentBody paymentBody) throws StripeException {
        String clientId = jwtUtil.extractSubject(token);

        Customer customer;
        LocalUser user = userService.getUser(clientId);
        if (user.getStripeCustomerId() == null) {
            customer = createCustomer(user.getEmail(), user.getProfile().getFirstName() + " " + user.getProfile().getLastName());

            user.setStripeCustomerId(customer.getId());
            userRepository.save(user);
        } else {
            System.out.println("Customer already exists: " + user.getStripeCustomerId());
            customer = Customer.retrieve(user.getStripeCustomerId());
        }

        BigDecimal amount = paymentBody.getAmount().multiply(paymentBody.getRate().divide(new BigDecimal("100")));
        BigDecimal tax = amount.multiply(TAX_RATE.divide(new BigDecimal("100")));
        amount = amount.add(tax).setScale(2, RoundingMode.FLOOR);;
        String production = paymentBody.getProduction();
        LocalDate date = paymentBody.getDate();

        return constructPaymentIntent(amount, production, date, clientId, customer);
    }

    private Customer createCustomer(String email, String name) throws StripeException {
        CustomerCreateParams params = CustomerCreateParams.builder()
                .setEmail(email)
                .setName(name)
                .build();

        return Customer.create(params);
    }

    private PaymentIntent constructPaymentIntent(BigDecimal amount, String production, LocalDate date, String clientId, Customer customer) throws StripeException {
        PaymentIntentCreateParams.Builder paramsBuilder = PaymentIntentCreateParams.builder()
                .setAmount(amount.multiply(CENTS_CONVERSION).longValue())
                .setCurrency(CURRENCY)
                .putMetadata(PRODUCTION_METADATA, production)
                .putMetadata(DATE_METADATA, date.toString())
                .putMetadata(CLIENT_ID_METADATA, clientId)
                .setDescription(String.format(PAYMENT_DESCRIPTION_TEMPLATE, production, date))
                .setCustomer(customer.getId());

        paramsBuilder.setAutomaticPaymentMethods(
                PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                        .setEnabled(true)
                        .setAllowRedirects(PaymentIntentCreateParams.AutomaticPaymentMethods.AllowRedirects.ALWAYS)
                        .build());

        return PaymentIntent.create(paramsBuilder.build());
    }

    // TODO: 1. Mail invoice if Front button pressed
    // TODO: 2. Record Payments
}
