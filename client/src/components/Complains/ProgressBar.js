import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import ButtonSpin from "../shared/ButtonSpin";

const StepperSx = {
  "& .MuiStepConnector-root": {
    left: "calc(-50% + 20px)",
    right: "calc(50% + 20px)",
  },
  "& .MuiStepConnector-line": {
    marginTop: "22px", // To position the line lower
  },
};

const ProgressBar = ({ complain }) => {
  const [steps, setSteps] = useState(null);
  const [filteredStep, setFilteredStep] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://cms-server-production.up.railway.app/api/user/complain/statusdates/${complain._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (data) {
          const { _id, complain_id, ...rest } = data;
          const stepKeys = Object.keys(rest).filter(
            (step) => !step.includes("end")
          );
          let stepsForUi = {};
          for (const key of stepKeys) {
            let splited;
            if (key === "submission") {
              stepsForUi = { ...stepsForUi, "Pending Approval": rest[key] };
            } else if (key.includes("rejected") || key.includes("closed")) {
              splited = key.split(" ")[1];
              stepsForUi = { ...stepsForUi, [splited]: rest[key] };
            } else {
              splited = key.split("start")[0];
              stepsForUi = { ...stepsForUi, [splited]: rest[key] };
            }
          }
          setSteps(stepsForUi);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [complain._id]);

  if (!steps) return <ButtonSpin />;

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={Object.keys(steps).length - 1}
        alternativeLabel
        sx={StepperSx}
      >
        {Object.keys(steps).map((label) => (
          <Step key={label} completed={label === "closed"}>
            <Typography align="center">
              {moment(steps[label]).format("D MMM, YYYY")}
            </Typography>
            <StepLabel className="capitalize" error={label === "rejected"}>
              {label === "closed" ? "solved" : label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressBar;
