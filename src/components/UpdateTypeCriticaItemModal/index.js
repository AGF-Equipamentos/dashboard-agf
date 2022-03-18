import { Button, Form, Modal } from 'react-bootstrap'
// import React, { useState } from 'react'
// import UpdateStockCriticalItemsModal from '../UpdateStockCriticalItemModal'

const UpdateTypeCritialItemsModal = ({ isOpen, handleClose }) => {
  return (
    <>
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Escolha o tipo de atualização</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Button variant="warning">Compras</Button>
              </Form.Group>
              <Form.Group>
                <Button variant="warning">Almoxarifado</Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateTypeCritialItemsModal
