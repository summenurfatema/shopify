const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6v5oj5d.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {

    try {
        console.log('START');
        const productCollection = client.db('shopify').collection('productCollection')
        const userCollection = client.db('shopify').collection('userCollection')
        app.get('/get-data', async(req,res)=>{
            let query ={}
            const result = await productCollection.find(query).toArray()
            res.send(result)
        })
        
      //
      app.get('/get-data-by/:id', async(req,res)=>{
        const id = req.params.id
        const query ={_id: new ObjectId(id)}
        const result = await productCollection.findOne(query)
        res.send(result)
    })  
    //
    app.post('/upload-product',async (req,res)=>{
        const data = req.body;
      const result = await productCollection.insertOne(data);
      res.send(result);

    })
    //
    app.put('/update-product/:id',async(req,res)=>{
        const id = req.params.id
      
        const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          data: data.data,
        },
      };

      const result = await productCollection.findOneAndUpdate(
        filter,
        updateDoc,
        option
      );
      res.send(result);
    })
    //
    app.get('/get-user/:email',async(req,res)=>{
      const email = req.params.email
      const query ={email:email}
      const result = await userCollection.findOne(query)
      res.send(result)

    })
    //
    app.post('/post-users', async (req, res) => {
      try {
        const { formData } = req.body;
        const email = formData.email;

        const existingUser = await userCollection.findOne({ email });
    
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists. Please signin !!' });
        } else {
          const result = await userCollection.insertOne(formData);
          res.status(201).json({ message: 'User created successfully', user: result.ops[0] });
        }
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
 
    }
    finally {
       
    }
}
run().catch(err => console.error(err))



app.get('/', (req, res) => {
    res.send('Porject Server is running!!')
})
app.listen(port, () => {
    console.log(`Project server is running on ${port}`)
})