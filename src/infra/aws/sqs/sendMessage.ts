import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs"
import { envSQS } from "@config/variables/sqs"
import { Logger } from "@infra/utils/logger/Logger"

const sqsClient = new SQSClient({
    region: envSQS.region,
    credentials: {
        accessKeyId: envSQS.accessKeyId,
        secretAccessKey: envSQS.secretAccessKey,
        sessionToken: envSQS.awsSessionToken,
    }
})

export enum ESQSMessageType {
    ORDER_PAID = 'proccess.order.paid',
    UPDATE_ORDER = 'proccess.update.order',
}

export type TSQSMessage = {
    type: ESQSMessageType
    data: any
}

export class SQSHandler {
    public static sendMessage = async (request: TSQSMessage) => {
        try {
            await sqsClient.send(new SendMessageCommand({
                QueueUrl: envSQS.orderQueue,
                MessageBody: JSON.stringify(request),
            }))
        } catch (error) {
            Logger.error({
                message: 'Error sending message to SQS',
                additionalInfo: error,
            })
            throw new Error('Failed to send message to SQS')
        }
    }
} 