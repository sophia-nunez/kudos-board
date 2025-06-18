import { useState, useEffect } from "react";
import { fetchGifs, searchGifs } from "../utils";
import SearchBar from "./SearchBar";

import "../styles/GifSelect.css";

const GifSelect = ({ modalOpen, setSelectedGif }) => {
  const [gifs, setGifs] = useState(Array());
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    loadDefaultGifs();
  }, [modalOpen]); // make dependent on open/close

  const loadDefaultGifs = async () => {
    const gifData = await fetchGifs();
    setGifs(gifData);
  };

  const selectGif = (event, gifURL, gifId) => {
    event.stopPropagation();
    setSelectedGif(gifURL);
    setSelectedId(gifId);
  };

  const handleSearch = async (event, query) => {
    const gifData = await searchGifs(query);
    setGifs(gifData);

    console.log(gifData);
  };

  return (
    <article className="gif-select">
      <SearchBar
        searchType="GIFs"
        handleSearch={handleSearch}
        loadPage={loadDefaultGifs}
      />
      {gifs &&
        gifs.map((gif, index) => {
          const url = gif.images.original.url;
          return (
            <button
              className={gif.id === selectedId ? "selected" : ""}
              key={index}
              onClick={(e) => selectGif(e, url, gif.id)}
            >
              <img src={url} alt="gif" />
            </button>
          );
        })}
    </article>
  );
};

export default GifSelect;
