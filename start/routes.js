'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')
// Route.on('/registrodiario').render('registrodiario');
// Route.on('/registrar').render('registrar');
// Route.on('/retirar').render('retirar');
// Route.on('/login').render('login');


// Route.get('/', async({ response }) => {
//     return response.redirect('/todos')
// })

Route.get('/registrar', 'TonerController.index').as('toners.index');
Route.get('/retirar', 'TonerController.retirar').as('toners.retirar');
Route.get('/tonersdata', 'TonerController.validate').as('toners.validate');
Route.get('/toners', 'TonerController.admin').as('toners.admin');
Route.post('/toners/:id', 'TonerController.destroy').as('toners.destroy');
Route.post('/toners', 'TonerController.create').as('toners.create');
// Route.get('/retirar', 'TonerController.retirar').as('toners.retirar');

Route.get('/registrodiario', 'TonerRegistryController.index').as('registry.index')
Route.get('/', 'TonerRegistryController.inventario').as('registry.inventario')
Route.post('/registrodiario', 'TonerRegistryController.create').as('registry.create')
Route.get('/*', ({ response }) => {
    response.redirect('/')
})