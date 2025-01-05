import { Table, Column, DataType, HasMany, BelongsTo, ForeignKey, Model, Default, Unique, AllowNull } from 'sequelize-typescript'
import Commynity from './Commynity'

@Table({
    tableName: 'users'
})

class User extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(80)
    })
    declare username: string

    @Unique(true)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(80)
    })
    declare email: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare password: string

    @Column({
        type: DataType.STRING(6)
    })
    declare token: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean

    @HasMany(() => Commynity, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare Commynities: Commynity[]


}

export default User