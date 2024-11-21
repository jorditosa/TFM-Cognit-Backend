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
        type: DataType.STRING(50)
    })
    declare birthDate: string

    @Column({
        type: DataType.INTEGER
    })
    declare points: number
}

export default Users