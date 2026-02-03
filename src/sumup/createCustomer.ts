import SumUp from "@sumup/sdk";
import { Customers } from "@sumup/sdk/dist/resources/customers";
import { client } from "./client";
import uuid4 from "uuid4";
import { CustomerType } from "./CustomerType";

export const createCustomer = async (customerData: CustomerType) => {
  let customer = new Customers(client);
  let customerAddress: SumUp.Customers.AddressLegacy = {
    city: customerData.city,
    country: customerData.country,
    line_1: customerData.addressLine1,
    line_2: customerData.addressLine2 ? customerData.addressLine2 : undefined,
    postal_code: customerData.postalCode,
    state: customerData.state ? customerData.state : undefined,
  };
  let customerDetails: SumUp.Customers.PersonalDetails = {
    first_name: customerData.first_name,
    last_name: customerData.last_name,
    email: customerData.email,
    phone: customerData.phone,
    address: customerAddress,
  };
  return customer.create({
    customer_id: uuid4(),
    personal_details: customerDetails,
  });
};
