import React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export default function FormSelect({
  name,
  label,
  options,
  value,
  handleChange,
}) {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={handleChange}
        fullWidth
      >
        {options &&
          options.map((option, index) => {
            return (
              <MenuItem key={`${option.value}-${index}`} value={option.value}>
                {option.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}
