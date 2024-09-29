import {
	Column,
	DataType,
	ForeignKey,
	Model,
	// PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { Company } from './company';
import { Activity } from './activity';

@Table({ tableName: 'empresa_atividade', timestamps: false })
export class CompanyActivity extends Model<CompanyActivity> {
	@ForeignKey(() => Company)
	@Column(DataType.SMALLINT)
	companyId!: number;

	@ForeignKey(() => Activity)
	@Column(DataType.SMALLINT)
	activityId!: number;

	// @PrimaryKey
	// @Column(DataType.SMALLINT)
	// id!: number;
}
