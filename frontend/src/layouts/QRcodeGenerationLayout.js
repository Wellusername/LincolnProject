import React, { useState, useEffect } from "react";
import { Grid, TextareaAutosize, Typography } from "@mui/material";
import QRcodeDisplay from "../components/QRCode/QRcodeDisplay";
import { getUrlAndQRcode } from "../utils/connectBackend";

function QRcodeGenerationLayout({ info }) {
  const [result, setResult] = useState({});
  useEffect(() => {
    try {
      getUrlAndQRcode(info).then((res) => {
        console.log(res);
        setResult(res);
      });
    } catch (e) {
      console.log(e);
    }
  }, [info]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} textAlign="center">
          {" "}
          URL
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextareaAutosize
          value={result.url}
          minRows={15}
          maxRows={20}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} textAlign="center">
          {" "}
          QR Code
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <QRcodeDisplay qrcode={result.image} />
      </Grid>
    </Grid>
  );
}

export default QRcodeGenerationLayout;
