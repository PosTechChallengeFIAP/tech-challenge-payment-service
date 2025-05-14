import { EPaymentStatus } from "@domain/models/EPaymentStatus"

export interface IPaymentToCreate {
    value: number
    status: EPaymentStatus
    orderId: number
}