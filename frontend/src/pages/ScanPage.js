import { Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import InfoLayout from "../layouts/InfoILayout";
import QrCodeScanner from "../layouts/QrCodeScanner";

function ScanPage() {
  const [scanResult, setScanResult] = useState();

  const handleScanResult = (val) => {
    setScanResult(val);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <QrCodeScanner
          scanResult={scanResult}
          handleScanResult={handleScanResult}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InfoLayout disable={true} />
      </Grid>
    </Grid>
  );
}

export default ScanPage;
