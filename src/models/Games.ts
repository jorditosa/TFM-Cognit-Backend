import { Table, Column, DataType, HasMany, BelongsTo, ForeignKey, Model, AllowNull } from 'sequelize-typescript'
import GameCategory from './Category'

@Table({
    tableName: 'games'
})

class Games extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare title: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(80)
    })
    declare explanation: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(9)
    })
    declare points_reward: string

    @ForeignKey(() => GameCategory)
    declare categoryId: number

    @BelongsTo(() => GameCategory)
    declare category: GameCategory
}

export default Games