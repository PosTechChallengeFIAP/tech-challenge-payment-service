import { FindOneOrAllPaymentsController } from "./FindOneOrAllPaymentsController";
import { IFindOneOrAllPaymentsUseCase } from "@application/usecases/payment/find-one-or-all-payments/IFindOneOrAllPaymentsUseCase";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";

describe('FindOneOrAllPaymentsController', () => {
  let controller: FindOneOrAllPaymentsController;
  let findOneOrAllPaymentsUseCase: IFindOneOrAllPaymentsUseCase;

  beforeEach(() => {
    findOneOrAllPaymentsUseCase = {
      execute: jest.fn()
    };

    controller = new FindOneOrAllPaymentsController(findOneOrAllPaymentsUseCase);
  });

  it('when payment is found by id should return ok response', async () => {
    const payment = { id: "1", value: 100, orderId: 10, status: "PAID" };
    (findOneOrAllPaymentsUseCase.execute as jest.Mock).mockResolvedValue(payment);

    const request = { query: { id: "1" } };
    const response = await controller.handle(request);

    expect(findOneOrAllPaymentsUseCase.execute).toHaveBeenCalledWith({ id: "1", orderId: undefined });
    expect(response).toEqual(HttpResponseHandler.ok(payment));
  });

  it('when payments are found by orderId should return ok response', async () => {
    const payments = [{ id: "1", value: 100, orderId: 10, status: "PAID" }];
    (findOneOrAllPaymentsUseCase.execute as jest.Mock).mockResolvedValue(payments);

    const request = { query: { orderId: "10" } };
    const response = await controller.handle(request);

    expect(findOneOrAllPaymentsUseCase.execute).toHaveBeenCalledWith({ orderId: "10", id: undefined });
    expect(response).toEqual(HttpResponseHandler.ok(payments));
  });

  it('when no payment is found should return notFound response', async () => {
    (findOneOrAllPaymentsUseCase.execute as jest.Mock).mockResolvedValue(null);

    const request = { query: { id: "999" } };
    const response = await controller.handle(request);

    expect(findOneOrAllPaymentsUseCase.execute).toHaveBeenCalledWith({ id: "999", orderId: undefined });
    expect(response).toEqual(HttpResponseHandler.notFound("Order not found"));
  });
});
