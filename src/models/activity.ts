import { Optional } from 'sequelize';
import {
	AllowNull,
	AutoIncrement,
	BelongsToMany,
	Column,
	DataType,
	Default,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { Company } from './company';
import { CompanyActivity } from './company-activity';

interface ActivityAttributes {
	id: number;
	cnae: string;
	name: string;
	occupation: string;
	isPrimary?: boolean;
}

type ActivityCreationAttributes = Optional<ActivityAttributes, 'id'>;

@Table({ tableName: 'atividade', timestamps: false })
export class Activity extends Model<
	ActivityAttributes,
	ActivityCreationAttributes
> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@AllowNull(false)
	@Column
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

	@BelongsToMany(() => Company, () => CompanyActivity)
	companies?: Company[];
}
