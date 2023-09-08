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
        const cartCollection = client.db('shopify').collection('cartCollection')
        const orderCollection = client.db('shopify').collection('orderCollection')


 //Get product from product collection 
  app.get('/api/v1/get-all-product', async(req,res)=>{
            let query ={}
            const result = await productCollection.find(query).sort({_id:-1}).toArray()
            res.send(result)
        })
 //Get product from product collection (limit 8)
  app.get('/api/v1/get-product', async(req,res)=>{
            let query ={}
            const result = await productCollection.find(query).sort({_id:-1}).limit(8).toArray()
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
    app.post('/post-users', async (req, res) => {
      try {
        const { formData } = req.body;
        const email = formData.email;

        const existingUser = await userCollection.findOne({ email });
    
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists. Please signin !!' });
        } else {
          const result = await userCollection.insertOne(formData);
          res.status(201).json({ message: 'User created successfully'});
        }
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    //
     //
     app.post('/post-to-my-order',async (req,res)=>{
      const data = req.body;
    const result = await orderCollection.insertOne(data);
    res.send(result);

  })
     //
     app.post('/post-to-cart', async (req, res) => {
      const {data }= req.body;

        const existingCartItem = await cartCollection.findOne({
          productTitle: data.productTitle,
          email: data.email, // Assuming 'client' is the user's email
        });
    
        if (existingCartItem) {
          // Product already exists in the cart, send a response indicating that
          return res.status(400).json({ message: 'Product already in the cart' });
        } else {
          // Product doesn't exist in the cart, add it
          const result = await cartCollection.insertOne(data);
          res.send(result);
    
        }
     
    });
    
   
    //
    // app.post('/add-items', async (req, res) => {
    //   const {postData} = req.body;
      
    //   // Insert each item into the MongoDB collection
    
    //     const result = await orderCollection.insertOne(postData);
      
  
    //   res.send(result);
    // });
  //
 
    
  app.get('/get-my-order/:email', async (req, res) => {
    try {
      const email = req.params.email;
  
      const query = { email: email };
      const result = await orderCollection.find(query).sort({_id:-1}).toArray();
  
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'No orders found for the specified email' });
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/api/v1/get-all-order', async (req, res) => {
    try {

  
      const query = { };
      const result = await orderCollection.find(query).sort({_id:-1}).toArray();
  
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'No orders found' });
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
    
    
    
    
  // get cart item filtering by email
  app.get('/api/v1/get-cart-item/:email',async(req,res)=>{
    const email = req.params.email
    const query ={email:email}
    const result = await cartCollection.find(query).toArray()
    res.send(result)

  })
  // Create a POST route for adding items to an order with a unique order ID
app.post('/api/v1/add-product-as-order', async (req, res) => {
  const orderData = req.body;

  try {
    // Generate a unique order ID (5 digits)
    const orderId = generateOrderId();

    // Add the unique order ID to the order data
    orderData.orderId = orderId;

    // Insert the order data into your MongoDB collection
    const result = await orderCollection.insertOne(orderData);

    res.status(200).json({ message: "Items added successfully", orderId });
  } catch (error) {
    console.error("Error adding items to order:", error);
    res.status(500).json({ error: "Failed to add items to order" });
  }
});

// Function to generate a unique 5-digit order ID
const generateOrderId = () => {
  const existingOrderIds = []; // Store existing order IDs here
  const uniqueDigits = 5; // The number of digits in the order ID

  // Generate a random order ID until it's unique
  while (true) {
    let orderId = '';
    for (let i = 0; i < uniqueDigits; i++) {
      const digit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
      orderId += digit.toString();
    }

    if (!existingOrderIds.includes(orderId)) {
      existingOrderIds.push(orderId);
      return orderId;
    }
  }
};
app.post('/add-items', async (req, res) => {
  const orderData = req.body;

  try {
    // Generate a unique order ID (5 digits)
    const orderId = generateOrderId();

    // Add the unique order ID to the order data
    orderData.orderId = orderId;

    // Insert the order data into your MongoDB collection
    const result = await orderCollection.insertOne(orderData);

    res.status(200).json({ message: "Items added successfully", orderId });
  } catch (error) {
    console.error("Error adding items to order:", error);
    res.status(500).json({ error: "Failed to add items to order" });
  }
});
 //
 app.post('/api/v1/remove-items-from-cart', async (req, res) => {
  const { email } = req.body;

  try {
    // Remove items from cartCollection based on itemIds
    const result = await cartCollection.deleteMany({ email });

    res.status(200).json({ message: "Items removed from cart successfully" });
  } catch (error) {
    console.error("Error removing items from cart:", error);
    res.status(500).json({ message: "Failed to remove items from cart" });
  }
});
//
// delete omnilife course
app.delete("/api/v1/delete-cart-item/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await cartCollection.deleteOne(query);
  res.send(result);
   //
   app.get('/get-user/:status/:email',async(req,res)=>{
    const email = req.params.email
    const status = req.params.status
    const query ={email:email,status:status}
    const result = await userCollection.findOne(query)
    res.send(result)

  })
});

 // with status
 app.get('/get-user-by/:status/:email',async(req,res)=>{
  const email = req.params.email
  const status = req.params.status
  const query ={email:email,status:status}
  const result = await userCollection.findOne(query)
  res.send(result)

})
 // without status
 app.get('/get-user/:email',async(req,res)=>{
  const email = req.params.email
  const query ={email:email}
  const result = await userCollection.findOne(query)
  res.send(result)

})
//pack

 app.put("/api/v1/make-status-packed/:id", async (req, res) => {
  const id = req.params.id;
  const updatedStatus = req.body.updatedStatus;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { status: updatedStatus },
  };
  const result = await orderCollection.findOneAndUpdate(filter, updateDoc);
  res.send(result);
});
//pack

 app.put("/api/v1/make-status-delivered/:id", async (req, res) => {
  const id = req.params.id;
  const updatedStatus = req.body.updatedStatus;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { status: updatedStatus },
  };
  const result = await orderCollection.findOneAndUpdate(filter, updateDoc);
  res.send(result);
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