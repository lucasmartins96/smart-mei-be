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

@Table({ tableName: 'movimentacao', timestamps: false })
export class Transaction extends Model<Transaction> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@AllowNull(false)
	@Column({
		field: 'tipo',
		type: DataType.ENUM('saida', 'entrada', 'saida_banco'),
	})
	type!: string;

	@AllowNull(false)
	@Column({ field: 'valor', type: DataType.DECIMAL })
	amount!: number;

	@Column({ field: 'nota_fiscal_url' })
	invoiceUrl?: string;

	@Column({ field: 'data' })
	date?: Date;

	@Default(false)
	@Column({ field: 'dispensa_nota_fiscal' })
	isInvoiceExempt?: boolean;

	@Column({ field: 'recorrente' })
	isRecurring?: boolean;
}
