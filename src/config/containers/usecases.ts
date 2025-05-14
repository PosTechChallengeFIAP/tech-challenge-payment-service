import { CreatePaymentUseCase } from "@application/usecases/payment/create-payment/CreatePaymentUseCase";
import { ICreatePaymentUseCase } from "@application/usecases/payment/create-payment/ICreatePaymentUseCase";
import { FindOneOrAllPaymentsUseCase } from "@application/usecases/payment/find-one-or-all-payments/FindOneOrAllPaymentsUseCase";
import { IFindOneOrAllPaymentsUseCase } from "@application/usecases/payment/find-one-or-all-payments/IFindOneOrAllPaymentsUseCase";
import { IUpdatePaymentUseCase } from "@application/usecases/payment/update-payment/IUpdatePaymentUseCase";
import { UpdatePaymentUseCase } from "@application/usecases/payment/update-payment/UpdatePaymentUseCase";
import { container } from "tsyringe";

container.registerSingleton<IUpdatePaymentUseCase>('UpdatePaymentUseCase', UpdatePaymentUseCase);
container.registerSingleton<IFindOneOrAllPaymentsUseCase>('FindOneOrAllPaymentsUseCase', FindOneOrAllPaymentsUseCase);
container.registerSingleton<ICreatePaymentUseCase>('CreatePaymentUseCase', CreatePaymentUseCase);
