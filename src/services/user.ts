import { User } from '../models/user';
import bcrypt from 'bcrypt';

type AddProps = {
	name: string;
	email: string;
	password: string;
	role: string;
};

export default class UserService {
	constructor() {}

	async add(props: AddProps): Promise<User | null> {
		try {
			const hashedPassword = bcrypt.hashSync(props.password, 10);
			const newUser = new User({ ...props, password: hashedPassword });
			const created = await newUser.save();
			return created;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async findOne(email?: string, password?: string): Promise<User | null> {
		try {
			return User.findOne({ where: { email, password } });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
