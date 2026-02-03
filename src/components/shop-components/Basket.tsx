import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { BasketItemType } from "./shop-types/BasketItemType";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  KeyboardDoubleArrowLeftOutlined,
  Label,
  RemoveCircleOutline,
  ShoppingCartCheckoutOutlined,
  TableRowsRounded,
} from "@mui/icons-material";
import { removeItemFromBasket } from "./funcs/updateBasket";
import { CustomerType } from "../../sumup/CustomerType";

interface BasketProps {
  basket: BasketItemType;
  updateBasket: Dispatch<SetStateAction<BasketItemType>>; // Added updateBasket prop
}

export default function Basket(props: BasketProps) {
  const { basket, updateBasket } = props;
  const [total, setTotal] = useState(0);

  const [showShipping, setShowShipping] = useState(false);

  // Calculate total price
  const calculateTotal = () => {
    let sum = 0;
    basket.forEach((item) => {
      sum += item.quantity * item.item.price;
    });
    setTotal(sum);
  };

  // Recalculate total whenever basket changes
  useEffect(() => {
    calculateTotal();
  }, [basket]);

  const [customerData, setCustomerData] = useState<CustomerType>({
    first_name: "",
    first_name_valid: false,
    last_name: "",
    last_name_valid: false,
    email: "",
    email_valid: false,
    phone: "",
    phone_valid: false,
    city: "",
    city_valid: false,
    country: "",
    country_valid: false,
    addressLine1: "",
    addressLine1_valid: false,
    postalCode: "",
    postalCode_valid: false,
    addressLine2: "",
    addressLine2_valid: false,
    state: "",
    state_valid: false,
  });

  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Basket
      </Typography>
      <Divider sx={{ my: 4 }} />
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            float: "right",
            mb: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="h5">Total: €{total}</Typography>
          {!showShipping ? (
            <Button onClick={() => setShowShipping(true)}>
              <ShoppingCartCheckoutOutlined sx={{ fontSize: 40, ml: 2 }} />
            </Button>
          ) : (
            <Button onClick={() => setShowShipping(false)}>
              <KeyboardDoubleArrowLeftOutlined sx={{ fontSize: 40, ml: 2 }} />
            </Button>
          )}
        </Box>
        {showShipping ? (
          <Grid container spacing={2}>
            <Grid size={12} sx={{ textAlign: "left", mb: 2 }}>
              <Typography variant="h4" gutterBottom>
                Enter name and address for shipping:
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "left", mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Name:
              </Typography>
              <Box
                sx={{
                  m: 2,
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                }}
              >
                <TextField
                  required
                  id="first-name"
                  label="Required"
                  placeholder="First name"
                  value={customerData.first_name}
                  onChange={(e) => {
                    if (e.target.value.length === 0) {
                      setCustomerData({
                        ...customerData,
                        first_name: e.target.value,
                        first_name_valid: false,
                      });
                    } else {
                      setCustomerData({
                        ...customerData,
                        first_name: e.target.value,
                        first_name_valid: true,
                      });
                    }
                  }}
                  error={customerData.first_name_valid === false}
                />
                <TextField
                  required
                  id="family-name"
                  label="Required"
                  placeholder="Family name"
                  value={customerData.last_name}
                  onChange={(e) => {
                    if (e.target.value.length === 0) {
                      setCustomerData({
                        ...customerData,
                        last_name: e.target.value,
                        last_name_valid: false,
                      });
                    } else {
                      setCustomerData({
                        ...customerData,
                        last_name: e.target.value,
                        last_name_valid: true,
                      });
                    }
                  }}
                  error={customerData.last_name_valid === false}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                Address:
              </Typography>
              <Box
                sx={{
                  m: 2,
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                }}
              >
                <TextField
                  required
                  id="address-line-1"
                  label="Required"
                  placeholder="Address line 1"
                  value={customerData.addressLine1}
                  onChange={(e) => {
                    if (e.target.value.length < 5) {
                      setCustomerData({
                        ...customerData,
                        addressLine1: e.target.value,
                        addressLine1_valid: false,
                      });
                    } else {
                      setCustomerData({
                        ...customerData,
                        addressLine1: e.target.value,
                        addressLine1_valid: true,
                      });
                    }
                  }}
                  error={customerData.addressLine1_valid === false}
                />
                <TextField
                  id="address-line-2"
                  placeholder="Address line 2"
                  value={customerData.addressLine2}
                  onChange={(e) => {
                    if (e.target.value.length < 5) {
                      setCustomerData({
                        ...customerData,
                        addressLine2: e.target.value,
                        addressLine2_valid: false,
                      });
                    } else {
                      setCustomerData({
                        ...customerData,
                        addressLine2: e.target.value,
                        addressLine2_valid: true,
                      });
                    }
                  }}
                />
                <TextField
                  required
                  id="city"
                  label="Required"
                  placeholder="City"
                  value={customerData.city}
                  onChange={(e) => {
                    if (e.target.value.length < 5) {
                      setCustomerData({
                        ...customerData,
                        city: e.target.value,
                        city_valid: false,
                      });
                    } else {
                      setCustomerData({
                        ...customerData,
                        city: e.target.value,
                        city_valid: true,
                      });
                    }
                  }}
                />
                <TextField
                  id="state"
                  placeholder="State"
                  value={customerData.state}
                  onChange={(e) => {
                    if (e.target.value.length < 5) {
                      setCustomerData({
                        ...customerData,
                        state: e.target.value,
                        state_valid: false,
                      });
                    } else {
                      setCustomerData({
                        ...customerData,
                        state: e.target.value,
                        state_valid: true,
                      });
                    }
                  }}
                />
                <InputLabel id="country-select-label">Country</InputLabel>
                <Select
                  required
                  labelId="country-select-label"
                  id="country-select"
                  value={customerData.country}
                  label="Country"
                  onChange={(event) =>
                    setCustomerData({
                      ...customerData,
                      country: event.target.value as string,
                      country_valid: true,
                    })
                  }
                >
                  <MenuItem value={"United Kingdom"}>United Kingdom</MenuItem>
                  <MenuItem value={"The Netherlands"}>The Netherlands</MenuItem>
                </Select>
                <Typography variant="caption" sx={{ mt: 1 }}>
                  (More countries coming soon. If your country is not listed,
                  please contact us directly to arrange shipping.)
                </Typography>
                <TextField
                  required
                  id="postal-code"
                  label="Required"
                  placeholder="Postal code"
                  value={customerData.postalCode}
                  onChange={(e) => {
                    if (e.target.value.length < 3) {
                      setCustomerData({
                        ...customerData,
                        postalCode: e.target.value,
                        postalCode_valid: false,
                      });
                    } else {
                      setCustomerData({
                        ...customerData,
                        postalCode: e.target.value,
                        postalCode_valid: true,
                      });
                    }
                  }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                Contact:
              </Typography>
              <Box
                sx={{
                  m: 2,
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                }}
              >
                <TextField
                  required
                  id="email"
                  label="Required"
                  placeholder="Email"
                  value={customerData.email}
                  onChange={(e) => {
                    if (
                      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        e.target.value,
                      )
                    ) {
                      setCustomerData({
                        ...customerData,
                        email: e.target.value,
                        email_valid: false,
                      });
                    } else {
                      setCustomerData({
                        ...customerData,
                        email: e.target.value,
                        email_valid: true,
                      });
                    }
                  }}
                />
                <TextField
                  required
                  id="phone number"
                  label="Required"
                  placeholder="Phone number"
                  value={customerData.phone}
                  onChange={(e) => {
                    if (/^[0-9]{6,}$/.test(e.target.value) === false) {
                      setCustomerData({
                        ...customerData,
                        phone: e.target.value,
                        phone_valid: false,
                      });
                    } else {
                      setCustomerData({
                        ...customerData,
                        phone: e.target.value,
                        phone_valid: true,
                      });
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "left", mb: 2 }}>
              <Grid size={12} sx={{ textAlign: "left", mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Shipping to:
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "left", mb: 2 }}>
                <Typography gutterBottom>
                  {customerData.first_name_valid &&
                    customerData.last_name_valid &&
                    `${customerData.first_name} ${customerData.last_name}`}
                </Typography>
                <Typography gutterBottom>
                  {customerData.addressLine1_valid && customerData.addressLine1}
                </Typography>
                {customerData.addressLine2 &&
                  customerData.addressLine2_valid && (
                    <Typography gutterBottom>
                      {customerData.addressLine2}
                    </Typography>
                  )}
                <Typography gutterBottom>
                  {customerData.city_valid && customerData.city}
                  {customerData.state &&
                    customerData.state_valid &&
                    `, ${customerData.state}`}
                </Typography>
                <Typography gutterBottom>
                  {customerData.postalCode_valid && customerData.postalCode}
                </Typography>
                <Typography gutterBottom>{customerData.country}</Typography>
                <Grid size={12} sx={{ textAlign: "left", mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Contact:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ mb: 2 }}>
                  <Typography
                    gutterBottom
                  >{`Email: ${customerData.email_valid && customerData.email}`}</Typography>
                  <Typography gutterBottom>
                    {`Contact number: ${customerData.phone_valid && customerData.phone}`}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h5" gutterBottom>
                If the above information is correct, please proceed to payment:
              </Typography>
              <Button
                variant="contained"
                disabled={
                  !customerData.first_name_valid ||
                  !customerData.last_name_valid ||
                  !customerData.addressLine1_valid ||
                  !customerData.city_valid ||
                  !customerData.state_valid ||
                  !customerData.postalCode_valid ||
                  !customerData.email_valid ||
                  !customerData.phone_valid
                }
              >
                Proceed to Payment
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ textAlign: "left", mb: 2 }}>
            <Typography variant="body1">
              (Shipping and taxes calculated at checkout)
            </Typography>

            <TableContainer component={Paper}>
              <Table
                // sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                {/* <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead> */}
                <TableBody>
                  {basket.map((row) => (
                    <TableRow
                      key={row.item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.item.title}
                      </TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">
                        {row.item.currency}
                        {row.item.price}
                      </TableCell>

                      {/* <TableCell align="right">
                      {row.item.currency}
                      {row.quantity * row.item.price}
                    </TableCell> */}
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            updateBasket(
                              removeItemFromBasket(basket, row.item),
                            );
                          }}
                          sx={{ pr: 4 }}
                        >
                          <RemoveCircleOutline />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Container>
    </Box>
  );
}
