import { IUseCase } from "@application/usecases/IUseCase";
import { TFindOneOrAllPaymentsUseCaseRequest, TFindOneOrAllPaymentsUseCaseResponse } from "./TFindOneOrAllPaymentsUseCase";

export interface IFindOneOrAllPaymentsUseCase extends IUseCase<TFindOneOrAllPaymentsUseCaseRequest, TFindOneOrAllPaymentsUseCaseResponse> {}