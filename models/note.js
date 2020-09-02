var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema (
  {
     user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
     topic: {type: String, required: true },
     content: { type: String, required: true }
  }
);

module.exports = mongoose.model('Note', NoteSchema);
