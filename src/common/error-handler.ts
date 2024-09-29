import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class ErrorHandler {
	static notFound(req: Request, res: Response, next: NextFunction) {
		res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: 'Recurso/solicitação não encontrada!' });
	}

	static serverError(
		error: Error,
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message });
	}
}

export default ErrorHandler;
