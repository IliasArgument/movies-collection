import React, { useState, useEffect } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../hooks/useGenre";
import axios from "axios";
import "./Series.scss";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPage, setNumOfPage] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForUrl = useGenre(selectedGenres);
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=26ba5e77849587dbd7df199727859189&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`
    );
    setContent(data.results);
    setNumOfPage(data.total_pages);
  };
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line 
  }, [page, genreForUrl]);
  return (
    <div>
      <span className="pageTitle">Series</span>
      <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
        type="tv"
      />
      <div className="trending">
        {content &&
          content.map((trend) => (
            <SingleContent
              key={trend.id}
              id={trend.id}
              poster={trend.poster_path}
              title={trend.title || trend.name}
              date={trend.first_air_date || trend.release_date}
              media_type="tv"
              vote_average={trend.vote_average}
            />
          ))}
      </div>
      {numOfPage > 1 && (
        <CustomPagination setPage={setPage} numOfPage={numOfPage} />
      )}
    </div>
  );
};

export default Series;
