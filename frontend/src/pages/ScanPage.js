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
      decodeUri(scanResult)
        .then((res) => {
          console.log(res);
          if (res.success) {
            if (res.info.urlStem === undefined || res.info.urlStem == "") {
              alert("Not a valide S4T QRcode");
            }
            setDecodedResult(res.info);
            setScan(false);
          }
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.message);
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
          style={{ margin: "auto auto 2rem auto", padding: "1rem 2rem" }}
          onClick={() => handleScanButton()}
        >
          Scan
        </Button>
      );
    }
  };

  return (
    <Grid container padding="3rem">
      <Grid item xs={12} md={6} alignContent="center">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {displayButton()}
          <QrCodeScanner
            scanResult={scanResult}
            handleScanResult={handleScanResult}
            scan={scan}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <InfoLayout disable={true} decodedResult={decodedResult} />
      </Grid>
    </Grid>
  );
}

export default ScanPage;
