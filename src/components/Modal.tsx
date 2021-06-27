import React from "react";
import { Button, Modal as BoostrapModal } from "react-bootstrap";

export const Modal = ({
  onConfirm,
  onCancel,
  message,
  isVisible,
}: {
  onConfirm: () => {};
  onCancel: () => void;
  message: string;
  isVisible: boolean;
}) => (
  <BoostrapModal size={"sm"} show={isVisible} onHide={onCancel}>
    <BoostrapModal.Header closeButton>
      <BoostrapModal.Title>Deletar</BoostrapModal.Title>
    </BoostrapModal.Header>
    <BoostrapModal.Body>{message}?</BoostrapModal.Body>
    <BoostrapModal.Footer>
      <Button variant="secondary" onClick={onCancel}>
        Fechar
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Deletar
      </Button>
    </BoostrapModal.Footer>
  </BoostrapModal>
);
