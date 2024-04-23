import { useState, useRef } from "react";
import style from "@/styles/components/searchBar.module.scss";
import { useRouter } from "next/navigation";
import { useGetProductSuggestionQuery } from "@/redux/services/auth";
import { skipToken } from "@reduxjs/toolkit/query";
import { Spinner } from "react-bootstrap";
import LazyImage from "@/components/ui/LazyImage";

const SearchBar = () => {
  const searchRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState(skipToken);
  const { data, isLoading } = useGetProductSuggestionQuery(searchData);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchData(skipToken);
    if (search.length > 0) {
      setShowSearch(false);
      router.push(
        `/products/search/${search.trim().replace(/\s/g, "-").toLowerCase()}`,
      );
    }
  };
  const handleSearchValue = (value) => {
    // console.log(value);
    setSearch(value);
    if (value.length > 0) {
      setSearchData(value);
      setShowSearch(true);
    } else {
      setSearchData(skipToken);
      setShowSearch(false);
    }
  };
  // hide search popup if click outside of the popup
  const handleClickOutsideSuggestions = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowSearch(false);
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("click", handleClickOutsideSuggestions);
    //   close search popup if click esc key or press enter or click search close icon or redirect to product page

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        setShowSearch(false);
      }
    });
  }
  let renderSuggestions = null;
  if (!isLoading && data && data?.data?.length > 0) {
    renderSuggestions = data?.data?.map((item, index) => {
      return (
        <div
          onClick={() => {
            setSearch(item.name);
            setSearchData(skipToken);
            router.push("/product/" + item.slug);
            setShowSearch(false);
          }}
          key={index}
          className={style.suggestion_item}
        >
          <div className={style.image_wrapper}>
            <LazyImage src={item.image_url} alt={item.name} />
          </div>
          <div className={style.suggestion_item_content}>
            <h6>{item.name}</h6>
            <div className={style.suggestion_item_price}>
              <span className={style.current_price}>
                {item.price_after_discount
                  ? item.price_after_discount
                  : item.price}
              </span>
              {item.price_after_discount && (
                <span className={style.old_price}>{item.price}</span>
              )}
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className={style.searchbar_wrapper} ref={searchRef}>
      <form onSubmit={handleSearch}>
        <input
          onClick={() => search.length > 0 && setShowSearch(true)}
          onChange={(e) => handleSearchValue(e.target.value)}
          value={search}
          type="search"
          placeholder="Search your favorite products"
        />
        <img
          className={style.search_icon}
          style={{ cursor: "pointer" }}
          onClick={handleSearch}
          src="/common/search.svg"
          alt="search"
          width={21}
          height={21}
        />
      </form>
      {showSearch && (
        <div className={style.suggestions_wrapper}>
          {isLoading && (
            <div className={style.suggestion_loading_wrapper}>
              <Spinner animation="border" variant="dark" />
            </div>
          )}
          <div className={style.suggestions_content_wrapper}>
            {renderSuggestions ? (
              renderSuggestions
            ) : (
              <div className={style.no_data_found}>
                <h3>Sorry, no results found!</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
