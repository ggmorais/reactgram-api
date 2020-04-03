import express from 'express';

import upload from './api/middlewares/upload';

import userController from './api/controllers/UserController';
import postController from './api/controllers/PostController';
import storyController from './api/controllers/StoryController';
import sessionController from './api/controllers/SessionController';

const router = express.Router();

router.post('/users/create', userController.create);
router.get('/users/:username?', userController.get);
router.post('/users/follow', userController.follow);
router.post('/users/disfollow', userController.disfollow);
router.delete('/users/:username?', userController.delete);
router.post('/users/mark', userController.mark);
router.post('/users/unmark', userController.unMark);

router.post('/posts/create', upload.single('image'), postController.create);
router.get('/posts/:username?', postController.get);
router.delete('/posts/:postId', postController.delete);
router.post('/posts/like', postController.like);
router.post('/posts/dislike', postController.disLike);
router.get('/posts/following/:username', postController.list);

router.post('/stories/create', upload.single('image'), storyController.create);
router.get('/stories/:storyId?', storyController.get);
router.delete('/stories/:storyId', storyController.delete);

router.post('/session', sessionController.create);

export default router;