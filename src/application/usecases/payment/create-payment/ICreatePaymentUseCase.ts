import { IUseCase } from "@application/usecases/IUseCase";
import { TCreatePaymentUseCaseRequest, TCreatePaymentUseCaseResponse } from "./TCreatePaymentUseCase";

export interface ICreatePaymentUseCase extends IUseCase<TCreatePaymentUseCaseRequest, TCreatePaymentUseCaseResponse> {}