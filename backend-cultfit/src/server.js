const express = require("express");
//const connect = require("./configs/db");
const cors = require("cors");
//const PORT = process.env.PORT;
const PORT = 3000
const app = express();
app.use(cors());
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://AkhilThaneti:akhilthaneti@cluster0.fellce2.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error(err);
    return;
  }

  const db = client.db("CMPE202");
  const collection = db.collection("Members");
  const collectionemp = db.collection("Employees");
  const collectionindsched = db.collection("individualClassSchedule");
  app.get("/users/:phone", async (req, res) => {
    const { phone } = req.params.phone;
    var query = { phno: req.params.phone };
    let results = await collection.find(query).toArray();
    console.log(results);
    if (!results) return res.send("Not found").status(404);
  else return res.json(results);

  });

  app.get("/employee/:phone", async (req, res) => {
    //const { phone } = req.params.phone;
    var query = { phno: req.params.phone };
    let results = await collectionemp.find(query).toArray();
    console.log(results);
    if (!results) return res.send("Not found").status(404);
  else return res.json(results);

  });

  app.get("/individualschedule/:membername", async (req, res) => {
    //const { phone } = req.params.phone;
    var query = { membername: req.params.membername };
    let results = await collectionindsched.find(query).toArray();
    console.log(results);
    if (!results) return res.send("Not found").status(404);
  else return res.json(results);

  });

  // Define other routes and handlers here

  app.listen(PORT, () => {
    console.log("Server started on port 3000");
  });
});


// const userController = require("./controllers/user.controller");

// const brandController = require("./controllers/brand.controller");

// const sectionController = require("./controllers/section.controller");

// const categoryController = require("./controllers/categories.controller");

// const productController = require("./controllers/product.controller");

// app.get("/", async (req, res) => {
//   try {
//     return res.send("Hello Welcome ");
//   } catch (error) {
//     console.log(error);
//     return res.send(error);
//   }
// });

// app.use("/users", userController);

// app.use("/brand", brandController);

// app.use("/section", sectionController);

// app.use("/category", categoryController);

// app.use("/product", productController);

// app.listen(PORT, async () => {
//   try {
//     await connect();
//     console.log("listening at 8080");
//     console.log(process.env.PORT);
//   } catch (err) {
//     console.log(err);
//   }
// });
