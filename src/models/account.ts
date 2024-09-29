import {
	AutoIncrement,
	Column,
	DataType,
	Default,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';

@Table({ tableName: 'conta', timestamps: false })
export class Account extends Model<Account> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@Default(0)
	@Column({ field: 'saldo', type: DataType.DECIMAL })
	balance?: number;
}
