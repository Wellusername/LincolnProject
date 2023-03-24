import React from "react";
import { Grid } from "@mui/material";
import InfoInput from "./InfoInput";
import InfoInputWithAI from "./InfoInputWithAI";
import { s4tTerm, primaryIdentifiers } from "../resource/s4tTerm";

function InfoInputLayout() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container>
          {primaryIdentifiers.map((i) => {
            return (
              <Grid item xs={12}>
                <InfoInput label={i.label} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={0.3}>
              {s4tTerm.map((i) => {
                return i.obj.map((obj) => {
                  return (
                    <Grid item xs={12}>
                      <InfoInputWithAI
                        label={obj.label}
                        AI={obj.code}
                        color={i.color}
                      />
                    </Grid>
                  );
                });
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InfoInputLayout;
