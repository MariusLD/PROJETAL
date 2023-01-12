package org.acme;

import java.nio.charset.StandardCharsets;

import javax.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.reactive.messaging.Incoming;

import io.quarkus.logging.Log;
import io.vertx.core.json.JsonObject;

@ApplicationScoped
public class RmqConsumer {

    @Incoming("mail")
    public void consume(byte[] msg) {
        JsonObject obj = new JsonObject(new String(msg, StandardCharsets.UTF_8));
        JsonObject data = new JsonObject(obj.getString("data"));
        
        MailSender.send(
            data.getString("from"),
            data.getString("to"),
            data.getString("subject"),
            data.getString("body")
        );
        
    }
    
}
