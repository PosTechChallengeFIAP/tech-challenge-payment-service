import { EPaymentStatus } from "@domain/models/EPaymentStatus"

export interface IPayment {
    id: string
    value: number
    status: EPaymentStatus
    orderId: number
}