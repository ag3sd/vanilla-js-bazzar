import { Router } from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// eslint-disable-next-line no-undef
const categories = require('../server/categories/index.get.json');
const offers = require('../server/banners/index.get.json');
const products = require('../server/products/index.get.json');
const addtocart = require('../server/addToCart/index.post.json');
var router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});
router.get('/categories', (req, res) => {
  res.json(categories);
});
router.get('/offers', (req, res) => {
  res.json(offers);
});
router.get('/products', (req, res) => {
  res.json(products);
});

router.post('/addtocart', (req, res) => {
  res.json(addtocart)
})

export default router;
