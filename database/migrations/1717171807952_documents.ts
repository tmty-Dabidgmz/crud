import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'),
      table.string('Nombre'),
      table.string('Descripcion'),
      table.integer('Mercado_Financiero'),
      table.string('Tipo'),
      table.string('Ruta'),
      table.string('Status').defaultTo('Active')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
