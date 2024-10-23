import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Company } from './company';
import { Activity } from './activity';
import { Optional } from 'sequelize';

interface CompanyActivityAttributes {
	companyId: number;
	activityId: number;
}

type CompanyActivityCreationAttributes = Optional<
	CompanyActivityAttributes,
	'companyId'
>;

@Table({ tableName: 'empresa_atividade', timestamps: false })
export class CompanyActivity extends Model<
	CompanyActivityAttributes,
	CompanyActivityCreationAttributes
> {
	@ForeignKey(() => Company)
	@Column({ field: 'empresa_id' })
	companyId!: number;

	@ForeignKey(() => Activity)
	@Column({ field: 'atividade_id' })
	activityId!: number;
}
