/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../common/request-errors/unauthorized';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import environmentVar from '../env';

class AuthHandler {
	constructor() {}

	async handleAuthorization(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.header('Authorization')?.replace('Bearer ', '');

			if (!token) {
				return next(
					new UnauthorizedError({
						message:
							'Autenticação necessária. Por favor, entre com suas credenciais.',
					}),
				);
			}

			jwt.verify(token, environmentVar.secretKey!, (err, _decoded) => {
				if (err instanceof TokenExpiredError) {
					return next(
						new UnauthorizedError({
							message:
								'Token de autenticação inválido ou expirado. Por favor, faça login novamente.',
						}),
					);
				} else if (err) {
					return next(
						new UnauthorizedError({
							message:
								'Permissão insuficiente. Verifique suas permissões e tente novamente.',
						}),
					);
				}

				// return decoded;
			});
			// (req as CustomRequest).token = decoded;

			next();
		} catch (error) {
			throw error;
		}
	}
}

export default AuthHandler;
