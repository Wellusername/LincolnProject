import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

function InfoInput({ label }) {
  return (
    <Grid container>
      <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={7}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          style={{ width: "100%" }}
          size="small"
        />
      </Grid>
    </Grid>
  );
}

export default InfoInput;
