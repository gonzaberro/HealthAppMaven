import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RepetirDiriamente from "./RepetirDirariamente";
import RepetirMensualmente from "./RepetirMensualmente";
import RepetirSemanalmente from "./RepetirSemanalmente";

export default function ProgramarAgenda(props) {
  const classes = useStyles();
  const [opcionRepetir, setOpcionRepetir] = useState(1);

  return (
    <>
      {props.programar === 1 ? (
        <>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Repetir
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Institución"
              fullWidth
              value={opcionRepetir}
              onChange={(event) => setOpcionRepetir(event.target.value)}
            >
              <MenuItem value={1}>Diariamente</MenuItem>
              <MenuItem value={2}>Semanalmente</MenuItem>
              <MenuItem value={3}>Mensualmente</MenuItem>
            </Select>
          </FormControl>

          <RepetirDiriamente opcionRepetir={opcionRepetir} />
          <RepetirSemanalmente opcionRepetir={opcionRepetir} />
          <RepetirMensualmente opcionRepetir={opcionRepetir} />
        </>
      ) : null}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 10,
  },
  container: {
    margin: 10,
    marginRight: 0,
    paddingRight: 0,
    width: "100%",
  },
  textField: {
    width: "100%",
  },
  spanRepetir: {
    paddingTop: 20,
  },
  checkBoxContainer: { margin: 10, color: "#0000008a" },
  textArea: {
    width: "100%",
    minHeight: 100,
    maxHeight: 100,
    borderColor: "#c4c4c4",
    borderRadius: 5,
    marginTop: 5,
  },

  gridContainer: { border: "1px solid #ccc", padding: 30, paddingTop: 0 },
}));
