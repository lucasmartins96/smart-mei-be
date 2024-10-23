import { Company } from '../models/company';
import AddressService from './address';
import SequelizeConnection from '../interfaces/sequelize-connection';
import PostgresConnection from '../config/db/postgres';
import BadRequestError from '../common/request-errors/bad-request';
import ActivityService from './activity';
import CompanyActivityService from './company-activity';
import AccountService from './account';

type AddProps = {
	company: {
		cnpj: string;
		legalName: string;
		tradeName: string;
		socialCapital: number;
		isTransportAutonomous?: boolean;
		businessManId?: number;
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
	activities: {
		cnae: string;
		name: string;
		occupation: string;
		isPrimary?: boolean;
	}[];
};

export default class CompanyService {
	private readonly addressService: AddressService;
	private readonly activityService: ActivityService;
	private readonly companyActivityService: CompanyActivityService;
	private readonly accountService: AccountService;
	private readonly dbConnection: SequelizeConnection;

	constructor() {
		this.addressService = new AddressService();
		this.activityService = new ActivityService();
		this.companyActivityService = new CompanyActivityService();
		this.accountService = new AccountService();
		this.dbConnection = PostgresConnection.getInstance();
	}

	async add(props: AddProps): Promise<{ success: boolean } | null | undefined> {
		try {
			const companyFound = await this.findOne(props.company.cnpj);

			if (companyFound !== null) {
				throw new BadRequestError({
					message:
						'Essa empresa já se encontra registrada em nosso sistema! Por favor, efetue o login e atualize o cadastro da empresa!',
				});
			}

			const transactionResult = await this.dbConnection.sequelize?.transaction(
				async (t) => {
					// CREATE NEW COMPANY ADDRESS
					const newCompanyAddress = await this.addressService.add(
						props.address,
						t,
					);

					// CREATE NEW COMPANY ACTIVITIES
					const newActivities = await this.activityService.bulkAdd(
						props.activities,
						t,
					);

					// CREATE NEW ACCOUNT
					const newAccount = await this.accountService.add(t);

					// CREATE NEW COMPANY
					const revenueLimitForNotTransportAutonomous = 81000.0;
					const revenueLimitForTransportAutonomous = 251600.0;
					const addressId = newCompanyAddress!.id;
					const accountId = newAccount!.id;
					const revenueLimit = props.company.isTransportAutonomous
						? revenueLimitForTransportAutonomous
						: revenueLimitForNotTransportAutonomous;
					const newCompanyProps = {
						...props.company,
						revenueLimit,
						addressId,
						accountId,
					};
					const company = new Company(newCompanyProps);
					const created = await company.save({ transaction: t });

					// CREATE NEW RELATION BETWEEN COMPANY AND ACTIVITIES IN COMPANY_ACTIVITY TABLE
					const companyActivityAddProps = newActivities.map<{
						companyId: number;
						activityId: number;
					}>((activity) => {
						return {
							companyId: created.id,
							activityId: activity!.id,
						};
					});

					await this.companyActivityService.bulkAdd(companyActivityAddProps, t);

					if (newAccount) {
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

	async findOne(cnpj?: string): Promise<Company | null> {
		try {
			return Company.findOne({ where: { cnpj } });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
