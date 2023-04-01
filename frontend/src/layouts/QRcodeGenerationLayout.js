import React, { useState, useEffect } from "react";
import { Button, Grid, TextareaAutosize, Typography } from "@mui/material";
import QRcodeDisplay from "../components/QRCode/QRcodeDisplay";
import { getUrlAndQRcode } from "../utils/connectBackend";

function QRcodeGenerationLayout({ info }) {
  const [result, setResult] = useState({});
  const [generatedURL, setGeneratedURL] = useState(false);
  useEffect(() => {
    try {
      const containEmptyString = (element) => element === "";
      const val = Object.values(info);
      if (val.filter(containEmptyString).length != val.length) {
        getUrlAndQRcode(info).then((res) => {
          setResult(res);
        });
      } else {
        setResult({ url: "" });
      }
    } catch (e) {
      console.log(e);
    }
  }, [info]);

  useEffect(() => {
    if (result != undefined && result != null && result.url != "") {
      setGeneratedURL(true);
    } else {
      setGeneratedURL(false);
    }
  }, [result]);

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
      <Grid
        item
        container
        xs={12}
        justifyContent={"space-between"}
        style={{ marginTop: "30px" }}
      >
        <Grid item xs={2} />
        <Grid item xs={2}>
          <Button variant="outlined" style={{ minWidth: "100%" }}>
            Clear
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            style={{ minWidth: "100%" }}
            disabled={!generatedURL}
          >
            Generate
          </Button>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Grid>
  );
}

export default QRcodeGenerationLayout;
