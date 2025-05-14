import { CreatePaymentController } from "@infra/http/controllers/payment/create-payment/CreatePaymentController";
import { FindOneOrAllPaymentsController } from "@infra/http/controllers/payment/find-one-or-all-payments/FindOneOrAllPaymentsController";
import { UpdatePaymentController } from "@infra/http/controllers/payment/update-payment/UpdatePaymentController";
import { IController } from "@infra/http/protocols/controller";
import { container } from "tsyringe";

container.registerSingleton<IController>('CreatePaymentController', CreatePaymentController);
container.registerSingleton<IController>('FindOneOrAllPaymentsController', FindOneOrAllPaymentsController);
container.registerSingleton<IController>('UpdatePaymentController', UpdatePaymentController);