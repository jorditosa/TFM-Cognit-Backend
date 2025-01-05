import { Table, Column, DataType, HasMany, BelongsTo, ForeignKey, Model, AllowNull } from 'sequelize-typescript'
import User from './User'

@Table({
    tableName: 'communities'
})

class Commynity extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare title: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(80)
    })
    declare category: string

    @ForeignKey(() => User)
    declare userId: number

    @BelongsTo(() => User)
    declare user: User
}

export default Commynity