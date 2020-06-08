'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TonerRegistry extends Model {
    toner(){
        return this.belongsTo('App/Models/Toner')
    }
}

module.exports = TonerRegistry
