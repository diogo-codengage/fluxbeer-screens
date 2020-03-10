import axios from "axios";

const API_URL = "https://ql1ov5si1b.execute-api.us-east-1.amazonaws.com/dev";
// const API_URL = "http://localhost:3000"

export const picpayPaymentRequest = async ({
  tapId,
  productId,
  price,
  deviceTime
}) => {
  try {
    console.log("PICPAY PAYMENT REQUEST", {
      tapId,
      productId,
      price,
      deviceTime
    });
    const { data } = await axios({
      method: "post",
      url: `${API_URL}/picpay/request`,
      data: JSON.stringify({
        tapId,
        productId,
        value: price,
        deviceTime
      })
    });
    console.table(data);
    return data;
  } catch (e) {
    // @TODO Make a proper error handler
    console.error("PICPAY PAYMENT REQUEST", e.message);
    return null;
  }
};
