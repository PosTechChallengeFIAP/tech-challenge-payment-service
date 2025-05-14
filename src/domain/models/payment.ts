import { IPayment } from "@application/DTOs/IPayment"
import { EPaymentStatus } from "./EPaymentStatus"

export class Payment implements IPayment {
    id: string
    value: number
    status: EPaymentStatus
    orderId: number

    constructor(id: string, value: number, status: EPaymentStatus, orderId: number) {
        this.id = id
        this.value = value
        this.status = status
        this.orderId = orderId
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