const News = require("../models/News");

// Add notice
exports.addNews = async (req, res) => {
  const { title, expiryDate } = req.body;
  const news = await News.create({ title, expiryDate });
  res.json(news);
};

// Student-visible notices (auto-expiry)
exports.getNews = async (req, res) => {
  const today = new Date();
  const news = await News.find({
    isActive: true,
    expiryDate: { $gte: today }
  }).sort({ createdAt: -1 });

  res.json(news);
};

// Admin toggle show/hide
exports.toggleNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  news.isActive = !news.isActive;
  await news.save();
  res.json(news);
};
