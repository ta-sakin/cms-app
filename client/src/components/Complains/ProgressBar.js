import { Step, StepLabel, Stepper } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
// const statusList = [
//   "pending approval",
//   "in verification",
//   "in hold",
//   "in hold",
//   "in progress",
//   "regected",
//   "closed",
// ];
const statusList = [
  "submission",
  "pending approval",
  "in verification start",
  "in hold start",
  "in progress start",
  "in rejected start",
  "in closed start",
];
const ProgressBar = ({ complain }) => {
  const [steps, setSteps] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/user/complain/statusdates/${complain._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("data", data);
        if (data) {
          const { _id, complain_id, ...rest } = data;
          setSteps(rest);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [complain._id]);

  if (!steps) return;
  console.log(steps);
  return (
    <div>
      <Stepper alternativeLabel activeStep={1}>
        {statusList.map((label) => (
          <Step key={label}>
            <StepLabel>{steps[label]}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stepper activeStep={1} alternativeLabel>
        {Object.keys(steps)?.map((label) => (
          <Step key={label}>
            <StepLabel className="capitalize">
              {label === "submission" ? "Pending Approval" : label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ProgressBar;
