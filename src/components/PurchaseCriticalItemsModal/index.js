import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const UpdatePurchaseCriticalItemsModal = ({
  isOpen,
  handleClose,
  criticalItem
}) => {
  function KeyPressd(event) {
    if (event.key === 'Enter') {
      handleSavePurchaseSubmit()
    }
  }

  const [purchaseObsCriticalItem, setPurchaseObsCriticalItem] = useState('')
  const [responsableCriticalItem, setResponsableCriticalItem] = useState('')
  const [descriptionCriticalItem, setDescriptionCriticalItem] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setPurchaseObsCriticalItem(criticalItem.purchase_obs)
    setResponsableCriticalItem(criticalItem.responsable)
    setDescriptionCriticalItem(criticalItem.description)
  }, [criticalItem])
  const handleSavePurchaseSubmit = async () => {
    try {
      const updatePurchaseBody = {}

      if (purchaseObsCriticalItem) {
        Object.assign(updatePurchaseBody, {
          purchase_obs: purchaseObsCriticalItem
        })
      }
      if (responsableCriticalItem) {
        Object.assign(updatePurchaseBody, {
          responsable: responsableCriticalItem
        })
      }
      if (descriptionCriticalItem) {
        Object.assign(updatePurchaseBody, {
          description: descriptionCriticalItem
        })
      }

      await axios.put(
        `${process.env.REACT_APP_OPMS}/critical-items/purchase/${criticalItem.id}`,
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
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Observação Compras</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite observação..."
                defaultValue={purchaseObsCriticalItem}
                onChange={(e) => setPurchaseObsCriticalItem(e.target.value)}
                onKeyPress={KeyPressd}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a descrição..."
                defaultValue={descriptionCriticalItem}
                onChange={(e) => setDescriptionCriticalItem(e.target.value)}
                onKeyPress={KeyPressd}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="exapleForm.ControlInput1">
              <Form.Label>Responsável</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o responsavel..."
                defaultValue={responsableCriticalItem}
                onChange={(e) => setResponsableCriticalItem(e.target.value)}
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
            <Button variant="warning" onClick={handleSavePurchaseSubmit}>
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default UpdatePurchaseCriticalItemsModal
