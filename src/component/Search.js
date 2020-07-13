import React from "react";
import Input from "@material-ui/core/Input";
import Box from "@material-ui/core/Box";

function Search({ handleTitleInput, handleYearInput, search }) {
  let fullWidth = true;

  return (
    <Box display="inline">
      <Input
        type="text"
        placeholder="Search by name of the series"
        onChange={handleTitleInput}
        onKeyPress={search}
        fullWidth={fullWidth}
      />
      <Input
        type="number"
        placeholder="Search by year"
        onChange={handleYearInput}
        onKeyPress={search}
        fullWidth={fullWidth}
      />
    </Box>
  );
}

export default Search;
