var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/AuthController');
var NoteController = require('../controllers/NoteController');

router.get('/', function (req, res, next) {
    res.json("hello");
});

//handle authentication
router.post('/sign-in', AuthController.signIn);

router.post('/sign-up', AuthController.signUp);

//notes
router.post('/:id/notes/add', NoteController.create);

router.post('/:id/notes/:nid/update', NoteController.update);

router.post('/:id/notes/:nid/remove', NoteController.remove);

module.exports = router;
