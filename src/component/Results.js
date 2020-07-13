import React from "react";
import Result from "./Result";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
function Results({ results, openPopup, handleChangePage, page, maxPage }) {
  if (results && results.length > 0) {
    return (
      <div>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="results"
        >
          {results.map((result) => (
            <Result key={result.imdbID} result={result} openPopup={openPopup} />
          ))}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="results"
        >
          <Pagination
            count={maxPage}
            variant="outlined"
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </div>
    );
  } else if (results && results.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="results"
      ></Box>
    );
  } else {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="results"
      >
        <Typography align="center" variant="h3">
          No results found
        </Typography>
      </Box>
    );
  }
}

export default Results;
