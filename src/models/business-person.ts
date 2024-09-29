import {
	AllowNull,
	AutoIncrement,
	Column,
	DataType,
	HasOne,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import User from './user';

@Table({
	tableName: 'empresario',
	timestamps: false,
})
class BusinessPerson extends Model {
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
	@Column({
		field: 'cpf',
	})
	cpf!: string;

	@AllowNull(false)
	@Column({
		field: 'data_nascimento',
	})
	birthday!: Date;

	@HasOne(() => User)
	usuario_id!: number;
}

export default BusinessPerson;
