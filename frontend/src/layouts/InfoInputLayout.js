import React from "react";
import { Grid } from "@mui/material";
import InfoInput from "../components/input/InfoInput";
import InfoInputWithAI from "../components/input/InfoInputWithAI";
import { s4tTerm, primaryIdentifiers } from "../resource/s4tTerm";
import PullDownInputWIthAI from "../components/input/PullDownInputWIthAI";
import MeasurementInputWithAI from "../components/input/MeasurementInputWithAI";
import DateTimeInputWithAI from "../components/input/DateTimeInputWithAI";

function InfoInputLayout({ handleInput, clear, handleClearInput }) {
  const stringInput = (obj, i) => {
    return (
      <InfoInputWithAI
        id={obj.id}
        label={obj.label}
        AI={obj.code}
        color={i.color}
        clear={clear}
        handleInput={handleInput}
        handleClearInput={handleClearInput}
      />
    );
  };

  const booleanInput = (obj, i) => {
    return (
      <PullDownInputWIthAI
        id={obj.id}
        label={obj.label}
        AI={obj.code}
        color={i.color}
        clear={clear}
        handleInput={handleInput}
        handleClearInput={handleClearInput}
      />
    );
  };

  const measurementInput = (obj, i) => {
    return (
      <MeasurementInputWithAI
        id={obj.id}
        label={obj.label}
        unit={obj.unit}
        AI={obj.code}
        clear={clear}
        color={i.color}
        handleInput={handleInput}
        handleClearInput={handleClearInput}
      />
    );
  };

  const dateTimeInput = (obj, i) => {
    return (
      <DateTimeInputWithAI
        id={obj.id}
        label={obj.label}
        unit={obj.unit}
        AI={obj.code}
        color={i.color}
        handleInput={handleInput}
        clear={clear}
        handleClearInput={handleClearInput}
      />
    );
  };

  return (
    <Grid container spacing={3} marginBottom="2rem">
      <Grid item xs={12}>
        <Grid container spacing={0.3}>
          {primaryIdentifiers.map((i) => {
            return (
              <Grid item xs={12}>
                <InfoInput
                  id={i.id}
                  label={i.label + "*"}
                  handleInput={handleInput}
                  clear={clear}
                  handleClearInput={handleClearInput}
                />
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
                      {obj.datatype != undefined
                        ? obj.datatype == "xsd:boolean"
                          ? booleanInput(obj, i)
                          : obj.datatype == "gs1:Measurement"
                          ? measurementInput(obj, i)
                          : obj.datatype == "xsd:dateTime"
                          ? dateTimeInput(obj, i)
                          : stringInput(obj, i)
                        : stringInput(obj, i)}
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
