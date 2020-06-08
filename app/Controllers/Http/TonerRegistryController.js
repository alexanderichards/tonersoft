'use strict'

const TonerRegistry = use('App/Models/TonerRegistry.js')
const Toner = use('App/Models/Toner')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tonerregistries
 */
class TonerRegistryController {
  /**
   * Show a list of all tonerregistries.
   * GET tonerregistries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const records = await TonerRegistry.all();
    // return Toners
    // console.log('helo')
    // console.log(records)
    // return records;
    return view.render('registrodiario', { records: records.rows });
  }

  /**
   * Render a form to be used for creating a new tonerregistry.
   * GET tonerregistries/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view, session }) {

    // session.flash({ errorMessage: 'Todo was added'})

    const newReg = new TonerRegistry()
    newReg.name = request.input('toner')
    newReg.quantity = request.input('quantity')
    let valid = 0;

    const accion = request.input('accion')
    // console.log(accion);
    if (accion == 'Ingreso') {
      newReg.accion = 'Ingreso'
    }
    else if (accion == 'Retiro') {
      newReg.accion = 'Retiro'
    }


    // await newReg.save()
    // return  request.all();
    // response.redirect('/registrodiario');


    // EMPIEZA 

    const toners = await Toner.all();
    let tonerrow = toners.rows
    let tonerarr = [];
    let finalarrsum = [];

    for (let index = 0; index < tonerrow.length; index++) {
      const element = tonerrow[index]
      tonerarr.push(element.name)
    }
    const records = await TonerRegistry.all();
    var obj = groupBy(records.rows, "name");

    for (let index = 0; index < obj.length; index++) {
      const element = obj[index];
      let arrsum = []
      let objsuma;
      let objsum = {
        retiro: 0,
        ingreso: 0,
        toner: '',
        total: 0
      }

      for (let index = 0; index < element.length; index++) {
        const el = element[index];
        objsum.toner = el.name;


        if (el.accion == 'Ingreso') {
          objsum.ingreso += Number(el.quantity);
        } else if (el.accion == 'Retiro') {
          objsum.retiro += Number(el.quantity)
        }
        objsuma = objsum
      }
      arrsum.push(objsuma);
      finalarrsum.push(objsuma)
    }

    function groupBy(collection, property) {
      var i = 0, val, index,
        values = [], result = [];
      for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
          result[index].push(collection[i]);
        else {
          values.push(val);
          result.push([collection[i]]);
        }
      }
      return result;
    }

    for (let index = 0; index < tonerarr.length; index++) {
      const element = tonerarr[index];
      if (!finalarrsum.filter(e => e.toner === element).length > 0) {
        console.log(element)
        let obj = {
          retiro: 0,
          ingreso: 0,
          toner: element,
          total: 0
        }

        finalarrsum.push(obj);
      }
    }

    for (let index = 0; index < finalarrsum.length; index++) {
      const element = finalarrsum[index];
      element.total = element.ingreso - element.retiro
    }

    // return view.render('welcome', { Toners: finalarrsum });

    for (let index = 0; index < finalarrsum.length; index++) {
      const element = finalarrsum[index];
      if (element.toner == newReg.name && newReg.accion == 'Retiro') {
        if (element.total < newReg.quantity) {
          valid = 1
          session.flash({ errorMessage: `No hay suficientes toners de este modelo (${newReg.name}) en inventario, \nDisponibles: ${element.total}` })
          // return view.render('welcome', { Toners: finalarrsum });
          return response.redirect('back')
        }
      }

    }
    
    await newReg.save()
    session.flash({ successMessage: 'Accion registrada satifactoriamente' })
    return response.redirect('registrodiario');
  }

  /**
   * Create/save a new tonerregistry.
   * POST tonerregistries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async inventario({ request, response, view }) {
    const toners = await Toner.all();
    let tonerrow = toners.rows
    let tonerarr = [];
    let finalarrsum = [];

    // let arr = [[]]
    for (let index = 0; index < tonerrow.length; index++) {
      const element = tonerrow[index]
      tonerarr.push(element.name)
    }
    const records = await TonerRegistry.all();
    var obj = groupBy(records.rows, "name");

    for (let index = 0; index < obj.length; index++) {
      const element = obj[index];
      // console.log(element)
      let arrsum = []
      let objsuma;
      let objsum = {
        retiro: 0,
        ingreso: 0,
        toner: '',
        total: 0
      }

      // console.log('loop');
      for (let index = 0; index < element.length; index++) {
        const el = element[index];
        // let arrsum = []
        objsum.toner = el.name;


        if (el.accion == 'Ingreso') {
          // objsum.ingreso = el.quantity
          // objsum.ingreso.push(el.quantity)
          // console.log(typeof(objsum.ingreso), typeof(el.quantity))
          objsum.ingreso += Number(el.quantity);
          // console.log(el.quantity);
        } else if (el.accion == 'Retiro') {
          // console.log('si')
          objsum.retiro += Number(el.quantity)
          // objsum.retiro.push(el.quantity)
        }
        // arrsum.push(objsum);
        objsuma = objsum
        // objsum = [];
        // console.log(arrsum);
      }
      arrsum.push(objsuma);
      finalarrsum.push(objsuma)
      // console.log(arrsum);


      // console.log('hello')
    }

    function groupBy(collection, property) {
      var i = 0, val, index,
        values = [], result = [];
      for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
          result[index].push(collection[i]);
        else {
          values.push(val);
          result.push([collection[i]]);
        }
      }
      return result;
    }

    // for (let index = 0; index < tonerarr.length; index++) {
    //   const element = tonerarr[index];
    //   console.log(element)
    //   for (let index = 0; index < finalarrsum.length; index++) {
    //     const el = finalarrsum[index];
    //     if(element == el.toner){
    //       console.log('igual')
    //     }else{
    //       console.log('no es igual')
    //     }
    //     if(index == finalarrsum.length - 1){

    //     }
    //   }
    // }
    for (let index = 0; index < tonerarr.length; index++) {
      const element = tonerarr[index];
      if (!finalarrsum.filter(e => e.toner === element).length > 0) {
        /* vendors contains the element we're looking for */
        // console.log(element)
        let obj = {
          retiro: 0,
          ingreso: 0,
          toner: element,
          total: 0
          // total: this.ingreso - this.retiro
        }
        // obj.total = obj.ingreso - obj.retiro

        finalarrsum.push(obj);
        // console.log(finalarrsum)
      }
    }

    for (let index = 0; index < finalarrsum.length; index++) {
      const element = finalarrsum[index];
      element.total = element.ingreso - element.retiro
    }

    // console.log(obj)
    // return finalarrsum;

    return view.render('welcome', { Toners: finalarrsum });
  }
  async store({ request, response }) {
  }

  /**
   * Display a single tonerregistry.
   * GET tonerregistries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing tonerregistry.
   * GET tonerregistries/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update tonerregistry details.
   * PUT or PATCH tonerregistries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a tonerregistry with id.
   * DELETE tonerregistries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = TonerRegistryController
