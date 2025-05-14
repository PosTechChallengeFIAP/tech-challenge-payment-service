
import { EPaymentStatus } from "./EPaymentStatus";
import { Payment } from "./payment";

describe("Payment", () => {
  const baseProps = {
    id: "pmt-1",
    value: 200,
    status: EPaymentStatus.PENDING,
    orderId: 123
  };

  it("should create a payment with correct properties", () => {
    const payment = new Payment(baseProps.id, baseProps.value, baseProps.status, baseProps.orderId);

    expect(payment.id).toBe("pmt-1");
    expect(payment.value).toBe(200);
    expect(payment.status).toBe(EPaymentStatus.PENDING);
    expect(payment.orderId).toBe(123);
    expect(payment.createdAt).toBeInstanceOf(Date);
    expect(payment.updatedAt).toBeInstanceOf(Date);
  });

  it("when current status is PENDING should allow transition to PAID", () => {
    const payment = new Payment("id", 100, EPaymentStatus.PENDING, 1);

    payment.setStatus(EPaymentStatus.PAID);

    expect(payment.status).toBe(EPaymentStatus.PAID);
  });

  it("when current status is PENDING should allow transition to REJECTED", () => {
    const payment = new Payment("id", 100, EPaymentStatus.PENDING, 1);

    payment.setStatus(EPaymentStatus.REJECTED);

    expect(payment.status).toBe(EPaymentStatus.REJECTED);
  });

  it("when current status is PENDING should allow transition to CANCELLED", () => {
    const payment = new Payment("id", 100, EPaymentStatus.PENDING, 1);

    payment.setStatus(EPaymentStatus.CANCELLED);

    expect(payment.status).toBe(EPaymentStatus.CANCELLED);
  });

  it("when current status is PAID should allow transition to CANCELLED", () => {
    const payment = new Payment("id", 100, EPaymentStatus.PAID, 1);

    payment.setStatus(EPaymentStatus.CANCELLED);

    expect(payment.status).toBe(EPaymentStatus.CANCELLED);
  });

  it("when current status is PAID should not allow transition to REJECTED", () => {
    const payment = new Payment("id", 100, EPaymentStatus.PAID, 1);

    expect(() => payment.setStatus(EPaymentStatus.REJECTED))
      .toThrow("Cannot change status from PAID to REJECTED");
  });

  it("when current status is CANCELLED should not allow any further status changes", () => {
    const payment = new Payment("id", 100, EPaymentStatus.CANCELLED, 1);

    expect(() => payment.setStatus(EPaymentStatus.PAID))
      .toThrow("Cannot change status from CANCELLED to PAID");

    expect(() => payment.setStatus(EPaymentStatus.REJECTED))
      .toThrow("Cannot change status from CANCELLED to REJECTED");
  });
});
