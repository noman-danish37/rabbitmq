const amqp=require('amqplib/callback_api');
// connect to rabbitmq
// amqp-async message queuing protocol
amqp.connect(`amqp://localhost`,(err, connection) => {
    if (err)
    {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err)
        {
            throw err;
        }
        let queueName = "rabbitmq";
        // assertQueue will create the queue if there is no queue in the server
        // durable is an optional object even if there is no subscribe there will be queue
        // if we make durable true then if there is no subscriber then queue will be deleted
        channel.assertQueue(queueName,{
            durable: false
        });
        //incallback we will get the msg
        channel.consume(queueName, (msg) =>{
            console.log(`Recieved : ${msg.content.toString()}`);
            
        },{
            noAck: true
        });// implicit way to send acknowledgment to queue(rabbitmq management) that now u can delete the msg

        // if not send ant acknowledgment message will remain in the queue
        
        // to send explicit
        // channel.ack(msg);
    
    })
})