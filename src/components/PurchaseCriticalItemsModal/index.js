import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const UpdatePurchaseCriticalItemsModal = ({
  isOpen,
  handleClose,
  criticalItem
}) => {
  const [purchaseCriticalItem, setPurchaseCriticalItem] = useState('')
  const [responsableCriticalItem, setResponsableCriticalItem] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    setPurchaseCriticalItem(criticalItem.purchase_obs)
    setResponsableCriticalItem(criticalItem.responsable)
  }, [criticalItem])
  const handleSavePurchaseSubmit = async () => {
    try {
      const updatePurchaseBody = {}

      if (purchaseCriticalItem !== '') {
        Object.assign(updatePurchaseBody, {
          purchase_obs: purchaseCriticalItem
        })
      }

      if (responsableCriticalItem !== '') {
        Object.assign(updatePurchaseBody, {
          responsable: responsableCriticalItem
        })
      }

      await axios.put(
        `http://localhost:3334/critical-items/purchase/${criticalItem.id}`,
        updatePurchaseBody
      )
      setError('')
      handleClose()
      window.location.reload()
    } catch (error) {
      setError('Algo deu errro, tente novamente')
    }
  }
  return (
    <>
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Compras</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSavePurchaseSubmit}>
          <Modal.Body>
            <Form.Group controlId="exapleForm.ControlInput1">
              <Form.Label>Observação Compras</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite observação..."
                defaultValue={purchaseCriticalItem}
                onChange={(e) => setPurchaseCriticalItem(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="exapleForm.ControlInput1">
              <Form.Label>Responsável</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o responsavel..."
                defaultValue={responsableCriticalItem}
                onChange={(e) => setResponsableCriticalItem(e.target.value)}
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
            <Button variant="outline-warning" onClick={handleClose}>
              Fechar
            </Button>
            <Button
              variant="outline-warning"
              onClick={handleSavePurchaseSubmit}
            >
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default UpdatePurchaseCriticalItemsModal
