import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript'

@Table({
    tableName: 'users'
})

class Users extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare username: string

    @Column({
        type: DataType.STRING(100)
    })
    declare password: string

    @Column({
        type: DataType.STRING(100)
    })
    declare email: string

    @Column({
        type: DataType.INTEGER
    })
    declare points: number

    @Column({
        type: DataType.STRING(6)
    })
    declare token: string

    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean
}

export default Users