import { Transaction } from 'sequelize';
import { Activity } from '../models/activity';

type AddFields = {
	cnae: string;
	name: string;
	occupation: string;
	isPrimary?: boolean;
};

export default class ActivityService {
	constructor() {}

	async add(
		fields: AddFields,
		transaction?: Transaction,
	): Promise<Activity | null> {
		try {
			const newActivity = new Activity(fields);
			const created = await newActivity.save({ transaction });
			return created;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async bulkAdd(
		fields: AddFields[],
		transaction?: Transaction,
	): Promise<(Activity | null)[]> {
		try {
			const bulkAddPromises = fields.map(async (field) => {
				const created = await this.add(field, transaction);
				return created;
			});

			return Promise.all(bulkAddPromises);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
