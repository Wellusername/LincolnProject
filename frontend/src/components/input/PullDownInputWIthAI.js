import React, { useState } from "react";
import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";

function PullDownInputWIthAI({ id, label, AI, color, handleInput }) {
  const [val, setVal] = useState("");

  const handleChange = (e) => {
    setVal(e.target.value);
    handleInput(e, id);
  };
  return (
    <Grid container style={{ backgroundColor: color }}>
      <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={6} paddingBottom={"3px"} paddingTop={"3px"}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={val}
          onChange={handleChange}
          style={{ backgroundColor: "white" }}
        >
          <MenuItem value={1}>Yes</MenuItem>
          <MenuItem value={0}>No</MenuItem>
        </Select>
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

export default PullDownInputWIthAI;
