// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const cors = require('cors')
// require('dotenv').config();


// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors({
//     origin:['http://localhost:5173','https://book-store-frontend-amber.vercel.app'],
//     credentials:true,
// }))

// // routes
// const bookRoutes = require('./src/books/book.routes')
// const orderRoutes = require('./src/orders/order.routes')
// const userRoutes = require('./src/users/user.routes')
// const adminRoutes = require('./src/stats/admin.stats')
// app.use('/api/books',bookRoutes);
// app.use('/api/orders',orderRoutes);
// app.use('/api/auth',userRoutes);
// app.use('/api/admin',adminRoutes);

// async function main() {
//     await mongoose.connect(process.env.DB_URL);
//     app.use('/',(req,res)=>{
//         res.send("Book Store Server is Running");
//     })
// }
// main().then(()=> console.log("MongoDB connected successfully!!")).catch(err => console.log(err));

// app.listen(port,()=>{
//     console.log(`App listening on Port ${port}`)
// })

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

// Add CSP Middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://vercel.live; connect-src 'self';"
  );
  next();
});

// Enable JSON and CORS middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://book-store-frontend-amber.vercel.app'],
  credentials: true,
}));

// Routes
const bookRoutes = require('./src/books/book.routes');
const orderRoutes = require('./src/orders/order.routes');
const userRoutes = require('./src/users/user.routes');
const adminRoutes = require('./src/stats/admin.stats');

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

// Default Route
app.use('/', (req, res) => {
  res.send("Book Store Server is Running");
});

// MongoDB Connection
async function main() {
  await mongoose.connect(process.env.DB_URL);
}

main()
  .then(() => console.log("MongoDB connected successfully!!"))
  .catch(err => console.log(err));

// Start the Server
app.listen(port, () => {
  console.log(`App listening on Port ${port}`);
});
