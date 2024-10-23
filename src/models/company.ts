import {
	AllowNull,
	AutoIncrement,
	BelongsToMany,
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
import { Account } from './account';
import { BusinessMan } from './business-man';
import { Optional } from 'sequelize';
import { Activity } from './activity';
import { CompanyActivity } from './company-activity';

interface CompanyAttributes {
	id: number;
	cnpj: string;
	legalName: string;
	tradeName: string;
	socialCapital: number;
	isTransportAutonomous?: boolean;
	revenueLimit: number;
	addressId?: number;
	businessManId?: number;
	accountId?: number;
}

type CompanyCreationAttributes = Optional<CompanyAttributes, 'id'>;

@Table({ tableName: 'empresa', timestamps: false })
export class Company extends Model<
	CompanyAttributes,
	CompanyCreationAttributes
> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@AllowNull(false)
	@Unique
	@Column
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
	@Column({
		field: 'endereco_id',
	})
	addressId?: number;

	@ForeignKey(() => BusinessMan)
	@Column({
		field: 'empresario_id',
	})
	businessManId?: number;

	@ForeignKey(() => Account)
	@Column({
		field: 'conta_id',
	})
	accountId?: number;

	@BelongsToMany(() => Activity, () => CompanyActivity)
	activities?: Activity[];
}
