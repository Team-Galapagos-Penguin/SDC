/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SingleReview from './SingleReview.jsx';
import { getReviews } from './api.js';
import SortReviews from './SortReviews.jsx';

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewsListContainer = styled.div`
  display: inline-block;
  overflow-y: scroll;
  max-height: 1000px;
`;

const SearchBar = styled.input`
  margin: 10px 0;
`;

const ShowMoreButton = styled.div`
  display: inline-block;
  font-weight: bold;
  padding: 12px;
  max-height: 15px;
  width: auto;
  place-content: center;
  text-align: left;
  border: 1px solid black;

  &:hover {
    background: pink;
  }

  &:active {
    background: blue;
  }
`;

function ReviewsList(props) {
  const [sortOption, setSortOption] = useState('Relevant');
  const [reviews, setReviews] = useState([]);
  const [currentReviews, setCurrentReviews] = useState([]);
  const [index, setIndex] = useState(2);
  const [numberOfReviews, setNumberOfReviews] = useState();

  const { filter, selectedFilters, setFilter } = props;

  const product = useSelector((state) => state.product.productId);
  const data = useSelector((state) => state.product.productData);

  const filterReviews = (reviewsData) => setCurrentReviews(reviewsData.filter((review) => selectedFilters[review.rating] === true));

  const showMoreReviews = () => {
    setCurrentReviews(reviews.slice(0, index));
    setIndex(index + 2);
  };

  useEffect(() => {
    getReviews(product, sortOption)
      .then((result) => {
        setReviews(result);
        setNumberOfReviews(result.length);
        return filter ? filterReviews(result) : setCurrentReviews(result.slice(0, 2));
      });
  }, [product, sortOption]);

  useEffect(() => ((filter && (Object.values(selectedFilters)).includes(true))
    ? filterReviews(reviews)
    : setCurrentReviews(reviews.slice(0, 2))), [filter, selectedFilters]);

  return (
    <div>

      <SortReviews sortOption={sortOption} setSortOption={setSortOption} numberOfReviews={numberOfReviews} />

      <SearchBar placeholder="Search for a Keyword" />

      <ReviewsListContainer>
        {currentReviews.map((review) => (
          <SingleReview
            review={review}
            key={review.review_id}
            id={review.review_id}
          />
        ))}
      </ReviewsListContainer>

      {reviews.length > 2
      && currentReviews.length < reviews.length
      && (
        <ShowMoreButton onClick={(evt) => showMoreReviews()}>
          More Reviews
        </ShowMoreButton>
      )}

    </div>
  );
}

export default ReviewsList;
