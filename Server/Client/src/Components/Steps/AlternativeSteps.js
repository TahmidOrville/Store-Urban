import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import '../Shipment/Shipment.css'


function getSteps() {
  return ['Sign In','Shipping','Payment method','Place Order'];
}

const AlternativeSteps=(props)=> {
 
  const [activeStep] = useState(props.activeStep);
  const steps = getSteps();

  return (
    <div >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
         
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    
          </div>
        )}

 export default AlternativeSteps