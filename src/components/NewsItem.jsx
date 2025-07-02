import React from "react";

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: "0"
        }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={
            imgUrl
              ? imgUrl
              : "https://14383936669580136039.googlegroups.com/attach/25a9aa043ccfb/6.jpg?part=0.1&view=1&vt=ANaJVrFspdIjnGLR-YHNhJtU2o4e_QwzP_Au2wZy1BSo24dps2v0nEi5f7IrqM3Vqa_SLXCeCAiVc7k9Lx7xgNKo3nurSppAZvsgRDbJ32KO_YOutzatpzo"
          }
          className="card-img-top"
          alt="News"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description}
          </p>
          <p className="card-text">
            <small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            className="btn btn-dark btn-sm"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
