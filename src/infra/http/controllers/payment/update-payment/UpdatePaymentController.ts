import { ICreatePaymentUseCase } from "@application/usecases/payment/create-payment/ICreatePaymentUseCase";
import { IFindOneOrAllPaymentsUseCase } from "@application/usecases/payment/find-one-or-all-payments/IFindOneOrAllPaymentsUseCase";
import { IUpdatePaymentUseCase } from "@application/usecases/payment/update-payment/IUpdatePaymentUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdatePaymentController implements IController {
    constructor(
        @inject("UpdatePaymentUseCase")
        private readonly updatePaymentUseCase: IUpdatePaymentUseCase,
    ) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { id } = request.params;
        const { status } = request.body;
    
        const result = await this.updatePaymentUseCase.execute({
            id,
            status
        });

        return HttpResponseHandler.ok(result);
    }
}