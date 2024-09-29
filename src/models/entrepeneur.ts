import {
	AllowNull,
	AutoIncrement,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
	Unique,
} from 'sequelize-typescript';
import { Address } from './address';
import { User } from './user';

@Table({ tableName: 'empresario', timestamps: false })
export class Entrepreneur extends Model<Entrepreneur> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@AllowNull(false)
	@Column({ field: 'nome' })
	name!: string;

	@AllowNull(false)
	@Unique
	@Column({ field: 'cpf' })
	cpf!: string;

	@AllowNull(false)
	@Column({ field: 'data_nascimento' })
	birthDate!: Date;

	@ForeignKey(() => Address)
	@Column(DataType.SMALLINT)
	addressId?: number;

	@ForeignKey(() => User)
	@Column(DataType.SMALLINT)
	userId?: number;
}
