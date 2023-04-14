import { Grid } from "@mui/material";
import InfoInputLayout from "../layouts/InfoInputLayout";
import QRcodeGenerationLayout from "../layouts/QRcodeGenerationLayout";
import { useState } from "react";

function EncodePage() {
  const [info, setInfo] = useState({});
  const [clear, setClear] = useState("");

  const handleInput = (event, id) => {
    const newInfo = { ...info };
    newInfo[id] = event.target.value;
    setInfo(newInfo);
  };

  const handleClearInput = (val) => {
    setClear(val);
  };

  const handleClearInfo = () => {
    setInfo({});
  };

  return (
    <Grid container padding='3rem'>
      <Grid item xs={12} md={6}>
        <InfoInputLayout
          handleInput={handleInput}
          clear={clear}
          handleClearInput={handleClearInput}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <QRcodeGenerationLayout
          info={info}
          handleClearInput={handleClearInput}
          handleClearInfo={handleClearInfo}
        />
      </Grid>
    </Grid>
  );
}

export default EncodePage;
