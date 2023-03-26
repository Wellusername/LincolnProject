import { Grid } from "@mui/material";
import InfoInputLayout from "./pages/InfoInputLayout";
import QRcodeGenerationLayout from "./pages/QRcodeGenerationLayout";
import { useState } from "react";

function App() {
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

export default App;
