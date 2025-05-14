import { IPayment } from "@application/DTOs/IPayment"
import { EPaymentStatus } from "@domain/models/EPaymentStatus"

export type TUpdatePaymentUseCaseRequest = {
    id: string
    status: EPaymentStatus
}

export type TUpdatePaymentUseCaseResponse = IPayment