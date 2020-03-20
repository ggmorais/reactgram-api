import express from 'express';

import upload from './api/middlewares/upload';

import userController from './api/controllers/UserController';
import postController from './api/controllers/PostController';
import storyController from './api/controllers/StoryController';

const router = express.Router();

router.post('/user/create', userController.create);
router.get('/user/:username?', userController.get);
router.post('/user/follow', userController.follow);
router.post('/user/disfollow', userController.disfollow);
router.delete('/user/:username?', userController.delete);

router.post('/post/create', upload.single('image'), postController.create);
router.get('/post/:postId', postController.get);
router.delete('/post/:postId', postController.delete);

router.post('/story/create', storyController.create);
router.get('/story/:storyId', storyController.get);
router.delete('/story/:storyId', storyController.delete);

export default router;