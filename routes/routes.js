'use strict'

let Play = require('../lib/play')
let PlayerLoader = require('../lib/player-loader')
let _ = require('underscore')
let async = require('async')


module.exports = function(app) {

  const GRID_SIZES = [10, 30, 50, 100]

  app.get('/setup', (req, res) => {  
    res.render('play/setup', { GRID_SIZES })
  })

  app.post('/play', (req, res) => {

    let options = Play.defaultGridOptions()
    let translations = [
      { name: 'grid_width', type: 'int', trFn: (val) => options.GRID_SIZE[0] = val }, 
      { name: 'grid_height', type: 'int', trFn: (val) => options.GRID_SIZE[1] = val }, 
      { name: 'max_rounds', type: 'int', trFn: (val) => options.MAX_ROUNDS = val }, 
      { name: 'winning_length', type: 'int', trFn: (val) => options.WINNING_LEN = val }
    ]

    _.each(req.body, (val, key) => {
      let translation = _.find(translations, (trans) => (key === trans.name))

      if (translation) {
        translation.trFn(convert(val, translation.type))
      }
    })

    async.map(
      ['repo_A', 'repo_B'], 
    (playerOptName, next) => PlayerLoader(req.body[playerOptName], next), 
    (errors, players) => {
      console.log('errors, players:', errors, players)

      if (!errors && players && players.length) {
        let timeStart = Date.now()

        Play.play(players, options, (errors, results) => {
          
          let duration = (Date.now() - timeStart)

          console.log('play errors: ', errors)

          res.render('play/status', { options, errors, results })  
        })
      } else {
        res.render('error', { message: errors })
      }
    })
  })


  function convert(value, type) {
    let converted = value
    let conversions = {
      int: parseInt,
      flt: parseFloat
    }

    if (typeof conversions[type] === 'function') 
      converted = conversions[type](value)

    return converted

  }

}