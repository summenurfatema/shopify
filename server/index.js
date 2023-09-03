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