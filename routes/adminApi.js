let express = require('express'),
  router = express.Router(),
  passport  = require('passport');
  var rnp  = require('../middleware/rnp');

//middlewares 
var rnp  = require('../middleware/rnp');

//controllers
var AdminUserController = require('../controllers/Admin/userController'),
 authenticationController = require('../controllers/Admin/authController'),
 roleAndPermissionController = require('../controllers/Admin/roleAndPermissionController'),
 planController = require('../controllers/Admin/planController'),
 homeController = require('../controllers/Admin/homeController'),
 eventController  = require('../controllers/Admin/eventController')
//lets create app middleware arr
let middleware = [passport.authenticate('jwt', { session: false }),rnp.only('Admin')];

//authantication routes
router.post('/signin', authenticationController.signin);

//category
router.get('/category',middleware,homeController.category);

router.get('/user',middleware,AdminUserController.index);
router.get('/user/:user_id',middleware,AdminUserController.show); 
router.put('/user/:user_id',middleware,AdminUserController.unableDisable);

//events 
router.get('/event/:page/:limit',middleware,eventController.index);
router.get('/event/:event_id',middleware,eventController.show);
router.put('/event/:event_id',middleware,eventController.update);

//plans
router.get('/plan',middleware,planController.index);
router.get('/plan/:plan_id',middleware,planController.show);
router.put('/plan/:plan_id',middleware,planController.update);
router.post('/plan',middleware,planController.add);
//roles and permission
router.get('/roles',middleware,roleAndPermissionController.roles);
router.get('/permission',middleware,roleAndPermissionController.permission);
//router.post('/permission',roleAndPermissionController.addPermission);
module.exports = router; 