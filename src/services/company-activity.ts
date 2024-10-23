import { Transaction } from 'sequelize';
import { CompanyActivity } from '../models/company-activity';

type AddFields = {
	companyId: number;
	activityId: number;
};

export default class CompanyActivityService {
	constructor() {}

	async add(
		fields: AddFields,
		transaction?: Transaction,
	): Promise<CompanyActivity | null> {
		try {
			const newCompanyActivity = new CompanyActivity(fields);
			const created = await newCompanyActivity.save({
				transaction,
			});
			return created;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async bulkAdd(
		fields: AddFields[],
		transaction?: Transaction,
	): Promise<(CompanyActivity | null)[]> {
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
