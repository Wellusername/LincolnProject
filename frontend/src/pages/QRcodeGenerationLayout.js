import { Grid, TextareaAutosize } from "@mui/material";
import React from "react";

function QRcodeGenerationLayout() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TextareaAutosize minRows={15} maxRows={20} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default QRcodeGenerationLayout;
