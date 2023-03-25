import { Grid, TextareaAutosize, Typography } from "@mui/material";
import React from "react";
import QRcodeDisplay from "../components/QRCode/QRcodeDisplay";

function QRcodeGenerationLayout() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} textAlign="center">
          {" "}
          URL
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextareaAutosize minRows={15} maxRows={20} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} textAlign="center">
          {" "}
          QR Code
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <QRcodeDisplay />
      </Grid>
    </Grid>
  );
}

export default QRcodeGenerationLayout;
