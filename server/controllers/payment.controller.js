const Razorpay = require("razorpay");
const crypto = require("crypto");
require("../config/config.env");

exports.checkout = async (req, res) => {
  const instance = new Razorpay({
    key_id: RAZORPAY_API_KEY,
    key_secret: RAZORPAY_API_SECRET,
  });
  const options = {
    amount: Number(req.body.amount), // amount in the smallest currency unit
    currency: "INR",
  };

  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
};

exports.verification = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  // console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

  // Construct the string to verify
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_API_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (razorpay_signature === expectedSignature) {
    // Payment verification is valid
    res.status(200).send("Payment verification is valid");
  } else {
    // Payment verification is not valid
    res.status(400).send("Payment verification is not valid");
  }
};
