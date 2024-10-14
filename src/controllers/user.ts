import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user';
import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../common/request-errors/not-found';
import { JWTService } from '../common/jwt';
import BadRequestError from '../common/request-errors/bad-request';

export default class UserController {
	private readonly service: UserService;
	private jwt: JWTService;

	constructor() {
		this.service = new UserService();
		this.jwt = new JWTService();
	}

	async add(
		req: Request<
			unknown,
			unknown,
			{ name?: string; email?: string; password?: string; role?: string },
			unknown
		>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { name, email, password, role } = req.body;

			if (name && email && password && role) {
				const isEmailRegistered = await this.service.checkEmailExists(email);

				if (isEmailRegistered) {
					return next(
						new BadRequestError({
							message: 'Erro ao criar o cadastro! O email já está cadastrado!',
						}),
					);
				}

				const newUser = await this.service.add({ name, email, password, role });
				const newUserId = newUser!.dataValues.id;
				const newUserName = newUser!.dataValues.name;
				const newUserEmail = newUser!.dataValues.email;

				const token = this.jwt.generateToken({
					id: newUserId,
					name: newUserName,
					email: newUserEmail,
					role: newUser!.dataValues.role,
				});

				res.status(StatusCodes.OK).json({
					id: newUserId,
					name: newUserName,
					email: newUserEmail,
					token,
				});
			} else {
				next(
					new BadRequestError({
						message:
							'Erro ao criar o cadastro! Verifique se todos os campos estão preenchidos corretamente!',
					}),
				);
			}
		} catch (error) {
			console.error(error);
			next(error);
		}
	}

	async findOne(
		req: Request<unknown, unknown, { email?: string; password?: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { email, password } = req.body;
			const result = await this.service.findOne(email, password);

			if (!result) {
				return next(
					new NotFoundError({
						message: 'usuário não encontrado',
						showLogging: true,
					}),
				);
			} else {
				res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: 'usuário não encontrado' });
			}
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}
