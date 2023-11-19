const Url = require('../model/Url');

module.exports = {
  createUrl: async (req, res) => {
    let url = {
      url: req.body.url,
      slug: req.body.slug,
    };

    try {
      if (!req.body.url.startsWith('https://')) {
        res.send({ err: 'urls http protocol not available' });
      }
      const newUrl = await Url.create(url);
      res.render('home', { msg: 'url create', err: '' });
    } catch (err) {
      console.error(err.message, 'catch err...');
      res.render('home', { msg: '', err: 'url already in use' });
    }
  },

  // getUrl: (req, res) => {},

  getUrlBySlug: (req, res) => {
    const { slug } = req.params;
    Url.findOne({ slug }).then((url, err) => {
      if (err) {
        res.send({ err, msg: 'server error' });
      } else if (url) {
        return res.redirect(url.url);
      }
    });
  },

  updateUrl: (req, res) => {},

  deleteUrl: (req, res) => {},
};
