import { CreatePaymentUseCase } from "./CreatePaymentUseCase";
import { IPaymentRepository } from "@domain/repositories/IPaymentRepository";
import { EPaymentStatus } from "@domain/models/EPaymentStatus";

describe("CreatePaymentUseCase", () => {
  let paymentRepository: jest.Mocked<IPaymentRepository>;
  let useCase: CreatePaymentUseCase;

  beforeEach(() => {
    paymentRepository = {
      create: jest.fn(),
    } as any;

    useCase = new CreatePaymentUseCase(paymentRepository);
  });

  it("when valid request is provided should create payment with PENDING status", async () => {
    const request = {
      value: 100.0,
      orderId: 42,
    };

    const expectedResponse = {
      id: 1,
      orderId: 42,
      value: 100.0,
      status: EPaymentStatus.PENDING,
      createdAt: new Date(),
    } as any;

    paymentRepository.create.mockResolvedValue(expectedResponse);

    const result = await useCase.execute(request);

    expect(paymentRepository.create).toHaveBeenCalledWith({
      value: 100.0,
      orderId: 42,
      status: EPaymentStatus.PENDING,
    });

    expect(result).toEqual(expectedResponse);
  });
});
