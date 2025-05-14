import { IPayment } from "@application/DTOs/IPayment"
import { EPaymentStatus } from "./EPaymentStatus"

export class Payment implements IPayment {
    id: string
    value: number
    status: EPaymentStatus
    orderId: number
    createdAt: Date
    updatedAt: Date

    constructor(id: string, value: number, status: EPaymentStatus, orderId: number, createdAt: Date = new Date(), updatedAt: Date = new Date()) {
        this.id = id
        this.value = value
        this.status = status
        this.orderId = orderId
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    public setStatus(status: EPaymentStatus): void {
        const availableStatusChange: { [K in EPaymentStatus]: EPaymentStatus[] } = {
            [EPaymentStatus.PENDING]: [EPaymentStatus.PAID, EPaymentStatus.REJECTED, EPaymentStatus.CANCELLED],
            [EPaymentStatus.PAID]: [EPaymentStatus.CANCELLED],
            [EPaymentStatus.REJECTED]: [],
            [EPaymentStatus.CANCELLED]: []
        }

        if (availableStatusChange[this.status].includes(status)) {
            this.status = status
        } else {
            throw new Error(`Cannot change status from ${this.status} to ${status}`)
        }
    }
}