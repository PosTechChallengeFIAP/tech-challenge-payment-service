import { IPaymentRepository } from "@domain/repositories/IPaymentRepository";
import { Repository } from "typeorm";
import { PaymentEntity } from "../models/payment.entity";
import { typeOrmConnection } from "../typeorm-connection";
import { IPayment } from "@application/DTOs/IPayment";
import { EPaymentStatus } from "@domain/models/EPaymentStatus";
import { IPaymentToCreate } from "@application/DTOs/IPaymentToCreate";
import { injectable } from "tsyringe";

@injectable()
export class PaymentEntityRepository implements IPaymentRepository {
    private repository: Repository<PaymentEntity>;

    constructor() {
        this.repository = typeOrmConnection.getRepository(PaymentEntity);
    }

    async findAll(): Promise<IPayment[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<IPayment | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findByOrderId(orderId: number): Promise<IPayment[]> {
        return await this.repository.find({ where: { orderId } });
    }

    async create(payment: IPaymentToCreate): Promise<IPayment> {
        return await this.repository.save(payment);
    }

    async update(payment: IPayment): Promise<IPayment> {
        return await this.repository.save(payment);
    }
}