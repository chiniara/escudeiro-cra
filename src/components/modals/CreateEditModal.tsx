import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CreateEditModal = (entity: unknown) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Criar Novo
      </Button>

      <Modal show={show} onHide={handleClose}></Modal>
    </>
  );
};

export default CreateEditModal;
