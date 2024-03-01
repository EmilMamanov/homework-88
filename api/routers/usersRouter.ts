import express from 'express';
import User from '../models/userModel';

import { Error } from 'mongoose';
import auth, {RequestWithUser} from "../auth";


const usersRouter = express.Router();


usersRouter.post('/', async (req, res, next) => {

    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        user.generateToken();
        await user.save();
        return res.send({message: 'ok!', user});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(422).send(error);
        }

        next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {


        const user = await User.findOne({username: req.body.username});

        if (!user) {
            return res.status(422).send({error: 'Username not found'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(422).send({error: 'Password is wrong'});
        }

        user.generateToken();
        await user.save();

        return res.send({message: 'Username and password correct!', user});
    } catch (e) {
        next(e);
    }

});

usersRouter.get('/secret', auth, async (req: RequestWithUser, res, next) => {
    try {
        return res.send({message: 'This is a secret message', username: req.user?.username});
    } catch (e) {
        next (e);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
   try {
       const headerValue = req.get('Authorization');
       const successMessage = {message: 'Success!'};

       if(!headerValue) {
           return res.send(successMessage);
       }

       const [_bearer, token] = headerValue.split(' ');

       if (!token) {
           return res.send(successMessage);
       }

       const user = await User.findOne({ token });

       if (!user) {
           return res.send(successMessage);
       }

       user.generateToken();
       await user.save();
       return res.send(successMessage);

   }  catch (e) {
       return next(e);
   }
});



export default usersRouter;