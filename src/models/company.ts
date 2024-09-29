import {
	AllowNull,
	AutoIncrement,
	Column,
	DataType,
	Default,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
	Unique,
} from 'sequelize-typescript';
import { Address } from './address';
import { Entrepreneur } from './entrepeneur';
import { Account } from './account';

@Table({ tableName: 'empresa', timestamps: false })
export class Company extends Model<Company> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@AllowNull(false)
	@Unique
	@Column({ field: 'cnpj' })
	cnpj!: string;

	@AllowNull(false)
	@Column({ field: 'razao_social' })
	legalName!: string;

	@AllowNull(false)
	@Column({ field: 'nome_fantasia' })
	tradeName!: string;

	@AllowNull(false)
	@Column({ field: 'capital_social', type: DataType.DECIMAL })
	socialCapital!: number;

	@Default(false)
	@Column({ field: 'transportador_autonomo_cargas' })
	isTransportAutonomous?: boolean;

	@AllowNull(false)
	@Column({ field: 'limite_faturamento', type: DataType.DECIMAL })
	revenueLimit!: number;

	@ForeignKey(() => Address)
	@Column(DataType.SMALLINT)
	addressId?: number;

	@ForeignKey(() => Entrepreneur)
	@Column(DataType.SMALLINT)
	entrepreneurId?: number;

	@ForeignKey(() => Account)
	@Column(DataType.SMALLINT)
	accountId?: number;
}
