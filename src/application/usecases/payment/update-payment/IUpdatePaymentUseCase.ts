import { IUseCase } from "@application/usecases/IUseCase";
import { TUpdatePaymentUseCaseRequest, TUpdatePaymentUseCaseResponse } from "./TUpdatePaymentUseCase";

export interface IUpdatePaymentUseCase extends IUseCase<TUpdatePaymentUseCaseRequest, TUpdatePaymentUseCaseResponse> {}