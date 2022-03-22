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
      const errorMessage = error.response.data.message
      if (errorMessage === '"responsable" is not allowed to be empty') {
        return setError('Responsável é obrigatório')
      }
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
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="warning" onClick={handleSaveStockSubmit}>
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
        <p
          style={{
            color: 'red',
            textAlign: 'center'
          }}
        >
          {error.mensage}
        </p>
      </Modal>
    </>
  )
}

export default UpdateStockCriticalItemsModal
