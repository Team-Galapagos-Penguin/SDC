import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SingleReview from './SingleReview.jsx';

const SelectContainer = styled.div`
display: flex;
flex-direction: row;
padding: 5px;
`;

const NumberReviews = styled.div`
  padding: 5px;
`;

const DropdownMenu = styled.select`
  padding: 2px;
  `;

const DropdownOption = styled.option``;

function SortReviews(props) {
  const { sortOption, setSortOption } = props;
  const data = useSelector((state) => state.product.productData);

  const options = ['Relevant', 'Newest', 'Helpful'];

  const handleClick = (option) => {
    setSortOption(option);
  };

  return (
    <SelectContainer>
      <NumberReviews>
        {data.total_reviews}
        {' '}
        reviews, sorted by
        {' '}
      </NumberReviews>
      <DropdownMenu>
        <DropdownOption>{sortOption}</DropdownOption>
        {options.map((option) => (
          option !== sortOption
          && (
            <DropdownOption
              key={option}
              value={option}
              onClick={(evt) => {
                evt.preventDefault();
                handleClick(option);
              }}
            >
              {option}
            </DropdownOption>
          )
        ))}
      </DropdownMenu>
    </SelectContainer>
  );
}

export default SortReviews;
