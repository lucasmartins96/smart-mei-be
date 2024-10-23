import { Router } from 'express';
import Route from '../interfaces/route';
import CompanyController from '../controllers/company';
import AuthHandler from '../middlewares/auth-handler';

export default class CompanyRoute implements Route {
	private readonly controller: CompanyController;
	private readonly authHandler: AuthHandler;
	public readonly router: Router;
	public readonly path: string;

	constructor() {
		this.controller = new CompanyController();
		this.authHandler = new AuthHandler();
		this.router = Router();
		this.path = 'companies';
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			'/',
			this.authHandler.handleAuthorization.bind(this.authHandler),
			this.controller.add.bind(this.controller),
		);
	}
}
