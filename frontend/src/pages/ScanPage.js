import { Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import QrReader from "react-qr-scanner";

function ScanPage() {
  const qrRef = useRef(null);
  const [scanResult, setScanResult] = useState();
  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      console.log(data);
      if (qrRef.current) {
        qrRef.current.pause();
      }
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  return (
    <Grid container>
      <Grid item>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <QrReader
            ref={qrRef}
            delay={300}
            style={{ width: "100%" }}
            onError={handleErrorWebCam}
            onScan={handleScan}
            willreadfrequently={"true"}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "250px",
              height: "250px",
              border: "5px solid red",
            }}
          ></div>
        </div>
        <Typography>{scanResult}</Typography>
      </Grid>
    </Grid>
  );
}

export default ScanPage;
