import { ICreatePaymentUseCase } from "@application/usecases/payment/create-payment/ICreatePaymentUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreatePaymentController implements IController {
    constructor(
        @inject("CreatePaymentUseCase")
        private readonly createPaymentUseCase: ICreatePaymentUseCase,
    ) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { value, orderId } = request.body;
    
        const result = await this.createPaymentUseCase.execute({
            orderId,
            value,
        });

        return HttpResponseHandler.created(result);
    }
}