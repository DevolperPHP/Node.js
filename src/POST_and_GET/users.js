var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/info/:id' , (req , res , next)=> {
  console.log(req.params.id)
  res.render('info' , {id: req.params.id})
})

router.post('/info' , (req , res , next)=> {
  res.redirect('info/' +req.body.id)
})

module.exports = router;
