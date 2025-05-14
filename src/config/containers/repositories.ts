import { IPaymentRepository } from "@domain/repositories/IPaymentRepository";
import { PaymentEntityRepository } from "@infra/persistence/typeorm/repositories/payment.repository";
import { container } from "tsyringe";

container.registerSingleton<IPaymentRepository>("PaymentRepository", PaymentEntityRepository);