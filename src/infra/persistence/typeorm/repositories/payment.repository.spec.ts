import { EPaymentStatus } from "@domain/models/EPaymentStatus";
import { typeOrmConnection } from "../typeorm-connection";
import { PaymentEntityRepository } from "./payment.repository";

jest.mock("@infra/persistence/typeorm/typeorm-connection", () => ({
  typeOrmConnection: {
    getRepository: jest.fn()
  }
}));

describe("PaymentEntityRepository", () => {
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findBy: jest.fn(),
    save: jest.fn()
  };

  beforeEach(() => {
    (typeOrmConnection.getRepository as jest.Mock).mockReturnValue(mockRepository);
    jest.clearAllMocks();
  });

  const makeSut = () => new PaymentEntityRepository();

  it("when findAll is called should return all payments", async () => {
    const payments = [
      { id: "1", value: 100, status: EPaymentStatus.PENDING, orderId: 10, createdAt: new Date(), updatedAt: new Date() }
    ];
    mockRepository.find.mockResolvedValue(payments);

    const sut = makeSut();
    const result = await sut.findAll();

    expect(result).toEqual(payments);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it("when findById is called should return a payment if found", async () => {
    const payment = { id: "1", value: 100, status: EPaymentStatus.PAID, orderId: 20, createdAt: new Date(), updatedAt: new Date() };
    mockRepository.findOne.mockResolvedValue(payment);

    const sut = makeSut();
    const result = await sut.findById("1");

    expect(result).toEqual(payment);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
  });

  it("when findById is called and not found should return null", async () => {
    mockRepository.findOne.mockResolvedValue(null);

    const sut = makeSut();
    const result = await sut.findById("nonexistent");

    expect(result).toBeNull();
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: "nonexistent" } });
  });

  it("when findByOrderId is called should return payments for order", async () => {
    const payments = [
      { id: "2", value: 200, status: EPaymentStatus.PAID, orderId: 30, createdAt: new Date(), updatedAt: new Date() }
    ];
    mockRepository.find.mockResolvedValue(payments);

    const sut = makeSut();
    const result = await sut.findByOrderId(30);

    expect(result).toEqual(payments);
    expect(mockRepository.find).toHaveBeenCalledWith({ where: { orderId: 30 } });
  });

  it("when create is called should save and return the payment", async () => {
    const paymentToCreate = { value: 300, status: EPaymentStatus.PENDING, orderId: 40 };
    const savedPayment = { id: "3", ...paymentToCreate, createdAt: new Date(), updatedAt: new Date() };
    mockRepository.save.mockResolvedValue(savedPayment);

    const sut = makeSut();
    const result = await sut.create(paymentToCreate);

    expect(result).toEqual(savedPayment);
    expect(mockRepository.save).toHaveBeenCalledWith(paymentToCreate);
  });

  it("when update is called should save and return the updated payment", async () => {
    const updated = { id: "3", value: 500, status: EPaymentStatus.CANCELLED, orderId: 40, createdAt: new Date(), updatedAt: new Date() };
    mockRepository.save.mockResolvedValue(updated);

    const sut = makeSut();
    const result = await sut.update(updated);

    expect(result).toEqual(updated);
    expect(mockRepository.save).toHaveBeenCalledWith(updated);
  });
});
