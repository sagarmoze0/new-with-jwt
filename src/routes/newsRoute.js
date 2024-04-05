const express = require('express');
const NewsItemModel = require('../models/NewsItem');
const jwtAuth=require('../middel/jwtAuth')
const router = express.Router();


router.post('/addnewsitem', jwtAuth, async function (req, res) {
  try {
    const newNewsItem = new NewsItemModel({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      postedBy: req.user.id 
    })
    console.log(newNewsItem)
    await newNewsItem.save();
    res.send('News added successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/getallnewsitems', async function (req, res) {
  try {
    const data = await NewsItemModel.find()
    res.send(data)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.post('/getnewsitembyid/:newsid', async function (req, res) {
  try {
    const data = await NewsItemModel.findOne({ _id: req.body.newsid })
    res.send(data)
  } catch (error) {
    res.status(400).send(error)
  }
})



router.delete('/delete/:newsItemId', jwtAuth, async (req, res) => {
  try {
    const newsItemId  = req.params.newsItemId;
    const userId = req.user.id;

    const newsItem = await NewsItemModel.findById(newsItemId);

    if (!newsItem) {
      return res.status(404).json({ error: 'News item not found' });
    }

    if (newsItem.postedBy.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this news item' });
    }

    await NewsItemModel.findByIdAndDelete(newsItemId);
    res.status(200).json({ message: 'News item deleted successfully' });
  } catch (error) {
    console.error('Error deleting news item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the news item' });
  }
});


router.get('/useritems', jwtAuth, async (req, res) => {
  try {
    console.log('User ID:', req.user.id)
    const newsItems = await NewsItemModel.find({ postedBy: req.user.id });
    console.log('News Items:', newsItems)
    res.json(newsItems);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.put('/update/:newsItemId',jwtAuth, async (req, res) => {
  try {
    const { newsItemId } = req.params;
    const { title, description, content } = req.body;
    const userId = req.user.id;

    const existingNewsItem = await NewsItemModel.findById(newsItemId);
    if (!existingNewsItem) {
      return res.status(404).json({ error: 'News item not found' });
    }
    if (existingNewsItem.postedBy.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this news item' });
    }
    
    existingNewsItem.title = title;
    existingNewsItem.description = description;
    existingNewsItem.content = content;

    const updatedNewsItem = await existingNewsItem.save();
    res.status(200).json(updatedNewsItem);
  } catch (error) {
    console.error('Error updating news item:', error);
    res.status(500).json({ error: 'An error occurred while updating the news item' });
  }
});


module.exports = router
