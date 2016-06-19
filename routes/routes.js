'use strict'

module.exports = function(app) {
  var grid_sizes = [30, 50, 100]

  app.get('/setup', (req, res) => {  
    res.render('play/setup', { grid_sizes })
  })

  app.post('/play', (req, res) => {
    console.log('req.body:', req.body)
    res.render('play/status', { options: req.body })
  })

}