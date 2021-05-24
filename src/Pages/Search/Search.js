import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./Search.scss";
import {
  Button,
  createMuiTheme,
  ThemeProvider,
  Tabs,
  Tab,
} from "@material-ui/core";
import axios from "axios";


const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPage, setNumOfPage] = useState();
  console.log(content, 'content')

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=26ba5e77849587dbd7df199727859189&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
   
    setContent(data.results);
    setNumOfPage(data.total_pages);
  };
 
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
        // eslint-disable-next-line 
  },[page, type])

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "10px 0" }}>
          <TextField
            label="Search"
            className="searchBox"
            style={{ flex: 1 }}
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button 
          variant="contained" 
          style={{ marginLeft: 10 }}
          onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          style={{ paddingBottom: 5, flex: 2 }}
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
        <div className="trending">
          {content &&
            content.map((trend) => (
              <SingleContent
                key={trend.id}
                id={trend.id}
                poster={trend.poster_path}
                title={trend.title || trend.name}
                date={trend.first_air_date || trend.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={trend.vote_average}
              />
            ))}
          { searchText &&
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
            }
        </div>
        {numOfPage > 1 && (
          <CustomPagination setPage={setPage} numOfPage={numOfPage} />
        )}
      </ThemeProvider>
    </div>
  );
};

export default Search;
