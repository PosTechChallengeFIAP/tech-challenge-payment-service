import { IPaymentRepository } from "@domain/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";
import { IUpdatePaymentUseCase } from "./IUpdatePaymentUseCase";
import { TUpdatePaymentUseCaseRequest, TUpdatePaymentUseCaseResponse } from "./TUpdatePaymentUseCase";
import { Payment } from "@domain/models/payment";

@injectable()
export class UpdatePaymentUseCase implements IUpdatePaymentUseCase {
    constructor(
        @inject("PaymentRepository")
        private readonly paymentRepository: IPaymentRepository
    ) {}

    async execute(request: TUpdatePaymentUseCaseRequest): Promise<TUpdatePaymentUseCaseResponse> {
        const { id, status } = request;

        const paymentFound = await this.paymentRepository.findById(id);
        if (!paymentFound) {
            throw new Error("Payment not found");
        }

        const payment: Payment = new Payment(
            paymentFound.id,
            paymentFound.value,
            paymentFound.status,
            paymentFound.orderId,
            paymentFound.createdAt,
            paymentFound.updatedAt
        );
        payment.setStatus(status);

        await this.paymentRepository.update(payment);

        return payment;
    }
}