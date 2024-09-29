import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	CreatedAt,
	DataType,
	AllowNull,
} from 'sequelize-typescript';

@Table({ tableName: 'usuario', updatedAt: false })
export class User extends Model<User> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@AllowNull(false)
	@Column({ field: 'nome' })
	name!: string;

	@AllowNull(false)
	@Column({ field: 'email' })
	email!: string;

	@AllowNull(false)
	@Column({ field: 'senha' })
	password!: string;

	@AllowNull(false)
	@Column({ field: 'funcao' })
	role!: string;

	@CreatedAt
	@Column({ field: 'created_at' })
	createdAt!: Date;
}
