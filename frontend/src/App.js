import "./App.css";
import { Grid } from "@mui/material";
import InfoInputLayout from "./pages/InfoInputLayout";
import QRcodeGenerationLayout from "./pages/QRcodeGenerationLayout";

function App() {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <InfoInputLayout />
      </Grid>
      <Grid item xs={12} md={6}>
        <QRcodeGenerationLayout />
      </Grid>
    </Grid>
  );
}

export default App;
