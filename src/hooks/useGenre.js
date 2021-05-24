const useGenre = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";
  const GenresId = selectedGenres
    .map((g) => g.id)
    .reduce((acc, curr) => acc + "," + curr);
  return GenresId;
};

export default useGenre;
