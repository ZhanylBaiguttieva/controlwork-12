import {FilterQuery, Types} from "mongoose";
import {Router} from "express";
import Art from "../models/Art";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import usersRouter from "./users";

const artsRouter = Router();

artsRouter.get('/',async (req, res,next) => {
    try {
        const arts = await Art.find().populate('user', 'displayName');
        return res.send(arts);
    } catch (e) {
        return next(e);
    }
});

artsRouter.post(
    '/',
    auth,
    permit( 'admin','user'),
    imagesUpload.single('image'),
    async(req: RequestWithUser, res, next ) => {
        try {
            const artData = {
                user: req.user?._id,
                name: req.body.name,
                image: req.file ? req.file.filename : null,
            };
            const art = new Art(artData);
            await art.save();
            return res.send(art);
        } catch (e) {
            next(e);
        }
    });


artsRouter.delete(
    '/:id',
    auth,
    permit('admin', 'user'),
    async (req: RequestWithUser, res, next) => {
        try {
            let _id: Types.ObjectId;
            try {
                _id = new Types.ObjectId(req.params.id);
            } catch {
                return res.status(404).send({ error: 'Wrong ObjectId!' });
            }
            const art = await Art.findById(_id);
            if (!art) {
                return res.status(404).send({ error: 'Art Not found!' });
            }
            const deletedOne = await Art.findByIdAndDelete(_id);

            res.send(deletedOne);
        } catch (e) {
            next(e);
        }
    },
);

export default artsRouter;