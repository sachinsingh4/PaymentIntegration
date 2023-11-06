import { VStack, Image, Text, Button } from "@chakra-ui/react";
import React from "react";
import axios from "axios";
export default function Card({ amount, img }) {
  const handleClick = async () => {
    const response = await axios.post("http://localhost:5000/api/checkout", {
      amount,
    });
    const options = {
      key: "Your_key", // Enter the Key ID generated from the Dashboard
      amount: response.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Sachin",
      description: "Test Transaction",
      image:
        "https://media.licdn.com/dms/image/D4D03AQFC-JYSU_Uhag/profile-displayphoto-shrink_200_200/0/1665776397118?e=1704326400&v=beta&t=TGuuKEI7uCmSm9Ji1geeQbsQUw2oujCxcaihHNg_JEs",
      order_id: response.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:5000/api/paymentverification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rozar = new window.Razorpay(options);
    rozar.open();
  };
  return (
    <div>
      <VStack>
        <Image src={img} />
        <Text>{amount}</Text>
        <Button onClick={handleClick}>Buy Now</Button>
      </VStack>
    </div>
  );
}
