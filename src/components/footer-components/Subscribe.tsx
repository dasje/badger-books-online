import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Alert, Modal } from "@mui/material";
import UpcycleIcon from "../../core-components/UpcycleIcon";
import { subsmitSubscription } from "../../db/funcs/submitSubscription";
import CheckIcon from "@mui/icons-material/Check";

export default function Subscribe() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [subscribeEmail, setSubscribeEmail] = React.useState("");
  const [contactName, setContactName] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSubscribe = async () => {
    try {
      // TODO: Add validation here
      const submitted = await subsmitSubscription(subscribeEmail, contactName);
      if (submitted) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
      <UpcycleIcon />
      <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        Join the newsletter
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Subscribe for occasional updates. No spams ever!
      </Typography>
      <InputLabel htmlFor="email-newsletter" sx={{ color: "black" }}>
        Email
      </InputLabel>
      <Stack direction="row" spacing={1} useFlexGap>
        <TextField
          id="email-newsletter"
          hiddenLabel
          size="small"
          //   variant="outlined"
          fullWidth
          aria-label="Enter your email address"
          slotProps={{
            htmlInput: {
              autoComplete: "off",
              "aria-label": "Enter your email address",
            },
          }}
          sx={{ width: "250px", color: "accent" }}
          onChange={(e) => setSubscribeEmail(e.target.value)}
        />
        <Button
          variant="text"
          size="small"
          sx={{ flexShrink: 0, color: "accent" }}
          onClick={handleOpen}
        >
          Subscribe
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            {!success ? (
              <>
                {" "}
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Complete Subscription
                </Typography>
                <InputLabel
                  htmlFor="email-newsletter"
                  sx={{ color: "black", mt: 2 }}
                >
                  Email
                </InputLabel>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <TextField
                    id="email-newsletter"
                    hiddenLabel
                    size="small"
                    //   variant="outlined"
                    fullWidth
                    aria-label="Enter your email address"
                    slotProps={{
                      htmlInput: {
                        autoComplete: "off",
                        "aria-label": "Enter your email address",
                      },
                    }}
                    sx={{ width: "250px", color: "accent" }}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    defaultValue={subscribeEmail}
                  />
                </Typography>
                <InputLabel
                  htmlFor="email-newsletter"
                  sx={{ color: "black", mt: 2 }}
                >
                  Contact name
                </InputLabel>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <TextField
                    id="email-name"
                    hiddenLabel
                    size="small"
                    //   variant="outlined"
                    fullWidth
                    aria-label="Enter the name you wish to be known by"
                    slotProps={{
                      htmlInput: {
                        autoComplete: "off",
                        "aria-label": "Enter your name",
                      },
                    }}
                    sx={{ width: "250px", color: "accent" }}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </Typography>
                <Typography id="modal-modal-conditions" sx={{ mt: 2 }}>
                  By subscribing, you agree to receive occasional emails.
                  Subscription can be cancelled by emailing Badger Books, or by
                  clicking the unsubscribe link in any email.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 2, color: "accent" }}
                  onClick={async () => handleSubscribe()}
                >
                  Confirm Subscription
                </Button>
              </>
            ) : (
              <>
                <Alert
                  icon={<CheckIcon fontSize="inherit" />}
                  severity="success"
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Thank you for subscribing!
                  </Typography>
                </Alert>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 2, color: "accent" }}
                  onClick={() => {
                    setContactName("");
                    setSubscribeEmail("");
                    setSuccess(false);
                    handleClose();
                  }}
                >
                  Close
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </Stack>
    </Box>
  );
}
