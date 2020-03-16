import express from 'express';

import userController from './api/controllers/UserController';
import postController from './api/controllers/PostController';
import storyController from './api/controllers/StoryController';

const router = express.Router();

router.post('/user/create', userController.create);
router.get('/user/:username?', userController.get);
router.delete('/user:userId', userController.delete);

router.post('/post/create', postController.create);
router.get('/post/:postId', postController.get);
router.delete('/post:postId', postController.delete);

router.post('/story/create', storyController.create);
router.get('/story/:storyId', storyController.get);
router.delete('/story:storyId', storyController.delete);

export default router;