import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Art from "./models/Art";


const dropCollection = async (
    db: mongoose.Connection,
    collectionName: string,
) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};
const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['users'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1, user2] = await User.create(
        {
            email: 'Zhanyl@gallery.local',
            displayName: 'Zhanyl',
            password: '123',
            token: crypto.randomUUID(),
            role: 'admin',
            avatar: 'fixtures/avatar.png',
        },
        {
            email: 'TestUser@gallery.local',
            displayName: 'TestUser',
            password: '000',
            token: crypto.randomUUID(),
            role: 'user',
            avatar: "fixtures/avatar.png"
        },
    );
    await Art.create(
        {
            user: user1,
            name: 'Magic forest',
            photo: "fixtures/forest.png",
        },
        {
            user: user2,
            name: 'Lion',
            photo: "fixtures/lion.png",
        }
    )


    await db.close();
};

void run();