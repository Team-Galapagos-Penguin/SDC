import React from 'react';
import Comp from './styles/Comp.styled.js';
import MoreAnsQues from './styles/MoreAnsQues.styled.js';
import AddAQue from './styles/AddAQue.styled.js';
import FlexRow from './styles/FlexRow.styled.js';
import useModal from '../shared/useModal.js';
import Modal from '../shared/Modal.jsx';
import ModalTemplate from './comps/ModalTemplate.jsx';

function More({ queList, toggleAccordion, showAccordion }) {
  const { visible, toggle } = useModal();
  let innerText;
  if (showAccordion) {
    innerText = 'LESS';
  } else {
    innerText = 'MORE';
  }

  return (
    <Comp>
      <FlexRow>
        { queList.length > 2 ? (
          <MoreAnsQues onClick={toggleAccordion}>
            {innerText}
            {' '}
            ANSWERED QUESTIONS
          </MoreAnsQues>
        ) : null }
        <AddAQue onClick={toggle}>ADD QUESTION +</AddAQue>
      </FlexRow>
      <Modal visible={visible} toggle={toggle}>
        {/* Modal renders its children, so place content between tags */}
        <ModalTemplate />
      </Modal>
    </Comp>
  );
}

export default More;
