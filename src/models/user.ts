import { Optional } from 'sequelize';
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

interface UserAttributes {
	id: number;
	name: string;
	email: string;
	password: string;
	role: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

@Table({ tableName: 'usuario', updatedAt: false })
export class User extends Model<UserAttributes, UserCreationAttributes> {
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
