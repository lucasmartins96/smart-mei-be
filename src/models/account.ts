import { Optional } from 'sequelize';
import {
	AutoIncrement,
	Column,
	DataType,
	Default,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';

interface AccountAttributes {
	id: number;
	balance?: number;
}

type AccountCreationAttributes = Optional<AccountAttributes, 'id'>;

@Table({ tableName: 'conta', timestamps: false })
export class Account extends Model<
	AccountAttributes,
	AccountCreationAttributes
> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@Default(0)
	@Column({ field: 'saldo', type: DataType.DECIMAL })
	balance?: number;
}
