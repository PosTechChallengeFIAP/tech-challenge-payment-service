import { IPaymentRepository } from "@domain/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";
import { ICreatePaymentUseCase } from "./ICreatePaymentUseCase";
import { TCreatePaymentUseCaseRequest, TCreatePaymentUseCaseResponse } from "./TCreatePaymentUseCase";
import { EPaymentStatus } from "@domain/models/EPaymentStatus";
import { IPaymentToCreate } from "@application/DTOs/IPaymentToCreate";

@injectable()
export class CreatePaymentUseCase implements ICreatePaymentUseCase {
    constructor(
        @inject("PaymentRepository")
        private readonly paymentRepository: IPaymentRepository
    ) {}

    async execute(request: TCreatePaymentUseCaseRequest): Promise<TCreatePaymentUseCaseResponse> {
        const { value, orderId } = request;

        const paymentToCreate: IPaymentToCreate = {
            orderId,
            value,
            status: EPaymentStatus.PENDING,
        }

        const paymentCreated = await this.paymentRepository.create(paymentToCreate);

        return paymentCreated;
    }
}