'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TonerSchema extends Schema {
  up () {
    this.create('toners', (table) => {
      table.increments()
      table.string('name', 20).notNullable().unique()      
      table.timestamps()
    })
  }

  down () {
    this.drop('toners')
  }
}

module.exports = TonerSchema
