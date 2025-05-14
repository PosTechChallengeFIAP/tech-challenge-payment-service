import { UpdatePaymentController } from "./UpdatePaymentController";
import { IUpdatePaymentUseCase } from "@application/usecases/payment/update-payment/IUpdatePaymentUseCase";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";

describe("UpdatePaymentController", () => {
  let controller: UpdatePaymentController;
  let updatePaymentUseCase: IUpdatePaymentUseCase;

  beforeEach(() => {
    updatePaymentUseCase = {
      execute: jest.fn(),
    };

    controller = new UpdatePaymentController(updatePaymentUseCase);
  });

  it("when update is successful should return ok response with result", async () => {
    const payment = { id: "1", value: 100, status: "PAID", orderId: 10 };
    (updatePaymentUseCase.execute as jest.Mock).mockResolvedValue(payment);

    const request = {
      params: { id: "1" },
      body: { status: "PAID" },
    };

    const response = await controller.handle(request);

    expect(updatePaymentUseCase.execute).toHaveBeenCalledWith({
      id: "1",
      status: "PAID",
    });
    expect(response).toEqual(HttpResponseHandler.ok(payment));
  });
});
