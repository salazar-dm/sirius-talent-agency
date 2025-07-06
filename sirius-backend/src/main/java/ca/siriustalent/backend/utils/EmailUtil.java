package ca.siriustalent.backend.utils;

import ca.siriustalent.backend.exception.EmailFailureException;
import ca.siriustalent.backend.model.entities.LocalUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;

@Service
public class EmailUtil {

    @Value("${spring.mail.username}")
    private String fromAddress;

    @Value("${app.frontend.url}")
    private String url;

    @Value("${system.admin.email}")
    private String adminEmail;

    private final SpringTemplateEngine templateEngine;
    private final JavaMailSender mailSender;

    public EmailUtil(SpringTemplateEngine templateEngine, JavaMailSender mailSender) {
        this.templateEngine = templateEngine;
        this.mailSender = mailSender;
    }

    private void sendEmail(String to, String subject, String htmlBody) throws EmailFailureException {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromAddress, "Sirius Talent Agency");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            mailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
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

    public void sendCustomEmail(String emailTo, String subject, String body) throws EmailFailureException {
        String html = "<div style=\"font-family:Arial,sans-serif; font-size:16px; line-height:1.5;\">" +
                "<p>" + body.replace("\n", "<br>") + "</p>" +
                "<br><hr><p style=\"font-size:12px; color:#888;\">Sent via Sirius Admin Panel</p>" +
                "</div>";
        sendEmail(emailTo, subject, html);
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

    public void sendAvailabilityCheckEmail(String email, String subject, String text, String buttonLink) throws EmailFailureException {
        Context context = new Context();
        context.setVariable("text", text);
        context.setVariable("buttonLink", buttonLink);
        context.setVariable("buttonText", "Check Availability");

        String html = templateEngine.process("availabilityCheckEmail", context);
        sendEmail(email, subject, html);
    }
}
