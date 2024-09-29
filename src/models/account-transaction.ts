import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { Account } from './account';
import { Transaction } from './transaction';

@Table({ tableName: 'conta_movimentacao', timestamps: false })
export class AccountTransaction extends Model<AccountTransaction> {
	@ForeignKey(() => Account)
	@Column(DataType.SMALLINT)
	accountId!: number;

	@ForeignKey(() => Transaction)
	@Column(DataType.SMALLINT)
	transactionId!: number;

	// @PrimaryKey
	// @Column(DataType.SMALLINT)
	// id!: number;
}
