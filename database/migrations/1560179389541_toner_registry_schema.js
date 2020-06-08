'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TonerRegistrySchema extends Schema {
  up () {
    this.create('toner_registries', (table) => {
      table.increments()
      table.string('name', 20).notNullable()
      table.string('accion', 20).notNullable()
      table.integer('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('toner_registries')
  }
}

module.exports = TonerRegistrySchema
