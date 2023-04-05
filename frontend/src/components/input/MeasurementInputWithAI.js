import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";

function MeasurementInputWithAI({
  id,
  label,
  unit,
  AI,
  color,
  handleInput,
  clear,
  handleClearInput,
  disable,
  val,
}) {
  const [text, setText] = useState("");
  const [decode, setDecode] = useState(val);

  useEffect(() => {
    if (clear) {
      setText("");
      handleClearInput(false);
      setDecode("");
    }
  }, [clear]);

  const handleLocalInput = (e) => {
    setText(e.value);
  };
  return (
    <Grid container style={{ backgroundColor: color }}>
      <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid
        item
        container
        xs={6}
        paddingBottom={"3px"}
        paddingTop={"3px"}
        spacing={1}
      >
        <Grid item>
          <TextField
            type="number"
            id="outlined-basic"
            variant="outlined"
            height="4px"
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
        </Grid>
        <Grid item>
          <Typography> {unit}</Typography>
        </Grid>
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

export default MeasurementInputWithAI;
