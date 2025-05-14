import { IPayment } from "@application/DTOs/IPayment";
import { EPaymentStatus } from "@domain/models/EPaymentStatus";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "payments" })
export class PaymentEntity implements IPayment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "decimal" })
    value: number;

    @Column({ type: "enum", enum: EPaymentStatus })
    status: EPaymentStatus;

    @Column({ type: "int", name: "order_id" })
    orderId: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}