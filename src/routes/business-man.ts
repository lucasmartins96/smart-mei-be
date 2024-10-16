import { Router } from 'express';
import Route from '../interfaces/route';
import BusinessManController from '../controllers/business-man';
import AuthHandler from '../middlewares/auth-handler';

export default class BusinessManRoute implements Route {
	private readonly controller: BusinessManController;
	private readonly authHandler: AuthHandler;
	public readonly router: Router;
	public readonly path: string;

	constructor() {
		this.controller = new BusinessManController();
		this.authHandler = new AuthHandler();
		this.router = Router();
		this.path = 'businessman';
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
