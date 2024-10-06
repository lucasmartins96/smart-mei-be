import { Router } from 'express';
import Route from '../interfaces/route';
import UserController from '../controllers/user';

class UserRoute implements Route {
	private readonly controller: UserController;
	public readonly router: Router;
	public readonly path: string;

	constructor() {
		this.controller = new UserController();
		this.router = Router();
		this.path = 'users';
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/', this.controller.add.bind(this.controller));
	}
}

export default UserRoute;
