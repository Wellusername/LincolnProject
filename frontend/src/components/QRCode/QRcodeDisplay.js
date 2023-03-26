import { Card, CardMedia, Grid } from "@mui/material";
import React from "react";

function QRcodeDisplay({ qrcode }) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Card>
          <CardMedia component={"img"} image={qrcode} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default QRcodeDisplay;
