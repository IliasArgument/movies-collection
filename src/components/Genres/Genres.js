import axios from "axios";
import React, { useEffect } from "react";
import Chip from "@material-ui/core/Chip";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
  type,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleremove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selectedId) => selectedId.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };
  console.log(genres, 'gen')
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=26ba5e77849587dbd7df199727859189&language=en-US`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
    // eslint-disable-next-line 
  }, []);
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            size="small"
            style={{ margin: 2 }}
            clickable
            color="primary"
            key={genre.id}
            onDelete={() => handleremove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            size="small"
            style={{ margin: 2 }}
            clickable
            key={genre.id}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
