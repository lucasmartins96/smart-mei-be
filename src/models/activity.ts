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

@Table({ tableName: 'atividade', timestamps: false })
export class Activity extends Model<Activity> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@AllowNull(false)
	@Column({ field: 'cnae' })
	cnae!: string;

	@AllowNull(false)
	@Column({ field: 'nome' })
	name!: string;

	@AllowNull(false)
	@Column({ field: 'ocupacao' })
	occupation!: string;

	@Default(false)
	@Column({ field: 'primaria' })
	isPrimary?: boolean;
}
