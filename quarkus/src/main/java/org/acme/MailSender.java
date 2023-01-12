package org.acme;

import javax.enterprise.context.ApplicationScoped;

import com.oracle.svm.core.annotate.Inject;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.reactive.ReactiveMailer;
import io.smallrye.mutiny.Uni;

@ApplicationScoped
public class MailSender {

    @Inject
    static ReactiveMailer mailer;
    public static Uni<Void> send(String from, String to, String subject, String body) {

        return mailer.send(
            Mail.withText(
                to,
                subject,
                body
            ).setFrom(from)
        );
    }

    
    
}
