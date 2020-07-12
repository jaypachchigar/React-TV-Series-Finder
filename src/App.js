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
    selected: {},
  });
  const apiurl = "http://www.omdbapi.com/?apikey=510554b1&type=series";

  const searchTitle = (e) => {
    if (e.key === "Enter") {
      let url = apiurl + "&s=" + state.keyword;
      if (state.year) {
        url += "&y=" + state.year;
      }
      console.debug(url);
      axios(url).then(({ data }) => {
        let results = data.Search;
        console.debug(results);
        setState((prevState) => {
          return { ...prevState, results: results };
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
        <Results results={state.results} openPopup={openPopup} />
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
