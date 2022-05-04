import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const UpdateStockCriticalItemsModal = ({
  isOpen,
  handleClose,
  criticalItem
}) => {
  function KeyPressd(event) {
    if (event.key === 'Enter') {
      handleSaveStockSubmit()
    }
  }
  const [stockCriticalItem, setStockCriticalItem] = useState('')
  const [usedCriticalItem, setUsedCriticalItem] = useState('')
  const [descriptionCriticalItem, setDescriptionCriticalItem] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setStockCriticalItem(criticalItem.stock_obs)
    setUsedCriticalItem(criticalItem.used_obs)
    setDescriptionCriticalItem(criticalItem.description)
  }, [criticalItem])

  const handleSaveStockSubmit = async () => {
    try {
      const updateStockBody = {}

      if (stockCriticalItem) {
        Object.assign(updateStockBody, {
          stock_obs: stockCriticalItem
        })
      }
      if (usedCriticalItem) {
        Object.assign(updateStockBody, {
          used_obs: usedCriticalItem
        })
      }
      if (descriptionCriticalItem) {
        Object.assign(updateStockBody, {
          description: descriptionCriticalItem
        })
      }

      await axios.put(
        `${process.env.REACT_APP_OPMS}/critical-items/stock/${criticalItem.id}`,
        updateStockBody
      )
      setError('')
      handleClose()
      window.location.reload()
    } catch (error) {
      setError('Algo deu errado, tente novamente')
    }
  }

  return (
    <>
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Almoxarifado</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveStockSubmit}>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Observação Estoque</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a observação..."
                defaultValue={stockCriticalItem}
                onChange={(e) => setStockCriticalItem(e.target.value)}
                onKeyPress={KeyPressd}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Descrição do Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite descrição..."
                defaultValue={descriptionCriticalItem}
                onChange={(e) => setDescriptionCriticalItem(e.target.value)}
                onKeyPress={KeyPressd}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="exapleForm.ControlInput1">
              <Form.Label>Onde Usado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite onde é usado..."
                defaultValue={usedCriticalItem}
                onChange={(e) => setUsedCriticalItem(e.target.value)}
                onKeyPress={KeyPressd}
              />
            </Form.Group>
          </Modal.Body>
          <p style={{ color: 'red', textAling: 'center' }}>{error}</p>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="warning" onClick={handleSaveStockSubmit}>
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default UpdateStockCriticalItemsModal
