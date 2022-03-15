import React, { useState } from 'react'
import axios from 'axios'
import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const NewCriticalItemsModal = ({ isOpen, handleClose }) => {
  const [criticaitems_part_number, setPartNumber] = useState('')
  const [criticalitems_stock_obs, setCriticalItems_stock_obs] = useState('')
  const [criticalitems_used_obs, setCriticalItems_used_obs] = useState('')
  // const [error, setError] = useState(Error())

  const handleNewCriticalItemsSubmit = async () => {
    try {
      await axios.post(`http://localhost:3334/critical-items.`, {
        part_number: criticaitems_part_number,
        stock_obs: criticalitems_stock_obs,
        used_obs: criticalitems_used_obs
      })
      handleClose()
    } catch (error) {
      // setError(error)
      // setError('Algo deu errado, verifique se os campos foram digitados corretamente')
    }
  }

  return (
    <>
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Item</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleNewCriticalItemsSubmit}>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o código"
                  onChange={(e) => setPartNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Observação Estoque</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite uma observação"
                  onChange={(e) => setCriticalItems_stock_obs(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Onde usado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite onde é usado"
                  onChange={(e) => setCriticalItems_used_obs(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="warning" onClick={handleNewCriticalItemsSubmit}>
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default NewCriticalItemsModal
