import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";

function PullDownInputWIthAI({
  id,
  label,
  AI,
  color,
  handleInput,
  clear,
  handleClearInput,
  disable,
  val,
}) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    handleInput(e, id);
  };

  useEffect(() => {
    if (clear) {
      console.log(clear);
      setText("");
      handleClearInput(false);
    }
  }, [clear]);

  return (
    <Grid container style={{ backgroundColor: color, padding: '1rem', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
      <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={6} paddingBottom={"3px"} paddingTop={"3px"}>
        {!disable &&
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={!disable ? text : val}
            onChange={handleChange}
            style={{ backgroundColor: "white", height: "30px" }}
            disabled={disable}
          >
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
        }
        {disable &&
          <span style={{fontWeight: 'bold'}}>{val}</span>
        }
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
