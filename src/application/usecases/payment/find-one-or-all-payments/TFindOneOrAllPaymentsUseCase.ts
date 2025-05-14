import { IPayment } from "@application/DTOs/IPayment"

export type TFindOneOrAllPaymentsUseCaseRequest = {
    id?: string
    orderId?: number
}

export type TFindOneOrAllPaymentsUseCaseResponse = IPayment[] | IPayment | null