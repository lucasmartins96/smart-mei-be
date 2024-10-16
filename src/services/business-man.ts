import BusinessMan from '../models/business-man';
import AddressService from './address';
import SequelizeConnection from '../interfaces/sequelize-connection';
import PostgresConnection from '../config/db/postgres';

type AddProps = {
	businessMan: {
		name: string;
		cpf: string;
		birthday: string | Date;
		userId: number;
	};
	address: {
		zipCode: string;
		street: string;
		complement?: string;
		number?: string;
		neighborhood?: string;
		city: string;
		state: string;
	};
};

type UpdateProps = {
	businessMan: {
		id: number;
		name: string;
		cpf: string;
		birthday: Date;
		userId?: number;
	};
	address: {
		id: number;
		zipCode: string;
		street: string;
		complement?: string;
		number?: string;
		neighborhood?: string;
		city: string;
		state: string;
	};
};

export default class BusinessManService {
	private readonly addressService: AddressService;
	private readonly dbConnection: SequelizeConnection;

	constructor() {
		this.addressService = new AddressService();
		this.dbConnection = PostgresConnection.getInstance();
	}

	async add(props: AddProps): Promise<{ success: boolean } | null | undefined> {
		try {
			const businessManFound = await this.findOne(props.businessMan.cpf);

			if (businessManFound !== null) {
				const updateResult = await this.update({
					address: {
						...props.address,
						id: businessManFound.addressId,
					},
					businessMan: businessManFound,
				});

				if (Array.isArray(updateResult) && updateResult[0] > 0) {
					return { success: true };
				}

				return { success: false };
			}

			const transactionResult = await this.dbConnection.sequelize?.transaction(
				async (t) => {
					const newAddress = await this.addressService.add(props.address, t);
					const addressId = newAddress!.id!;
					const birthday = new Date(props.businessMan.birthday);
					const newBusinessManProps = {
						...props.businessMan,
						addressId,
						birthday,
					};
					const newBusinessMan = new BusinessMan(newBusinessManProps);
					const created = await newBusinessMan.save({ transaction: t });

					if (created) {
						return { success: true };
					}

					return { success: false };
				},
			);

			return transactionResult;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async findOne(cpf?: string): Promise<BusinessMan | null> {
		try {
			return BusinessMan.findOne({ where: { cpf } });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async update(
		props: UpdateProps,
	): Promise<[affectedCount: number] | undefined> {
		try {
			const resultTransaction = await this.dbConnection.sequelize?.transaction(
				async (t) => {
					const { id, ...updateFields } = props.businessMan;

					await this.addressService.update(props.address, t);

					const resultUpdate = await BusinessMan.update(updateFields, {
						where: { id },
						transaction: t,
					});

					return resultUpdate;
				},
			);

			return resultTransaction;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
