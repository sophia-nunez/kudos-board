import { useState, useEffect, useRef } from "react";
import { fetchGifs, searchGifs } from "../utils/boardUtils";
import SearchBar from "./SearchBar";

import "../styles/GifSelect.css";

const GifSelect = ({ modalOpen, setSelectedGif, defaultGif, defaultAlt }) => {
  const isFirstRender = useRef(true); // avoid effect on first render
  const [boardChange, setBoardChange] = useState(false);
  const [gifs, setGifs] = useState(Array());
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");

  // resets search and loads trending on open/close
  useEffect(() => {
    setQuery("");
    loadDefaultGifs();
  }, [modalOpen]);

  // triggers render when a change occurs to the contents
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      loadDefaultGifs();
    }
  }, [boardChange]);

  const loadDefaultGifs = async () => {
    if (query == "") {
      const gifData = await fetchGifs();
      setGifs(gifData);
    } else {
      handleSearch();
    }
  };

  // if reselected, reset selected values
  // if selected, set selected values to target values
  const selectGif = (event, gifURL, gifId, gifAlt) => {
    event.stopPropagation();
    if (gifId === selectedId) {
      setSelectedId("");
      setSelectedGif({ gifURL: defaultGif, gifAlt: defaultAlt });
    } else {
      setSelectedGif({ gifURL, gifAlt });
      setSelectedId(gifId);
    }
  };

  // fetch gifs using search endpoint
  const handleSearch = async () => {
    const gifData = await searchGifs(query.trim());
    setGifs(gifData);
  };

  return (
    <section className="gifs">
      <SearchBar
        setBoardChange={setBoardChange}
        query={query}
        setQuery={setQuery}
        className="search-bar"
        searchType="GIFs"
        loadPage={loadDefaultGifs}
      />
      <article className="gif-select">
        {gifs &&
          gifs.map((gif, index) => {
            const url = gif.images.original.url;
            return (
              <button
                type="button"
                className={gif.id === selectedId ? "selected" : ""}
                key={index}
                onClick={(e) => selectGif(e, url, gif.id, gif.title)}
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
