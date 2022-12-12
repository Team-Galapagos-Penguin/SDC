/* eslint-disable max-len */
import React, { useState } from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import { GrCheckmark } from 'react-icons/gr';
import Stars from '../shared/Stars.jsx';
import { markHelpful, reportReview } from './api.js';
import SingleImage from './SingleImage.jsx';

const Review = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserDate = styled.div`
  margin-left: auto;
`;

const ReviewSummary = styled.div`
  font-weight: bold;
`;

const ReviewSummaryOverflow = styled.div``;

const ReviewBody = styled.div``;

const ShowMoreButton = styled.div``;

const ImageContainer = styled.div`
  display: flex;
`;

const Recommend = styled.div``;

const ResponseContainer = styled.div``;

const ResponseHeader = styled.div`
  font-weight: bold;
`;

const ResponseBody = styled.div``;

const HelpfulReportContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HelpfulReportButton = styled.div`
  text-decoration: underline;
`;

const Line = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid white;
  margin: 1em 0;
  padding: 0;
`;

function SingleReview(props) {
  const { review } = props;

  const [showMore, setShowMore] = useState(false);
  const [helpful, setHelpful] = useState(review.helpfulness);
  const [unhelpful, setUnhelpful] = useState(0);

  // handles summary with length over 60 char
  const summaryOverflow = () => {
    const under60 = review.summary.slice(0, 61);
    const over60 = review.summary.slice(61);
    return (
      <div>
        <ReviewSummary>{under60}</ReviewSummary>
        <ReviewSummaryOverflow>{over60}</ReviewSummaryOverflow>
      </div>
    );
  };

  // handles show/hide button and functionality for body over 250 char
  const bodyOverflow = () => (
    <div>
      {showMore
        ? <ReviewBody>{review.body}</ReviewBody>
        : <ReviewBody>{review.body.slice(0, 251)}</ReviewBody>}
      <ShowMoreButton
        onClick={
          (evt) => {
            evt.preventDefault();
            setShowMore(!showMore);
          }
        }
      >
        {showMore ? 'Show Less' : 'Show More'}
      </ShowMoreButton>
    </div>
  );

  const helpfulClick = () => {
    markHelpful(review.review_id)
      .then(() => {
        setHelpful(helpful + 1);
      });
  };

  return (
    <Review>

      <Stars rating={review.rating} />

      <UserDate>
        {review.reviewer_name}
        ,
        {' '}
        {format(parseISO(review.date), 'MMMM d, yyyy')}
        {' '}
      </UserDate>

      {review.summary.length > 60 ? summaryOverflow() : <ReviewSummary>{review.summary}</ReviewSummary>}

      {review.body.length > 250 ? bodyOverflow() : <ReviewBody>{review.body}</ReviewBody>}

      <ImageContainer>
        { review.photos && review.photos.map((photo) => (
          <SingleImage key={photo.url} url={photo.url} />
        ))}
      </ImageContainer>

      {review.recommend === true && (
        <Recommend>
          {' '}
          <GrCheckmark />
          {' '}
          I recommend this product
        </Recommend>
      )}

      {review.response && (
        <ResponseContainer>
          <ResponseHeader>Response from seller:</ResponseHeader>
          <ResponseBody>{review.response}</ResponseBody>
        </ResponseContainer>
      )}

      <HelpfulReportContainer>
        Was this review helpful?
        <HelpfulReportButton
          onClick={(evt) => {
            evt.preventDefault();
            helpfulClick();
          }}
        >
          Yes
        </HelpfulReportButton>
        (
        {helpful}
        )
        <HelpfulReportButton onClick={(evt) => setUnhelpful(unhelpful + 1)}>
          No
        </HelpfulReportButton>
        (
        {unhelpful}
        )  |
        <HelpfulReportButton
          onClick={(evt) => {
            evt.preventDefault();
            reportReview(review.review_id);
          }}
        >
          Report
        </HelpfulReportButton>
      </HelpfulReportContainer>

      <Line />
    </Review>
  );
}

export default SingleReview;
