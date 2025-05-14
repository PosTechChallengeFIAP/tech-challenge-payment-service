import { ICreatePaymentUseCase } from "@application/usecases/payment/create-payment/ICreatePaymentUseCase";
import { IFindOneOrAllPaymentsUseCase } from "@application/usecases/payment/find-one-or-all-payments/IFindOneOrAllPaymentsUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindOneOrAllPaymentsController implements IController {
    constructor(
        @inject("FindOneOrAllPaymentsUseCase")
        private readonly findOneOrAllPaymentsUseCase: IFindOneOrAllPaymentsUseCase,
    ) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { orderId, id } = request.query;
    
        const result = await this.findOneOrAllPaymentsUseCase.execute({
            orderId,
            id,
        });

        return !result ? HttpResponseHandler.notFound('Order not found') : HttpResponseHandler.ok(result);
    }
}