package org.acme;

import java.nio.charset.StandardCharsets;

import javax.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.reactive.messaging.Incoming;

import io.quarkus.logging.Log;
import io.vertx.core.json.JsonObject;

@ApplicationScoped
public class RmqConsumer {

    public static String msg = "Hello from RMQ";

    @Incoming("fdp")
    public void consume(byte[] msg) {
        JsonObject obj = new JsonObject(new String(msg, StandardCharsets.UTF_8));
        String datas = obj.getString("data");
        JsonObject data = new JsonObject(datas);
        Log.info("Received: " + data.toString());
        RmqConsumer.msg = data.toString();
    }
    
}
