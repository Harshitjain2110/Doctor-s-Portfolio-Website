const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");

app.use(require("body-parser").json());
app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.sendFile("index.html",{ root: __dirname });
});

app.post("/create/orderId",async (req,res)=>{

    try {
        let { amount } = req.body;
    console.log("Create orderId request ",amount);

    //Step 1 Instantiate Razorpay
    var instance = new Razorpay({  
        key_id: 'rzp_test_hoOj0RMb9WdKoh',  
        key_secret: '58XZpvCu8BpWbD8JsjsAnqYs',
    });

    //Step 2 Create the order in the server
    var options = {
        amount: amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
    };

    let order = await instance.orders.create(options);
    res.status(201).json({
        success: true,
        order,
        amount,
    });
    }
    catch(e) {
        console.log("Failed in post request ",e);
    }
    

});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
