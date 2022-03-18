import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const UpdatePurchaseCriticalItemModal = ({ isOpen, handleClose }) => {
  const [purchaseCriticalItem, setPurchaseCriticalItem] = useState('')
  const [usedCriticalItem, setUsedCriticalItem] = useState('')
  const [error, setError] = useState(Error())

  const handleUpdateStockSubmit = async () => {}

  return (
    <>
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Compras</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateStockSubmit}>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exapleForm.ControlInput1">
                <Form.Label>Observação Compras</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite observação..."
                  onChange={(e) => setPurchaseCriticalItem(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="exapleForm.ControlInput1">
                <Form.Label>Responsável</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o responsavel..."
                  onChange={(e) => setUsedCriticalItem(e.target.valu)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <p
            style={{
              color: 'red',
              textAlign: 'center'
            }}
          >
            {error.message}
          </p>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="warning">Salvar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default UpdatePurchaseCriticalItemModal
