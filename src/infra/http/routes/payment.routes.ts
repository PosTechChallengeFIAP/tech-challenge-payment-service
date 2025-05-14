import { Router } from "express"
import { IController } from "../protocols/controller"
import { container } from "tsyringe"
import { RouterAdapter } from "../adapters/RouterAdapter"

const createPaymentController: IController = container.resolve('CreatePaymentController')
const findOneOrAllPaymentsController: IController = container.resolve('FindOneOrAllPaymentsController')
const updatePaymentController: IController = container.resolve('UpdatePaymentController')

export default (route: Router): void => {
    route.get('/payments', RouterAdapter.adapt(findOneOrAllPaymentsController))
    route.post('/payments', RouterAdapter.adapt(createPaymentController))
    route.put('/payments/:id', RouterAdapter.adapt(updatePaymentController))
}