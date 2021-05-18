let express = require('express'),
  router = express.Router(),
  passport  = require('passport');
/*
//controllers 
var categoryController = require('../controllers/categoryController');
var userController = require('../controllers/userController');
var authenticationController = require('../controllers/authController.js');
var homeController = require('../controllers/homeController');
var blogController = require('../controllers/blogController');
/* authantication routes  

router.post('/signup', authenticationController.signup);
router.post('/signin', authenticationController.signin);
router.post('/verify_otp',authenticationController.verifyOtp);
router.post('/firebase_token',passport.authenticate('jwt', { session: false }),authenticationController.registerFirebaseToken);

/* authantication routes  */
/*

router.get('/category',passport.authenticate('jwt', { session: false }),categoryController.index);
router.post('/category',passport.authenticate('jwt', { session: false }),categoryController.update);

router.get('/user',passport.authenticate('jwt', { session: false }),userController.index);
router.post('/user',passport.authenticate('jwt', { session: false }),userController.update);

router.post('/blog',passport.authenticate('jwt', { session: false }),blogController.store);
router.get('/blog/:skip/:limit',passport.authenticate('jwt', { session: false }),blogController.index);
router.get('/blog/:blog_id',passport.authenticate('jwt', { session: false }),blogController.show);
router.put('/blog/:blog_id',passport.authenticate('jwt', { session: false }),blogController.update);

router.get('/notification/:user_id',passport.authenticate('jwt', { session: false }),homeController.notification);
router.put('/like/:blog_id',passport.authenticate('jwt', { session: false }),blogController.likeDislike);
router.put('/save/:blog_id',passport.authenticate('jwt', { session: false }),blogController.saveUnsave);
router.put('/comment/:blog_id',passport.authenticate('jwt', { session: false }),blogController.comment);
router.put('/comment/:blog_id/:parent_id',passport.authenticate('jwt', { session: false }),blogController.comment);
router.put('/view/:blog_id',blogController.view);
router.post('/search',blogController.search); */

module.exports = router; 

