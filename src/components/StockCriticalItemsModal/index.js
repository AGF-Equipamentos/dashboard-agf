import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const UpdateStockCriticalItemsModal = ({
  isOpen,
  handleClose,
  criticalItem
}) => {
  const [stockCriticalItem, setStockCriticalItem] = useState('')
  const [usedCriticalItem, setUsedCriticalItem] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setStockCriticalItem(criticalItem.stock_obs)
    setUsedCriticalItem(criticalItem.used_obs)
  }, [criticalItem])
  const handleSaveStockSubmit = async () => {
    try {
      const updateStockBody = {}

      if (stockCriticalItem !== '') {
        Object.assign(updateStockBody, {
          stock_obs: stockCriticalItem
        })
      }
      if (usedCriticalItem !== '') {
        Object.assign(updateStockBody, {
          used_obs: usedCriticalItem
        })
      }
      await axios.put(
        `http://localhost:3334/critical-items/stock/${criticalItem.id}`,
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
          <Modal.Title>Estoque</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveStockSubmit}>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Observação Estoque</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a observação"
                defaultValue={stockCriticalItem}
                onChange={(e) => setStockCriticalItem(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="exapleForm.ControlInput1">
              <Form.Label>Onde Usado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite onde é usado..."
                defaultValue={usedCriticalItem}
                onChange={(e) => setUsedCriticalItem(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <p style={{ color: 'red', textAling: 'center' }}>{error}</p>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
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
