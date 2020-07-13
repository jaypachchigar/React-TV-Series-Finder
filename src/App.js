import React, { useState } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Box } from "@material-ui/core";
import Search from "./component/Search";
import Results from "./component/Results";
import Popup from "./component/Popup";

function App() {
  const [state, setState] = useState({
    keyword: "",
    year: null,
    results: [],
    currentResults: [],
    selected: {},
    page: 1,
    resultsPerPage: 8,
    maxPage: 1,
  });
  const apiurl = "https://www.omdbapi.com/?apikey=510554b1";

  const handleChangePage = (event, newPage) => {
    const indexOfLastResult = newPage * state.resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - state.resultsPerPage;
    let currentResultsdata = state.results.slice(
      indexOfFirstResult,
      indexOfLastResult
    );
    setState((prevState) => {
      return {
        ...prevState,
        currentResults: currentResultsdata,
        page: newPage,
      };
    });
  };
  const searchTitle = (e) => {
    if (e.key === "Enter") {
      let url = apiurl + "&type=series&s=" + state.keyword;
      if (state.year) {
        url += "&y=" + state.year;
      }
      console.debug(url);
      axios(url).then(({ data }) => {
        let results = data.Search;
        console.debug(results);
        const indexOfLastResult = state.page * state.resultsPerPage;
        const indexOfFirstResult = indexOfLastResult - state.resultsPerPage;
        let currentResultsdata = undefined;
        var maxPage = 1;
        if (results) {
          currentResultsdata = results.slice(
            indexOfFirstResult,
            indexOfLastResult
          );
          maxPage = Math.ceil(results.length / state.resultsPerPage);
          console.debug(currentResultsdata);
        }
        setState((prevState) => {
          return {
            ...prevState,
            results: results,
            currentResults: currentResultsdata,
            maxPage: maxPage,
          };
        });
      });
    }
  };

  const handleTitleInput = (e) => {
    let keyword = e.target.value;

    setState((prevState) => {
      return { ...prevState, keyword: keyword };
    });
  };

  const handleYearInput = (e) => {
    let year = e.target.value;

    setState((prevState) => {
      return { ...prevState, year: year };
    });
  };

  const openPopup = (id) => {
    let url = apiurl + "&i=" + id;
    console.debug(url);
    axios(url).then(({ data }) => {
      let result = data;
      console.debug(result);
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography align="center" variant="h3">
            Series database
          </Typography>
        </Toolbar>
      </AppBar>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Search
          handleTitleInput={handleTitleInput}
          handleYearInput={handleYearInput}
          search={searchTitle}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Results
          results={state.currentResults}
          openPopup={openPopup}
          handleChangePage={handleChangePage}
          page={state.page}
          maxPage={state.maxPage}
        />
        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </Box>
    </React.Fragment>
  );
}

export default App;
