var Note = require('../models/note');

exports.notes = function (req, res, next) {

    const user = req.params.id;

    Note.find({user: user})
	.exec( function(err, notes) {
	   if (err) return next(err);
           return res.json({notes: notes});
	});
}

exports.create = function (req, res, next) {
    const user = req.params.id;

    var note = new Note(
      {
         user: user,
	 topic: req.body.topic,
	 content: req.body.content
      }
    );

    note.save( function(err, data) {
        if (err) return next(err);
	return res.json({note: data});
    });
}

exports.update = function (req, res, next) {
    const user = req.params.id;
    var id = req.body.id;
    var note = new Note(
      {
        user: user,
	_id: id,
	topic: req.body.topic,
        content: req.body.content
      }
    );

    Note.findByIdAndUpdate(id, note, {},
        function(err, data) {
            if (err) return next(err);
            res.json({note: note});
        }
    )
}

exports.remove = function (req, res, next) {
    
    var id = req.body.id;

    Note.findByIdAndDelete(id, function deleteNote(err) {
        if (err) return next(err);
    })
}
