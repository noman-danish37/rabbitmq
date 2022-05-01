const amqp=require('amqplib/callback_api');
// connect to rabbitmq
// amqp-async message queuing protocol
amqp.connect(`amqp://localhost`,(err,connection) => {
    if(err)
    {
        throw err;
    }
    connection.createChannel((err,channel) => {
        if(err)
        {
            throw err;
        }
        
        let queueName = "rabbitmq";
        let message = "This is rabbitmq-example";
        // assertQueue will create the queue if there is no queue in the server
        // durable is an optional object even if there is no subscribe there will be queue
        // if we make durable true then if there is no subscriber then queue will be deleted
        channel.assertQueue(queueName,{
            durable: false
        });
        // sending msg into the queue
        // we have set timeout to 1sec as if there is no msg in the queue then there is no need of the connection
        channel.sendToQueue(queueName,Buffer.from(message));
        console.log(`Message: ${message}`);
        setTimeout(() => {
            connection.close();
        },1000)
    })
})