import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import InfoLayout from "../layouts/InfoILayout";
import QrCodeScanner from "../layouts/QrCodeScanner";
import { decodeUri } from "../utils/connectBackend";

function ScanPage() {
  const [scanResult, setScanResult] = useState();
  const [scan, setScan] = useState(false);
  const [decodedResult, setDecodedResult] = useState({});

  const handleScanResult = (val) => {
    setScanResult(val);
  };

  const handleScanButton = () => {
    setScan(true);
    setDecodedResult({});
    setScanResult("");
  };

  useEffect(() => {
    if (scanResult && scanResult !== "") {
      decodeUri(scanResult).then((res) => {
        console.log(res);
        if (res.success) {
          setDecodedResult(res.info);
          setScan(false);
        } else {
          console.log(res.message);
        }
      });
    }
  }, [scanResult]);

  const displayButton = () => {
    console.log(scan);
    if (!scan) {
      return (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleScanButton()}
        >
          Scan
        </Button>
      );
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} alignContent="center">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <QrCodeScanner
            scanResult={scanResult}
            handleScanResult={handleScanResult}
            scan={scan}
          />
          {displayButton()}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <InfoLayout disable={true} decodedResult={decodedResult} />
      </Grid>
    </Grid>
  );
}

export default ScanPage;
