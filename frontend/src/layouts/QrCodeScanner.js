import { Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import QrReader from "react-qr-scanner";

function QrCodeScanner({ scanResult, handleScanResult, scan }) {
  const qrRef = useRef(null);
  const handleScan = (data) => {
    if (data) {
      handleScanResult(data.text);
      if (qrRef.current) {
        qrRef.current.pause();
      }
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const displayQeReader = () => {
    if (scan) {
      return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <QrReader
            ref={qrRef}
            delay={300}
            style={{ width: "100%", marginBottom: '2rem' }}
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
      );
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>{displayQeReader()}</Grid>
      <Grid item style={{marginBottom: '2rem', wordWrap: 'break-word', width: '80%', boxSizing: 'border-box', textAlign: 'center'}}>
        <Typography textAlign={"center"} variant="h6" fontWeight='bold'>
          {scanResult}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default QrCodeScanner;
