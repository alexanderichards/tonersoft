'use strict'
const Toner = use('App/Models/Toner')
const TonerRegistry = use('App/Models/TonerRegistry')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with toners
 */
class TonerController {
  /**
   * Show a list of all toners.
   * GET toners
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, session }) {
    const Toners = await Toner.all();

    // return Toners
    return view.render('registrar', { Toners: Toners.rows });
  }
  async admin({ request, response, view, session }) {
    const Toners = await Toner.all();

    // return Toners
    return view.render('administracion', { Toners: Toners.rows });
  }

  async retirar({ request, response, view }) {
    const Toners = await Toner.all();
    // return Toners

    return view.render('retirar', { Toners: Toners.rows });
  }
  async validate({ request, response, view }) {

    const Toners = await Toner.query().where('name', request.input('name')).fetch();
    // console.log(Toners)
    // return Toners

    return Toners.rows;
  }

  /**
   * Render a form to be used for creating a new toner.
   * GET toners/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view, session}) {
    const newToner =  new Toner();
    newToner.name = request.input('name').toUpperCase();
    
    const val = await newToner.save()
    if(val){
      session.flash({ successMessage: 'Toner adicionado satifactoriamente' })
      response.redirect('/');
    }
  }

  /**
   * Create/save a new toner.
   * POST toners
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single toner.
   * GET toners/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing toner.
   * GET toners/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update toner details.
   * PUT or PATCH toners/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a toner with id.
   * DELETE toners/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, session }) {
    const Ton = await Toner.query().where('id', params.id).fetch();
    let tonnerName = Ton.toJSON();
    tonnerName = tonnerName[0].name
    await TonerRegistry.query().where('name', tonnerName).delete();
    const Ton1 = await Toner.query().where('id', params.id).delete();

    // await Ton.delete()
    // if (del) {
    session.flash({ successMessage: 'Toner eliminado satifactoriamente' })
    response.redirect('/');
    // }
  }
}

module.exports = TonerController
