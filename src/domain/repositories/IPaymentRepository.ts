import { IPayment } from "@application/DTOs/IPayment"
import { IPaymentToCreate } from "@application/DTOs/IPaymentToCreate"
import { EPaymentStatus } from "@domain/models/EPaymentStatus"

export interface IPaymentRepository {
    findAll(): Promise<IPayment[]>
    findById(id: string): Promise<IPayment | null>
    findByOrderId(orderId: number): Promise<IPayment[]>
    create(payment: IPaymentToCreate): Promise<IPayment>
    update(paymentId: string, status: EPaymentStatus): Promise<IPayment>
}