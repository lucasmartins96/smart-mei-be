import { Transaction } from 'sequelize';
import { Address } from '../models/address';

type AddProps = {
	zipCode: string;
	street: string;
	complement?: string;
	number?: string;
	neighborhood?: string;
	city: string;
	state: string;
};

type UpdateProps = AddProps & { id: number };

export default class AddressService {
	constructor() {}

	async add(
		props: AddProps,
		transaction?: Transaction,
	): Promise<Address | null> {
		try {
			const newAddress = new Address(props);
			const created = await newAddress.save({ transaction });
			return created;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async update(
		props: UpdateProps,
		transaction?: Transaction,
	): Promise<[affectedCount: number]> {
		try {
			const { id, ...updateFields } = props;
			return Address.update(updateFields, { where: { id }, transaction });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
