const express = require('express');
const axios = require('axios'); // buat crud
const morgan = require('morgan');

const app = express();

app.use(express.json()); // buat parsing
app.use(morgan('dev'));  // buat log di terminal

const URL = 'https://dummyjson.com';


// ngepost
app.post('/products', async (req, res) => {
  try {
    const response = await axios.post(`${URL}/products/add`, req.body);
    res.status(201).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// get
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get(`${URL}/products`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// get pake id
app.get('/products/:id', async (req, res) => {
  try {
    const response = await axios.get(`${URL}/products/${req.params.id}`);
    if (!response.data) {
      return res.status(404).send();
    }
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// update
app.put('/products/:id', async (req, res) => {
  try {
    const response = await axios.put(`${URL}/products/${req.params.id}`, req.body);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// delete
app.delete('/tasks/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${req.params.id}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// const response = {};

// axios.get('https://dummyjson.com/products').then(
//   function(response){
//     console.log(response.data.products[0]);
//   }
// )



// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});