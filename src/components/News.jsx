// import React, { useEffect, useState } from "react";
// import NewsItem from "./NewsItem";
// import Spinner from "./spinner";
// import PropTypes from "prop-types";
// import { useLocation } from "react-router-dom";

// const News = ({ country = "us", pageSize = 12, category = "general" }) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);

//   const location = useLocation();

//   const apiKey = "89e0a82957704b8bacce7841506ee755"; // Your hardcoded API key here

//   // Extract search query from URL
//   const getSearchQuery = () => {
//     const params = new URLSearchParams(location.search);
//     return params.get("q") || "";
//   };

//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       let url;

//       if (category === "") {
//         // Search mode — use everything endpoint
//         const query = getSearchQuery();
//         if (!query) {
//           setArticles([]);
//           setTotalResults(0);
//           setLoading(false);
//           return;
//         }
//         url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
//           query
//         )}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
//         document.title = `Search results for "${query}" - NewsMonkey`;
//       } else {
//         // Normal category mode — top headlines endpoint
//         url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
//         document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
//       }

//       try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.status === "ok") {
//           setArticles(data.articles || []);
//           setTotalResults(data.totalResults || 0);
//         } else {
//           setArticles([]);
//           setTotalResults(0);
//           console.error("NewsAPI error:", data);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     // Reset to page 1 when search query or category changes
//   }, [page, location.search, category]);

//   const handlePrevious = () => {
//     setPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNext = () => {
//     if (page + 1 <= Math.ceil(totalResults / pageSize)) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   return (
//     <div className="container my-3">
//       <h2 className="text-center my-4">
//         {category === ""
//           ? `Search Results for "${getSearchQuery()}"`
//           : `NewsMonkey - Top ${capitalizeFirstLetter(category)} Headlines`}
//       </h2>

//       {loading && <Spinner />}

//       <div className="row">
//         {!loading &&
//           articles.map((element) => (
//             <div className="col-md-4" key={element.url}>
//               <NewsItem
//                 title={element.title || ""}
//                 description={element.description || ""}
//                 imgUrl={element.urlToImage}
//                 newsUrl={element.url}
//                 author={element.author || "Unknown"}
//                 date={element.publishedAt}
//                 source={element.source?.name || "Unknown"}
//               />
//             </div>
//           ))}
//       </div>

//       {(category !== "" || getSearchQuery()) && (
//         <div className="container d-flex justify-content-between">
//           <button
//             disabled={page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={handlePrevious}
//           >
//             &larr; Previous
//           </button>
//           <button
//             disabled={page + 1 > Math.ceil(totalResults / pageSize)}
//             type="button"
//             className="btn btn-dark"
//             onClick={handleNext}
//           >
//             Next &rarr;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// };

// export default News;









import React, { useEffect, useState, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { country, category, pageSize, apiKey, setProgress } = props;
  const [searchParams] = useSearchParams();
  const searchQuery = props.searchQuery || searchParams.get("q") || "";

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const updateNews = useCallback(async () => {
    setProgress && setProgress(10);
    setLoading(true);

    let url = searchQuery
      ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
      : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      setProgress && setProgress(30);
      const data = await response.json();
      setProgress && setProgress(70);

      const newArticles = data.articles || [];

      setArticles((prev) => {
        const allArticles = [...prev, ...newArticles];
        const uniqueArticles = Array.from(new Map(allArticles.map(item => [item.url, item])).values());
        setHasMore(uniqueArticles.length < (data.totalResults || 0));
        return uniqueArticles;
      });
      setTotalResults(data.totalResults || 0);


    } catch (err) {
      console.error("Failed to fetch news:", err);
      setHasMore(false);
    }

    setLoading(false);
    setProgress && setProgress(100);
  }, [page, searchQuery]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [searchQuery]);

  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
  }, [updateNews]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="container my-3">
      <h2 className="text-center" style={{ margin: "80px 0 20px 0" }}>
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : `NewsMonkey - Top ${capitalizeFirstLetter(category)} Headlines`}
      </h2>

      <div className="row">
        {articles.map((element) => (
          <div className="col-md-4" key={element.url}>
            <NewsItem
              title={element.title || ""}
              description={element.description || ""}
              imgUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source?.name || "Unknown"}
            />
          </div>
        ))}
      </div>

      {loading && (
        <div className="my-4">
          <Spinner />
        </div>
      )}

      {!hasMore && !loading && (
        <p className="text-center my-4 text-muted">You've reached the end!</p>
      )}
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 12,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  searchQuery: PropTypes.string,
  setProgress: PropTypes.func,
  apiKey: PropTypes.string.isRequired,
};

export default News;
