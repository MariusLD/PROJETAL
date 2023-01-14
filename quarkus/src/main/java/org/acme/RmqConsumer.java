package org.acme;

import java.nio.charset.StandardCharsets;
import javax.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.reactive.messaging.Incoming;

import io.quarkus.logging.Log;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.reactive.ReactiveMailer;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.JsonObject;
import javax.inject.Inject;

@ApplicationScoped
public class RmqConsumer {

    @Inject
    ReactiveMailer mailer;

    @Incoming("mail")
    public void consume(byte[] msg) {
        JsonObject obj = new JsonObject(new String(msg, StandardCharsets.UTF_8));
        JsonObject data = new JsonObject(obj.getString("data"));
        Log.info(data);

        Uni<Void> stage = sendMail(
            data.getString("from"),
            data.getString("to"),
            data.getString("subject"),
            data.getString("body")
        );

        stage.subscribe().with(
            x -> Log.info("Mail sent"),
            x -> Log.error("Mail not sent", x)
        );
    }

    private Uni<Void> sendMail(String from, String to, String subject, String body) {
        return mailer.send(
            Mail.withText(
                to,
                subject,
                body
            ).setFrom(from)
        );
    }
}
