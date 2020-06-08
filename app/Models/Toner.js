'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Toner extends Model {
    registries(){
        return this.hasMany('App/Models/TonerRegistry')
    }
}

module.exports = Toner
