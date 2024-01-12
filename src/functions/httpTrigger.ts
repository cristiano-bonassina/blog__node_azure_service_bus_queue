import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ServiceBusClient, ServiceBusMessage } from "@azure/service-bus";

export async function httpTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const serviceBusConnectionString = process.env["ServiceBusConnectionString"];
    const serviceBusClient = new ServiceBusClient(serviceBusConnectionString);
    const sender = serviceBusClient.createSender("myQueue");
    const message: ServiceBusMessage = {
        body: "hi!"
    };
    await sender.sendMessages(message)

    return { body: `Service bus message sent!` };
};

app.http('httpTrigger', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: httpTrigger
});
