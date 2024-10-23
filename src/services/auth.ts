import { User } from '../models/user';
import bcrypt from 'bcrypt';
import NotFoundError from '../common/request-errors/not-found';
import BadRequestError from '../common/request-errors/bad-request';
import JWTService from '../common/jwt';

export default class AuthService {
	private jwt: JWTService;

	constructor() {
		this.jwt = new JWTService();
	}

	async login(
		email?: string,
		password?: string,
	): Promise<{
		id: number;
		name: string;
		email: string;
		token: string;
	}> {
		try {
			const foundUser = await User.findOne({ where: { email } });

			if (!foundUser) {
				throw new NotFoundError({
					message: 'Usuário não encontrado!',
					showLogging: true,
				});
			}

			const isMatch = bcrypt.compareSync(password ?? '', foundUser!.password);

			if (!isMatch) {
				throw new BadRequestError({
					message: 'Senhas não conferem!',
					showLogging: true,
				});
			}

			const token = this.jwt.generateToken({
				id: foundUser?.id,
				name: foundUser?.name,
				email: foundUser?.email,
				role: foundUser.role,
			});

			return {
				id: foundUser.id,
				name: foundUser.name,
				email: foundUser.email,
				token,
			};
		} catch (error) {
			throw error;
		}
	}
}
