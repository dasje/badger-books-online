import { client } from "./client";

export async function createOnlineCheckout() {
  const checkout = await client.checkouts.create({
    amount: 2500,
    checkout_reference: "ORDER-1001",
    currency: "EUR",
    merchant_code: process.env.REACT_APP_SUMUP_MERCHANT_CODE ?? "",
    description: "Online payment via card widget",
  });

  console.log(checkout.id);
  // Return checkout.id to your webpage so the SumUp card widget can complete the payment.
}

// createOnlineCheckout().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });
