import { Link, Typography } from "@mui/material";

export function Copyright() {
  return (
    <Typography
      variant="body2"
      sx={{ color: "standard", mt: 1 }}
      component="div"
    >
      {"Copyright © "}
      <Link color="accent" href="">
        Ben Badger
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}
