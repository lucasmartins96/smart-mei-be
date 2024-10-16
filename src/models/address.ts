import { Optional } from 'sequelize';
import {
	AllowNull,
	AutoIncrement,
	Column,
	DataType,
	Default,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';

interface AddressAttributes {
	id: number;
	zipCode: string;
	street: string;
	complement?: string;
	number?: string;
	neighborhood?: string;
	city: string;
	state: string;
}

type AddressCreationAttributes = Optional<AddressAttributes, 'id'>;

@Table({ tableName: 'endereco', timestamps: false })
export class Address extends Model<
	AddressAttributes,
	AddressCreationAttributes
> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@AllowNull(false)
	@Column({ field: 'cep', type: DataType.STRING(9) })
	zipCode!: string;

	@AllowNull(false)
	@Column({ field: 'logradouro' })
	street!: string;

	@Default('')
	@Column({ field: 'complemento' })
	complement?: string;

	@Column({ field: 'numero' })
	number?: string;

	@Column({ field: 'bairro' })
	neighborhood?: string;

	@AllowNull(false)
	@Column({ field: 'municipio' })
	city!: string;

	@AllowNull(false)
	@Column({ field: 'estado' })
	state!: string;
}
