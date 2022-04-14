import React, { useState } from 'react'
import axios from 'axios'
import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const NewCriticalItemsModal = ({ isOpen, handleClose }) => {
  function KeyPressd(event) {
    if (event.key === 'Enter') {
      handleNewCriticalItemsSubmit()
    }
  }

  const [criticalitems_part_number, setPartNumber] = useState('')
  const [criticalitems_stock_obs, setCriticalItems_stock_obs] = useState('')
  const [criticalitems_used_obs, setCriticalItems_used_obs] = useState('')
  const [error, setError] = useState('')

  const handleNewCriticalItemsSubmit = async () => {
    try {
      const createNewCriticalItems = {}

      if (criticalitems_part_number !== '') {
        Object.assign(createNewCriticalItems, {
          part_number: criticalitems_part_number.toLocaleUpperCase().trim()
        })
      }

      if (criticalitems_stock_obs !== '') {
        Object.assign(createNewCriticalItems, {
          stock_obs: criticalitems_stock_obs
        })
      }

      if (criticalitems_used_obs !== '') {
        Object.assign(createNewCriticalItems, {
          used_obs: criticalitems_used_obs
        })
      }
      await axios.post(
        `http://localhost:3334/critical-items`,

        createNewCriticalItems
      )
      setError('')
      handleClose()
      window.location.reload()
    } catch (error) {
      const errorMessage = error.response.data.message
      if (errorMessage === '"part_number" is not allowed to be empty') {
        return setError('"Código" não é permitido estar vazio')
      }
      if (errorMessage === 'Part Number does not exits!') {
        return setError('Esse código não existe')
      }

      setError('Algo deu errado, tente novamente')
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
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o código"
                onChange={(e) => setPartNumber(e.target.value)}
                onKeyPress={KeyPressd}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Observação Estoque</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite uma observação"
                onChange={(e) => setCriticalItems_stock_obs(e.target.value)}
                onKeyPress={KeyPressd}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Onde usado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite onde é usado"
                onChange={(e) => setCriticalItems_used_obs(e.target.value)}
                onKeyPress={KeyPressd}
              />
            </Form.Group>
          </Modal.Body>
          <p
            style={{
              color: 'red',
              textAlign: 'center'
            }}
          >
            {error}
          </p>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
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
