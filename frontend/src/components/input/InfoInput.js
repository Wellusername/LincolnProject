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

  useEffect(() => {
    if (clear) {
      setText("");
      handleClearInput(false);
    }
  }, [clear]);

  const handleLocalInput = (e) => {
    setText(e.value);
  };

  return (
    <Grid container style={{backgroundColor: '#eee', padding: '1rem', borderRadius: '0.5rem', marginBottom: '0.5rem'}}>
      <Grid item xs={5} style={{ display: "flex", alignItems: "center"}}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={7}>
        {!disable &&
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
        }
        {disable &&
          <span style={{fontWeight: 'bold'}}>{val}</span>
        }
      </Grid>
    </Grid>
  );
}

export default InfoInput;
