import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";

function InfoInput({
  id,
  label,
  handleInput,
  clear,
  handleClearInput,
  disable,
  val,
}) {
  const [text, setText] = useState("");
  console.log(val);

  useEffect(() => {
    if (clear) {
      console.log(clear);
      setText("");
      handleClearInput(false);
    }
  }, [clear]);

  const handleLocalInput = (e) => {
    setText(e.value);
  };

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
          inputProps={{
            style: {
              height: "15px",
            },
          }}
          onChange={(e) => {
            handleInput(e, id);
            handleLocalInput(e);
          }}
          value={!disable ? text : val}
          disabled={disable}
        />
      </Grid>
    </Grid>
  );
}

export default InfoInput;
