import React, { useState } from "react";
import "./Settings.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Settings() {
  const [checked, setChecked] = useState(
    localStorage.getItem("funnyModeIsOff") === null
      ? false
      : localStorage.getItem("funnyModeIsOff") === "true"
      ? false
      : true
  );

  const handleChange = (event) => {
    setChecked(event.target.checked);
    // @ts-ignore
    localStorage.setItem("funnyModeIsOff", checked);
    console.log(localStorage.getItem("funnyMode"));
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Money Flow - Settings</title>
      </Helmet>
      <Box sx={{ justifyContent: "left" }}>
        <Typography variant="h4" sx={{ textAlign: "left !important" }}>
          Settings
        </Typography>

        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  // @ts-ignore
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Funny Mode"
            />
          </FormGroup>
        </FormControl>
      </Box>
    </HelmetProvider>
  );
}

export default Settings;
