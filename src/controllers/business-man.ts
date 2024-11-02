import { NextFunction, Request, Response } from 'express';
import BusinessManService from '../services/business-man';
import BadRequestError from '../common/request-errors/bad-request';
import { StatusCodes } from 'http-status-codes';

export default class BusinessManController {
	private readonly service: BusinessManService;

	constructor() {
		this.service = new BusinessManService();
	}

	async add(
		req: Request<
			unknown,
			unknown,
			{
				token: unknown;
				name?: string;
				cpf?: string;
				birthday?: string;
				userId?: number;
				address: {
					zipCode: string;
					street: string;
					complement?: string;
					number?: string;
					neighborhood?: string;
					city: string;
					state: string;
				};
			},
			unknown
		>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { name, cpf, birthday, address } = req.body;
			const userId = req.user?.id;

			if (name && cpf && birthday && userId && address) {
				const result = await this.service.add({
					address,
					businessMan: {
						name,
						cpf,
						birthday,
						userId,
					},
				});

				if (!result?.success) {
					return next(
						new BadRequestError({
							message: 'Erro ao criar o cadastro do empresário!',
						}),
					);
				}

				res.status(StatusCodes.OK).json({
					message: 'Empresário cadastrado com sucesso!',
					id: result.id,
				});
			} else {
				next(
					new BadRequestError({
						message:
							'Erro ao criar o cadastro do empresário! Verifique se todos os campos estão preenchidos corretamente!',
					}),
				);
			}
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}
