import { Table, Column, DataType, HasMany, BelongsTo, ForeignKey, Model, AllowNull } from 'sequelize-typescript'
import Games from './Games'

@Table({
    tableName: 'gameCategory'
})

class GameCategory extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare title: string

    @HasMany(() => Games, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare Commynities: Games[]
}

export default GameCategory