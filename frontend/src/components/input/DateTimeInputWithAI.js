import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

function DateTimeInputWithAI({ id, label, AI, color, handleInput }) {
  return (
    <Grid container style={{ backgroundColor: color }}>
      <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={6} paddingBottom={"3px"} paddingTop={"3px"}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="datetime-local"
          inputProps={{
            style: {
              height: "15px",
            },
          }}
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "4px",
          }}
          size="small"
          onChange={(e) => handleInput(e, id)}
        />
      </Grid>
      <Grid
        item
        container
        xs={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Typography textAlign="center">{AI}</Typography>
      </Grid>
    </Grid>
  );
}

export default DateTimeInputWithAI;
