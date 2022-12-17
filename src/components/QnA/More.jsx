import React from 'react';
import styled from 'styled-components';
import Comp from './styles/Comp.styled.js';
import FlexRow from './styles/FlexRow.styled.js';
import useModal from '../shared/useModal.js';
import Modal from '../shared/Modal.jsx';
import ModalTemplate from './comps/ModalTemplate.jsx';

const AddAQue = styled.button`
  display: flex;
  font-weight: bold;
  border-width: 1px;
  padding: 2.04% 1.5%;
  min-width: 127px;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0);
  border-right: 1px solid rgba(0, 0, 0);
  box-shadow: -2px -2px 2px rgb(0 0 0 / 0.1);
  background-color:${({ theme }) => theme.bg};
`;

const MoreAnsQues = styled.button`
  display: flex;
  font-weight: bold;
  padding: 2.04% 1.5%;
  margin-right: 2.5%;
  min-width: 216px;
  place-content: center;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0);
  border-right: 1px solid rgba(0, 0, 0);
  box-shadow: -2px -2px 2px rgb(0 0 0 / 0.1);
  background-color:${({ theme }) => theme.bg};
`;

function More({
  queList, toggleAccordion, productName, productID, showMore,
}) {
  const { visible, toggle } = useModal();

  return (
    <Comp>
      <FlexRow>
        { queList.length > 2 && showMore
          ? (
            <MoreAnsQues onClick={toggleAccordion}>
              MORE ANSWERED QUESTIONS
            </MoreAnsQues>
          )
          : null}
        <AddAQue onClick={toggle}>ADD QUESTION +</AddAQue>
      </FlexRow>
      <Modal visible={visible} toggle={toggle}>
        <ModalTemplate
          title="Ask Your Question"
          subtitle={`About the ${productName}`}
          firstInputLabel="Your Question"
          firstInputName="Your Question"
          secondInputName="Example: jackson11!"
          thirdInputName="Your email"
          buttonName="Submit Question"
          secondInputText="For privacy reasons, do not use your full name or email address"
          thirdInputText="For authentication reasons, you will not be emailed"
          isQuestion
          identification={`${productID}`}
        />
      </Modal>
    </Comp>
  );
}

export default More;