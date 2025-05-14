import { UpdatePaymentUseCase } from "./UpdatePaymentUseCase";
import { Payment } from "@domain/models/payment";
import { IPaymentRepository } from "@domain/repositories/IPaymentRepository";
import { EPaymentStatus } from "@domain/models/EPaymentStatus";

describe("UpdatePaymentUseCase", () => {
  let paymentRepository: jest.Mocked<IPaymentRepository>;
  let useCase: UpdatePaymentUseCase;

  beforeEach(() => {
    paymentRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    useCase = new UpdatePaymentUseCase(paymentRepository);
  });

  it("when payment exists should update and return updated payment", async () => {
    const existingPayment = {
      id: '1',
      value: 100,
      status: EPaymentStatus.PENDING,
      orderId: 999,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any;

    paymentRepository.findById.mockResolvedValue(existingPayment);
    paymentRepository.update.mockResolvedValue(undefined); // método não retorna nada

    const result = await useCase.execute({ id: '1', status: EPaymentStatus.PAID });

    expect(paymentRepository.findById).toHaveBeenCalledWith('1');
    expect(paymentRepository.update).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Payment);
    expect(result.status).toBe(EPaymentStatus.PAID);
  });

  it("when payment does not exist should throw error", async () => {
    paymentRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute({ id: '999', status: EPaymentStatus.PAID }))
      .rejects
      .toThrow("Payment not found");

    expect(paymentRepository.findById).toHaveBeenCalledWith('999');
    expect(paymentRepository.update).not.toHaveBeenCalled();
  });
});
