import {Router} from "express";
import mongoose, {Types} from "mongoose";
import User from "../models/User";
import {imagesUpload} from "../multer";
import {OAuth2Client} from "google-auth-library";
import config from "../config";

const usersRouter = Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.get('/:id', async (req,res,next) => {
   try {
       let _id: Types.ObjectId;
       try {
           _id = new Types.ObjectId(req.params.id);
       } catch {
           return res.status(404).send({ error: 'Wrong ObjectId!' });
       }
       const user = await User.findById(_id);
       
       res.send(user);
   } catch(e) {
       next(e);
   }
});
usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file ? req.file.filename : null,
        };
        const user = new User(userData);
        user.generateToken();
        await user.save();
        res.send({ message: 'ok!', user });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(422).send({ error: 'Email not found' });
        }

        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            return res.status(422).send({ error: 'Password is wrong' });
        }
        user.generateToken();
        await user.save();

        return res.send({ message: 'Email and password are correct!', user });
    } catch (e) {
        next(e);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');
        const successMessage = { message: 'Success!' };

        if (!headerValue) {
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
    } catch (e) {
        next(e);
    }
});

usersRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({ error: 'Google login error!' });
        }
        const email = payload['email'];
        const id = payload['sub'];
        const displayName = payload['name'];
        const avatar = payload['picture'];

        if (!email) {
            return res.status(400).send({ error: 'Email is required' });
        }

        let user = await User.findOne({ googleID: id });
        if (!user) {
            user = new User({
                email,
                password: crypto.randomUUID(),
                googleID: id,
                displayName,
                avatar,
            });
        }

        user.generateToken();

        await user.save();

        return res.send({ message: 'Login with Google successful', user });
    } catch (e) {
        return next(e);
    }
});

export default usersRouter;