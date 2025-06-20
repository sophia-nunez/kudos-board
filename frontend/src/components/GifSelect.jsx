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

  useEffect(() => {
    setQuery("");
    loadDefaultGifs();
  }, [modalOpen]); // make dependent on open/close

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      loadDefaultGifs();
    }
  }, [boardChange]); // test this, should allow clear to work

  const loadDefaultGifs = async () => {
    if (query == "") {
      const gifData = await fetchGifs();
      setGifs(gifData);
    } else {
      handleSearch();
    }
  };

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

  const handleSearch = async () => {
    const gifData = await searchGifs(query);
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
