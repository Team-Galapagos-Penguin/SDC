import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import More from './More.jsx';
import SingleQue from './comps/SingleQue.jsx';
import Comp from './styles/Comp.styled.js';

const Spacer = styled.div`
  margin: 0 0 10px 0;
  overflow: auto;
  max-height: 515px;
`;

const AccordionDiv = styled.div`
  height: fit-content;
  max-height: ${({ height }) => height};
  transition: max-height 1s ease;
`;

const OuterDiv = styled.div`
  position: relative;
`;

function Qlist({
  queList, product, selectPhoto,
}) {
  const [height, setHeight] = useState('0px');
  const [numberLoaded, setNumberLoaded] = useState(2);
  const [showMore, setShowMore] = useState(true);

  const content = useRef(null);

  useEffect(() => {
    setHeight(`${content.current.scrollHeight}px`);
  });

  const mappedList = queList.map((question) => (
    <SingleQue
      question={question}
      key={question.question_id}
      product={product}
      selectPhoto={(p) => selectPhoto(p)}
    />
  ));

  function toggleAccordion() {
    setNumberLoaded(numberLoaded + 2);
    if (numberLoaded >= queList.length - 2) {
      setShowMore(false);
    }
  }

  return (
    <OuterDiv>
      <Spacer>
        <Comp>
          <AccordionDiv
            data-testid="accordionDiv"
            ref={content}
            height={height}
          >
            { mappedList.slice(0, numberLoaded) }
          </AccordionDiv>
        </Comp>
      </Spacer>
      <More
        data-testid="more"
        queList={queList}
        toggleAccordion={() => toggleAccordion()}
        product={product}
        showMore={showMore}
      />
    </OuterDiv>
  );
}

export default Qlist;
