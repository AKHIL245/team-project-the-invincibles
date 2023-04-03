const { ObjectId } = require('mongodb');
const express = require("express");
//const connect = require("./configs/db");
const cors = require("cors");
const PORT = process.env.PORT;
//const PORT = 3000
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
  const collectionloghrs = db.collection("logHours");
  const collectionclasssched = db.collection("classSchedules");
  const collectioncheckInCheckOut = db.collection("checkInCheckOut");
  const collectionfreeTrail = db.collection("FreeTrail");
  //const collectionvisitorfreeTrail = db.collection("VisitorFreeTrail");

  app.get('/visitoranalytics', async (req, res) => {
    
    try {
      const results = await collectionfreeTrail.find({}).toArray();
      console.log(results);
      let attendance = {};


      for (let i = 0; i < results.length; i++) {
        let date = new Date(results[i].date);
        let now = new Date();
        if (date > now) {
          continue; // skip future dates
        }
        if (attendance[results[i].date]) {
          attendance[results[i].date]++;
        } else {
          attendance[results[i].date] = 1;
        }
      }
    console.log(attendance);
    res.json(attendance);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching visitor data');
    }
  });

  app.post("/freetrail", async (req, res) => {
  
    try {
      
      //let collection = await db.collection("individualClassSchedule");
      let newDocument = req.body;
      //newDocument.date = new Date();
      let result = await collectionfreeTrail.insertOne(newDocument);
      console.log(result);
      //res.send(result).status(204);
      res.json({ message: "added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "adding failed" });
    }
  });



  app.get("/users/:phone", async (req, res) => {
    const { phone } = req.params;
    const { password } = req.query;
    console.log(phone);
    console.log(password);
    var query = { phno: phone, password: password };
    let results = await collection.find(query).toArray();
    console.log(results);
    if (!results) return res.send("Not found").status(404);
    else return res.json(results);
  });
  

  app.get("/employee/:phone", async (req, res) => {
    //const { phone } = req.params.phone;
    const { phone } = req.params;
    const { password } = req.query;
    console.log(phone);
    console.log(password);
    var query = { phno: phone, password: password };
    let results = await collectionemp.find(query).toArray();
    console.log(results);
    if (!results) return res.send("Not found").status(404);
  else return res.json(results);

  });

  // app.get("/freetrail/:phone", async (req, res) => {
  //   //const { phone } = req.params.phone;
  //   const { phone } = req.params;
  //   const { password } = req.query;
  //   console.log(phone);
  //   console.log(password);
  //   var query = { phno: phone, password: password };
  //   let results = await collectionfreeTrail.find(query).toArray();
  //   console.log(results);
  //   if (!results) return res.send("Not found").status(404);
  // else return res.json(results);

  // });

  app.get('/homeclassSchedule', async (req, res) => {
    //const className = req.params.className;

    try {
      // Find all documents in the collection that match the class name
      let results = await collectionclasssched.find().toArray();
      console.log("result",results);

      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get("/classSchedule", async (req, res) => {
    //const { phone } = req.params.phone;
    console.log(req.query.date);
    console.log(req.query.city);
    var query = { 
      date: req.query.date, 
      city: req.query.city 
    };
    let results = await collectionclasssched.find(query).toArray();
    console.log(results);
    if (!results) return res.send("Not found").status(404);
  else return res.json(results);

  });

  app.post("/bookclass", async (req, res) => {
    //const { memberName, className, gymAddress, city, startTime, endTime, date } = req.body;
  
    try {
      
      //let collection = await db.collection("individualClassSchedule");
      let newDocument = req.body;
      //newDocument.date = new Date();
      let result = await collectionindsched.insertOne(newDocument);
      console.log(result);
      //res.send(result).status(204);
      res.json({ message: "Booking successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Booking failed" });
    }
  });


  app.post("/addmember", async (req, res) => {
    //const { membername, membershiptype, age, address, phno, validuntill, password } = req.body;
  
    try {
      
      //let collection = await db.collection("individualClassSchedule");
      let newDocument = req.body;
      //newDocument.date = new Date();
      let result = await collection.insertOne(newDocument);
      console.log(result);
      //res.send(result).status(204);
      res.json({ message: " successfully added Member" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "failed to add" });
    }
  });

  app.post("/addemployee", async (req, res) => {
    //const { membername, membershiptype, age, address, phno, validuntill, password } = req.body;
  
    try {
      
      //let collection = await db.collection("individualClassSchedule");
      let newDocument = req.body;
      //newDocument.date = new Date();
      let result = await collectionemp.insertOne(newDocument);
      console.log(result);
      //res.send(result).status(204);
      res.json({ message: " successfully added employee" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "failed to add" });
    }
  });

  app.post("/loghours", async (req, res) => {
    //const { memberName, className, gymAddress, city, startTime, endTime, date } = req.body;
  
    try {
      
      //let collection = await db.collection("individualClassSchedule");
      let newDocument1 = req.body;
      //newDocument.date = new Date();
      let result = await collectionloghrs.insertOne(newDocument1);
      console.log(result);
      //res.send(result).status(204);
      res.json({ message: "successfully logged hours" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Booking failed" });
    }
  });

  app.post("/addclasses", async (req, res) => {
    //const { memberName, className, gymAddress, city, startTime, endTime, date } = req.body;
  
    try {
      
      //let collection = await db.collection("individualClassSchedule");
      let newDocument1 = req.body;
      //newDocument.date = new Date();
      let result = await collectionclasssched.insertOne(newDocument1);
      console.log(result);
      //res.send(result).status(204);
      res.json({ message: "successfully added class" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "class adding failed" });
    }
  });

  app.get('/empdashboard', async (req, res) => {
    //const className = req.params.className;

    try {
      // Find all documents in the collection that match the class name
      let results = await collectionindsched.find().toArray();
      console.log("result",results);

      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/empdashboardhoursspent', async (req, res) => {
    //const className = req.params.className;

    try {
      // Find all documents in the collection that match the class name
      let results = await collectioncheckInCheckOut.find().toArray();
      console.log("result",results);

      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.post("/postcheckout", async (req, res) => {
    const _id = new ObjectId(req.body._id);
    console.log(_id);
    try {
      const checkout_time1 = new Date().getTime();
      const checkouttime = new Date(checkout_time1).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: false });
      const filter = { _id: _id }; // convert _id to ObjectId
      const update = { $set: { checkouttime: checkouttime } };
      const result = await collectioncheckInCheckOut.updateOne(filter, update);
      if (result.modifiedCount > 0) {
        console.log(result.modifiedCount + ' document updated successfully');
        res.status(200).json({ message: 'Document updated successfully' });
      } else {
        console.log('No document found to update');
        res.status(404).json({ message: 'No document found to update' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Checkout failed' });
    }
  });
  
  

  app.get("/individualschedule/:membername", async (req, res) => {
    //const { phone } = req.params.phone;
    var query = { membername: req.params.membername };
    let results = await collectionindsched.find(query).toArray();
    console.log(results);
    let finalresults=[];
    const cd = new Date();
      for(i=0;i<results.length;i++){
        //console.log("results",i,"     ",results[i].date);
        const date = new Date(results[i].date);
        if(date>=cd)
        finalresults.push(results[i]);
      }
    if (!finalresults) return res.send("Not found").status(404);
  else return res.json(finalresults);

  });

  app.get("/getcheckout", async (req, res) => {
    //const { phone } = req.params.phone;
    console.log(req);
    console.log(req.query.date);
    var query = { 
      date: req.query.date, 
      gymaddress: req.query.gymaddress 
    };
    let results = await collectioncheckInCheckOut.find(query).toArray();
    console.log(results);
    if (!results) return res.send("Not found").status(404);
  else return res.json(results);

  });

  

  

  // app.get("/activities/:membername", async (req, res) => {
  //   console.log(req.params.membername);
  //   //const { phone } = req.params.phone;
  //   //const { name } = req.params.membername;
  //   const { filter } = req.query;
  //   //console.log(name);
  //   console.log(filter);
  //   var query = { membername: req.params.membername };
  //   let results = await collectionloghrs.find(query).toArray();
  //   console.log(results);
  //   if (!results) return res.send("Not found").status(404);
  // else return res.json(results);

  // });
  app.get("/activities/:membername", async (req, res) => {
  const membername = req.params.membername;
  const filter = req.query.filter;
  let query = { membername: membername };
 // let results;
  //var query = { membername: req.params.membername };
  let results = await collectionloghrs.find(query).toArray();
  console.log("All results",results);
  // const pastWeektemp = new Date();
  // pastWeektemp.setDate(pastWeektemp.getDate() - 7);
  let finalresults=[];

  switch (filter) {
    case "pastweek":
      const pastWeek = new Date();
      pastWeek.setDate(pastWeek.getDate() - 7);
      for(i=0;i<results.length;i++){
        //console.log("results",i,"     ",results[i].date);
        const date = new Date(results[i].date);
        if(date>=pastWeek)
        finalresults.push(results[i]);
      }
      console.log("finalresults",finalresults)
      break;
    case "pastmonth":
      const pastMonth = new Date();
      pastMonth.setMonth(pastMonth.getMonth() - 1);
      for(i=0;i<results.length;i++){
        //console.log("results",i,"     ",results[i].date);
        const date = new Date(results[i].date);
        if(date>=pastMonth)
        finalresults.push(results[i]);
      }
      break;
    case "last90days":
      const last90Days = new Date();
      last90Days.setDate(last90Days.getDate() - 90);
      for(i=0;i<results.length;i++){
        //console.log("results",i,"     ",results[i].date);
        const date = new Date(results[i].date);
        if(date>=last90Days)
        finalresults.push(results[i]);
      }
      break;
    default:
      results = await collectionloghrs.find(query).toArray();
  }

  if (finalresults.length === 0) {
    return res.status(404).json({ message: "No activities found." });
  }
  return res.json(finalresults);
});


app.post('/checkin', async (req, res) => {
  try {
    const { phno, gymaddress } = req.body;
    console.log("phone",req.body.phno);
    console.log("gymaddress",req.body.gymaddress);
    
    const member = await collection.findOne({ phno });
    console.log("member",member);
    if (!member) {
      res.status(400).send('Invalid phone number');
      return;
    }

    const membername = member.membername;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // add 1 to month as it starts from 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const checkin_time1 = new Date().getTime();
    const checkintime = new Date(checkin_time1).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: false });
    let result = await collectioncheckInCheckOut.insertOne({ membername, phno, gymaddress, checkintime, date});
    console.log(result.insertedId);
    // const filter = { _id: result.insertedId };
    // const update = { $set: { checkouttime: '2:40' } };
    // collectioncheckInCheckOut.updateMany(filter, update, function(err, result) {
    //   if (err) throw err;
    //   console.log(result.modifiedCount + ' documents updated successfully');
    //   client.close();
    // });
    // console.log(result.insertedId);
    res.json({ message: "successfully added checkIn" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
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
