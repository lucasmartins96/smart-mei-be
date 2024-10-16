import {
	AllowNull,
	AutoIncrement,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { User } from './user';
import { Address } from './address';
import { Optional } from 'sequelize';

interface BusinessManAttributes {
	id: number;
	name: string;
	cpf: string;
	birthday: Date;
	addressId: number;
	userId: number;
}

type BusinessManCreationAttributes = Optional<BusinessManAttributes, 'id'>;

@Table({
	tableName: 'empresario',
	timestamps: false,
})
class BusinessMan extends Model<
	BusinessManAttributes,
	BusinessManCreationAttributes
> {
	@AutoIncrement
	@PrimaryKey
	@AllowNull(false)
	@Column({
		type: DataType.SMALLINT,
		field: 'id',
	})
	id!: number;

	@AllowNull(false)
	@Column({
		field: 'nome',
	})
	name!: string;

	@AllowNull(false)
	@Column
	cpf!: string;

	@AllowNull(false)
	@Column({
		field: 'data_nascimento',
	})
	birthday!: Date;

	@ForeignKey(() => Address)
	@Column({
		field: 'endereco_id',
	})
	addressId!: number;

	@ForeignKey(() => User)
	@Column({
		field: 'usuario_id',
	})
	userId!: number;
}

export default BusinessMan;
