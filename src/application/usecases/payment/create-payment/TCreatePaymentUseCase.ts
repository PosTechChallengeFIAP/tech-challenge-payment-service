import { IPayment } from "@application/DTOs/IPayment"

export type TCreatePaymentUseCaseRequest = {
    value: number
    orderId: number
}

export type TCreatePaymentUseCaseResponse = IPayment