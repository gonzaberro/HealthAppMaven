import React, { useReducer, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import FormSelect from "components/Logged/FormSelect";
import { setDefaultFormInput } from "Utils/functions";

export default function Form({ inputs, options }) {
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  );

  useEffect(() => {
    setFormInput(setDefaultFormInput());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ [name]: value });
  };

  const renderInputs = () => {
    return inputs.map((input, index) => {
      let component;
      input.select
        ? (component = (
            <Grid item key={index} xs={12} md={6}>
              <FormSelect
                name="obraSocial"
                label="Obra Social"
                options={options}
                value={input[Object.keys(formInput)[index]] || ""}
                handleChange={handleInputChange}
              />
            </Grid>
          ))
        : (component = (
            <Grid item key={index} xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id={input.name}
                label={input.label}
                name={input.name}
                onChange={handleInputChange}
              />
            </Grid>
          ));

      return component;
    });
  };

  return <>{inputs && renderInputs()}</>;
}
