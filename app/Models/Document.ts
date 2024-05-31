import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public  Nombre: string

  @column()
  public  Descripcion: string

  @column()
  public  Mercado_Financiero: number

  @column()
  public  Tipo: string

  @column()
  public  Ruta: string

  @column()
  public  Status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
