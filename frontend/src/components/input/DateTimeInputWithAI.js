import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";

function DateTimeInputWithAI({
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
    <Grid container style={{ backgroundColor: color, padding: '1rem', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
      <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={6} paddingBottom={"3px"} paddingTop={"3px"}>
        {!disable &&
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
