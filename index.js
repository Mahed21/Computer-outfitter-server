const express = require('express')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const cors=require('cors');
const ObjectId=require('mongodb').ObjectId;
const app = express();
const port = 5000
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pszjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      const database = client.db("computer_outfit");
      const userCollection = database.collection("services");
      const userCollection1 = database.collection("laptop");
      console.log('connected');
      app.get('/services',async (req,res)=>{
          const cursor=userCollection.find({});
          const user=await cursor.toArray();
          res.send(user);

      })
      app.get('/services/laptop',async (req,res)=>{
        const cursor=userCollection1.find({});
        const user=await cursor.toArray();
        res.send(user);
        console.log('hi');
     })
    
    
    } finally {
      //await client.close();
    }
  }
  run().catch(console.dir);
  
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


//${process.env.DB_USER}
//${process.env.DB_PASS}