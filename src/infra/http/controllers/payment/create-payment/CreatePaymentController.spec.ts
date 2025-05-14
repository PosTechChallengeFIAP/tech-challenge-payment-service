import { ICreatePaymentUseCase } from "@application/usecases/payment/create-payment/ICreatePaymentUseCase";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { CreatePaymentController } from "./CreatePaymentController";

describe("CreatePaymentController", () => {
  const mockCreatePaymentUseCase: ICreatePaymentUseCase = {
    execute: jest.fn()
  };

  const makeSut = () => new CreatePaymentController(mockCreatePaymentUseCase);

  const mockRequest = {
    body: {
      value: 150.5,
      orderId: 42
    }
  };

  const mockResponse = {
    id: "payment-uuid",
    value: 150.5,
    orderId: 42,
    status: "PENDING",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("when handle is called should call createPaymentUseCase with correct data and return created response", async () => {
    (mockCreatePaymentUseCase.execute as jest.Mock).mockResolvedValue(mockResponse);

    const sut = makeSut();
    const response = await sut.handle(mockRequest);

    expect(mockCreatePaymentUseCase.execute).toHaveBeenCalledWith({
      orderId: 42,
      value: 150.5
    });
    expect(response).toEqual(HttpResponseHandler.created(mockResponse));
  });
});
