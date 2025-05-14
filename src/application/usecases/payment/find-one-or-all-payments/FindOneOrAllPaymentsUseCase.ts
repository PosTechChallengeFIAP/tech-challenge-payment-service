import { IPaymentRepository } from "@domain/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";
import { IFindOneOrAllPaymentsUseCase } from "./IFindOneOrAllPaymentsUseCase";
import { TFindOneOrAllPaymentsUseCaseRequest, TFindOneOrAllPaymentsUseCaseResponse } from "./TFindOneOrAllPaymentsUseCase";

@injectable()
export class FindOneOrAllPaymentsUseCase implements IFindOneOrAllPaymentsUseCase {
    constructor(
        @inject("PaymentRepository")
        private readonly paymentRepository: IPaymentRepository
    ) {}

    async execute(request: TFindOneOrAllPaymentsUseCaseRequest): Promise<TFindOneOrAllPaymentsUseCaseResponse> {
        const { id, orderId } = request;

        if (id) {
            const paymentFound = await this.paymentRepository.findById(id);
            if (!paymentFound) {
                throw new Error("Payment not found");
            }
            return paymentFound;
        } else if (orderId) {
            const paymentsFound = await this.paymentRepository.findByOrderId(orderId);
            if (!paymentsFound || paymentsFound.length === 0) {
                throw new Error("Payments not found");
            }
            return paymentsFound;
        }

        const payments = await this.paymentRepository.findAll();
        return payments;
    }
}1