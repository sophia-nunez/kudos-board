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
    if (gifId === selectedId) {
      setSelectedId("");
      setSelectedGif("");
    } else {
      setSelectedGif(gifURL);
      setSelectedId(gifId);
    }
  };

  const handleSearch = async (event, query) => {
    const gifData = await searchGifs(query);
    setGifs(gifData);

    console.log(gifData);
  };

  return (
    <section className="gifs">
      <SearchBar
        className="search-bar"
        searchType="GIFs"
        handleSearch={handleSearch}
        loadPage={loadDefaultGifs}
      />
      <article className="gif-select">
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
    </section>
  );
};

export default GifSelect;
