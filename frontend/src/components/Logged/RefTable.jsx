import React from "react";

import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default function RefTable({ columns }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns
              ? columns.map((column, index) => {
                  return (
                    <TableCell key={`${column}-${index}`} align="right">
                      {column}
                    </TableCell>
                  );
                })
              : ""}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
