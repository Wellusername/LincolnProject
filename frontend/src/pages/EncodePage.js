import { Grid } from "@mui/material";
import InfoInputLayout from "../layouts/InfoInputLayout";
import QRcodeGenerationLayout from "../layouts/QRcodeGenerationLayout";
import { useState } from "react";

function EncodePage() {
  const [info, setInfo] = useState({});

  const handleInput = (event, id) => {
    const newInfo = { ...info };
    newInfo[id] = event.target.value;
    setInfo(newInfo);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <InfoInputLayout handleInput={handleInput} />
      </Grid>
      <Grid item xs={12} md={6}>
        <QRcodeGenerationLayout info={info} />
      </Grid>
    </Grid>
  );
}

export default EncodePage;
