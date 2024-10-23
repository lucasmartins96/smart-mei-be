import { Transaction } from 'sequelize';
import { Account } from '../models/account';

export default class AccountService {
	constructor() {}

	async add(transaction?: Transaction): Promise<Account | null> {
		try {
			const newAccount = new Account();
			const created = await newAccount.save({ transaction });
			return created;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
