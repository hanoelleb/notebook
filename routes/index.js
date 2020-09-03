var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/AuthController');
var NoteController = require('../controllers/NoteController');

var passport = require('passport');

require('../passport');

router.get('/', function (req, res, next) {
    res.json("hello");
});

//handle authentication
router.post('/sign-in', AuthController.signIn);

router.post('/sign-up', AuthController.signUp);

//notes
router.get('/:id/notes',
    passport.authenticate('jwt', {session: false}),
    NoteController.notes);

router.post('/:id/notes/add', 
    passport.authenticate('jwt', {session: false}),
    NoteController.create);

router.post('/:id/notes/:nid/update', 
    passport.authenticate('jwt', {session: false}),
    NoteController.update);

router.post('/:id/notes/:nid/remove', 
    passport.authenticate('jwt', {session: false}),
    NoteController.remove);

module.exports = router;
