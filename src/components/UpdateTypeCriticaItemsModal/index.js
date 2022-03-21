import { Button, Form, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import UpdatePurchaseCriticalItemsModal from '../PurchaseCriticalItemsModal'

const UpdateTypeCritialItemsModal = ({ isOpen, handleClose, criticalItem }) => {
  const [showPurchaseCriticalItemsModal, setShowPurchaseCritiicalItemsModal] =
    useState(false)
  // console.log(criticalItem)

  async function handleOpenUpdatePurchase() {
    setShowPurchaseCritiicalItemsModal(true)
    handleClose()
  }
  async function handleClosePurchaseCriticalItemsModal() {
    setShowPurchaseCritiicalItemsModal(false)
  }
  return (
    <>
      <UpdatePurchaseCriticalItemsModal
        isOpen={showPurchaseCriticalItemsModal}
        handleClose={handleClosePurchaseCriticalItemsModal}
        criticalItem={criticalItem}
      />
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Escolha o tipo de atualização</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Button variant="warning" onClick={handleOpenUpdatePurchase}>
                  Compras
                </Button>
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
