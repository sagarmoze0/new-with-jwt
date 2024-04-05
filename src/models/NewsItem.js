const mongoose = require('mongoose');


const newsItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: '' },
    description: { type: String, required: '' },
    content: { type: String, required: '' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  },
  {
    timestamps: true,
  }
);
const NewsItemModel = mongoose.model('newsitems', newsItemSchema);


module.exports = NewsItemModel;
