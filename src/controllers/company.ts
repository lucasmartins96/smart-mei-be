import { NextFunction, Request, Response } from 'express';
import CompanyService from '../services/company';
import BadRequestError from '../common/request-errors/bad-request';
import { StatusCodes } from 'http-status-codes';

export default class CompanyController {
	private readonly service: CompanyService;

	constructor() {
		this.service = new CompanyService();
	}

	async add(
		req: Request<
			unknown,
			unknown,
			{
				company: {
					cnpj: string;
					legalName: string;
					tradeName: string;
					socialCapital: number;
					isTransportAutonomous?: boolean;
					businessManId?: number;
				};
				address: {
					zipCode: string;
					street: string;
					complement?: string;
					number?: string;
					neighborhood?: string;
					city: string;
					state: string;
				};
				activities: {
					cnae: string;
					name: string;
					occupation: string;
					isPrimary?: boolean;
				}[];
			},
			unknown
		>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { company, address, activities } = req.body;

			if (company && address && activities.length > 0) {
				const result = await this.service.add({
					company,
					address,
					activities,
				});

				if (!result?.success) {
					return next(
						new BadRequestError({
							message: 'Erro ao criar o cadastro da empresa!',
						}),
					);
				}

				res
					.status(StatusCodes.OK)
					.json({ message: 'Empresa cadastrada com sucesso!' });
			} else {
				next(
					new BadRequestError({
						message:
							'Erro ao criar o cadastro da empresa! Verifique se todos os campos estão preenchidos corretamente!',
					}),
				);
			}
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}
