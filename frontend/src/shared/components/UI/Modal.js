import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from '../Button/Button';

const StyledModal = styled.div`
  width: ${(props) => props.width || '50vw'};
  height: ${(props) => props.height || '20vh'};
  background-color: ${(props) => props.modalBackgroundColor || '#ebebeb'};
  color: ${(props) => props.modalTextColor || '#000'};
  font-size: ${(props) => props.modalFontSize || '2rem'};
  border-radius: ${(props) => props.modalBorderRadius || '1rem'};
  border: ${(props) => props.modalBorder || 'none'};
  font-size: ${(props) => props.modalFontSize || '2rem'};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .Content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${(props) => props.modalPadding || '0'};
  }

  button {
    position: absolute;
    left: 2rem;
    bottom: 2rem;
  }

  img {
    width: 100%;
    height: 100%;
  }

  z-index: 1000;
`;

const StyledOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: ${(props) => (props.show ? 'block' : 'none')};

  background-color: ${(props) =>
    props.overlayBackgroundColor || 'rgba(0, 0, 0, 0.5)'};

  z-index: 999;
`;

const Overlay = (props) => {
  const content = (
    <StyledOverlay
      show={props.show}
      onClick={props.closeModal}
      overlayBackgroundColor={props.overlayBackgroundColor}
    >
      {props.children}
    </StyledOverlay>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('overlay-hook')
  );
};

const Modal = (props) => {
  const content = (
    <>
      <Overlay
        show={props.show}
        closeModal={props.closeModal}
        overlayBackgroundColor={props.overlayBackgroundColor}
      ></Overlay>
      <StyledModal
        width={props.width}
        height={props.height}
        modalFontSize={props.modalFontSize}
        modalBackgroundColor={props.modalBackgroundColor}
        modalTextColor={props.modalTextColor}
        modalBorderRadius={props.modalBorderRadius}
        modalBorder={props.modalBorder}
        modalPadding={props.modalPadding}
      >
        <div className="Content">{props.children}</div>
        {/* <div className="Content">
          <img src="./../../../Images/fakeMapView.png" alt="Place On Map" />
        </div> */}
        {props.button && (
          <Button
            onClick={props.closeModal}
            buttonBackgroundColor={props.buttonBackgroundColor}
            buttonBackgroundColorHover={props.buttonBackgroundColorHover}
            buttonTextColor={props.buttonTextColor}
            buttonTextColorHover={props.buttonTextColorHover}
            buttonFontSize={props.buttonFontSize}
          >
            {props.buttonText}
          </Button>
        )}
      </StyledModal>
    </>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default Modal;
