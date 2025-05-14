import { FindOneOrAllPaymentsUseCase } from "./FindOneOrAllPaymentsUseCase";
import { IPaymentRepository } from "@domain/repositories/IPaymentRepository";

describe("FindOneOrAllPaymentsUseCase", () => {
  let paymentRepository: jest.Mocked<IPaymentRepository>;
  let useCase: FindOneOrAllPaymentsUseCase;

  beforeEach(() => {
    paymentRepository = {
      findById: jest.fn(),
      findByOrderId: jest.fn(),
      findAll: jest.fn(),
    } as any;

    useCase = new FindOneOrAllPaymentsUseCase(paymentRepository);
  });

  it("when id is provided and payment exists should return the payment", async () => {
    const mockPayment = { id: '1', value: 100 } as any;
    paymentRepository.findById.mockResolvedValue(mockPayment);

    const result = await useCase.execute({ id: '1' });

    expect(paymentRepository.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockPayment);
  });

  it("when id is provided and payment does not exist should throw error", async () => {
    paymentRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute({ id: '999' })).rejects.toThrow("Payment not found");
  });

  it("when orderId is provided and payments exist should return the payments", async () => {
    const mockPayments: any[] = [{ id: '1' }, { id: '2' }];
    paymentRepository.findByOrderId.mockResolvedValue(mockPayments);

    const result = await useCase.execute({ orderId: 42 });

    expect(paymentRepository.findByOrderId).toHaveBeenCalledWith(42);
    expect(result).toEqual(mockPayments);
  });

  it("when orderId is provided and no payments found should throw error", async () => {
    paymentRepository.findByOrderId.mockResolvedValue([]);

    await expect(useCase.execute({ orderId: 999 })).rejects.toThrow("Payments not found");
  });

  it("when neither id nor orderId is provided should return all payments", async () => {
    const allPayments: any[] = [{ id: '1' }, { id: '2' }];
    paymentRepository.findAll.mockResolvedValue(allPayments);

    const result = await useCase.execute({});

    expect(paymentRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(allPayments);
  });
});
