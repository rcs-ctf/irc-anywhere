import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

await client.connect();

app.use(cors({
    methods: ['GET', 'POST'],
    origin: '*',
    credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    return res.send('Hello World!');
});

app.get('/register', async (req, res) => {
    const { username, password } = req.query;
    const db = client.db("encryptedge");
    const collection = db.collection("users");

    const result = await collection.insertOne({
        username,
        password,
    })

    return res.send(result);
});


app.post('/login', async (req, res) => {
    try {
        const query = req.body;

        if(!query.username || !query.password) {
            return res.status(400).send('Nice try');
        } else if (query.username == "admin" || query.password == "admin") {
            return res.status(400).send('Dont try to hack me');
        }

        const db = client.db("encryptedge");
        const collection = db.collection("users");

        const result = await collection.find(query).toArray();

        if(result.length == 0) {
            return res.status(400).send('Invalid Credentials');
        }
        else if(result.length == 1) {
            return res.send(result);
        } else if (result.length > 1) {
            for (const element of result) {
                delete element.token;
            }
            return res.status(200).send(result);
        } else {
            return res.status(400).send('Invalid Credentials');
        }
    }
    catch (error) {
        return res.send(error);
    }
});

app.get('/messages/:by', async (req, res) => {
    const { by } = req.params;
    const { token } = req.query;
    const db = client.db("encryptedge");
    const collection = db.collection("messages");

    const tokenUser = await db.collection("users").find({ token }).toArray();

    if(tokenUser.length == 0) {
        return res.status(400).send('Invalid Token');
    }
    else if(tokenUser.length == 1) {
        if(tokenUser[0].username != by) {
            return res.status(400).send('Invalid Token');
        }
        else {
            return res.send(await collection.find({ by }).toArray());
        }
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});