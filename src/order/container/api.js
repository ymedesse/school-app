import { API } from "../../config";
export const submitInstallmentPaymentApi = async (
  userId,
  token,
  orderId,
  payment
) => {
  try {
    const response = await fetch(
      `${API}/order/submit-installment/${orderId}/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payment),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const submitCancelOrderApi = async (userId, token, orderId, payment) => {
  try {
    const response = await fetch(`${API}/order/cancel/${orderId}/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
