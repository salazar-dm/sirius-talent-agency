package ca.siriustalent.backend.utils;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import ca.siriustalent.backend.exception.EmailFailureException;
import ca.siriustalent.backend.model.entities.LocalUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.IOException;
import java.time.LocalDate;

@Service
public class EmailUtil {

    @Value("${sendgrid.api.key}")
    private String sendgridApiKey;

    @Value("${sendgrid.sender.email}")
    private String fromAddress;

    @Value("${app.frontend.url}")
    private String url;

    @Value("${system.admin.email}")
    private String adminEmail;

    private final SpringTemplateEngine templateEngine;

    public EmailUtil(SpringTemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    private void sendEmail(String to, String subject, String htmlBody) throws EmailFailureException {
        Email from = new Email(fromAddress);
        Email toEmail = new Email(to);
        Content content = new Content("text/html", htmlBody);
        Mail mail = new Mail(from, subject, toEmail, content);

        SendGrid sg = new SendGrid(sendgridApiKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);

            if (response.getStatusCode() >= 400) {
                throw new EmailFailureException("SendGrid error: " + response.getBody());
            }
        } catch (IOException e) {
            throw new EmailFailureException("Could not send email to " + to);
        }
    }

    public void sendVerificationEmail(String email, String token) throws EmailFailureException {
        String verificationUrl = url + "/verify?token=" + token;

        Context context = new Context();
        context.setVariable("verificationUrl", verificationUrl);

        String htmlContent = templateEngine.process("verificationEmail", context);
        sendEmail(email, "Please verify your email", htmlContent);
    }

    public void sendActivationEmail(String email) throws EmailFailureException {
        Context context = new Context();
        String htmlContent = templateEngine.process("activationEmail", context);
        sendEmail(email, "Your account has been activated", htmlContent);
    }

    public void sendAvailabilityEmail(String email, String token, String production, LocalDate date) throws EmailFailureException {
        String body = "Please follow the link below to check your availability:<br><br>" +
                "<a href=\"" + url + "/public/availability?token=" + token + "\">Check Availability</a>";
        sendEmail(email, "Availability Check: " + production + " on " + date, body);
    }

    public void sendNotificationEmail(String email, String production, String date) throws EmailFailureException {
        String body = "Production <strong>" + production + "</strong> on <strong>" + date +
                "</strong> has been filled.<br><br>" +
                "Click to confirm the final list:<br>" +
                "<a href=\"" + url + "/casting/confirm/" + production + "/" + date + "\">Confirm Here</a>";
        sendEmail(email, production + " on " + date + " has been filled", body);
    }

    public void sendRegistrationNotificationToAdmin(LocalUser user) throws EmailFailureException {
        String body = "New casting registration submitted.<br><br>" +
                "<a href=\"https://www.siriustalent.ca/api/admin/pending-submissions\">View Pending Submissions</a>";
        sendEmail(adminEmail, "New Casting registration", body);
    }

    public void sendSubmissionApprovedEmail(LocalUser user) throws EmailFailureException {
        String body = "Your submission has been approved. Thank you!";
        sendEmail(user.getEmail(), "Your submission has been approved", body);
    }
}