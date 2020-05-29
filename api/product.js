const productController = require('./controllers/productController');

class productMiddleware {
  
  static fetchAll() {
    productController.fetchAll()
  }
} 