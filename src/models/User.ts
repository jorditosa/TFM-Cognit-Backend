import { Table, Column, DataType, HasMany, BelongsTo, ForeignKey, Model, Default, Unique, AllowNull } from 'sequelize-typescript'
import Commynity from './Games'

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

    @Default(0)
    @Column({
        type: DataType.STRING
    })
    declare points: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean
}

export default User