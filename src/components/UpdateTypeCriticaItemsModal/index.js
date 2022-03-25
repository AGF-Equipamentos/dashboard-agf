import { Button, Form, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import UpdatePurchaseCriticalItemsModal from '../PurchaseCriticalItemsModal'
import UpdateStockCriticalItemsModal from '../StockCriticalItemsModal'
import { Title } from './styles'

const UpdateTypeCritialItemsModal = ({ isOpen, handleClose, criticalItem }) => {
  const [showPurchaseCriticalItemsModal, setShowPurchaseCritiicalItemsModal] =
    useState(false)

  const [showStockCriticalItemsModal, setShowStockCriticalItemsModal] =
    useState(false)

  async function handleOpenUpdatePurchase() {
    setShowPurchaseCritiicalItemsModal(true)
    handleClose()
  }
  async function handleClosePurchaseCriticalItemsModal() {
    setShowPurchaseCritiicalItemsModal(false)
  }

  async function handleOpenUpdateStock() {
    setShowStockCriticalItemsModal(true)
    handleClose()
  }
  async function handleCloseUpdateStock() {
    setShowStockCriticalItemsModal(false)
  }

  return (
    <>
      <UpdatePurchaseCriticalItemsModal
        isOpen={showPurchaseCriticalItemsModal}
        handleClose={handleClosePurchaseCriticalItemsModal}
        criticalItem={criticalItem}
      />

      <UpdateStockCriticalItemsModal
        isOpen={showStockCriticalItemsModal}
        handleClose={handleCloseUpdateStock}
        criticalItem={criticalItem}
      />

      <Modal style={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Escolha o tipo de atualização</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group>
              <Button
                variant="outline-warning"
                onClick={handleOpenUpdatePurchase}
              >
                Compras
              </Button>
            </Form.Group>

            <Form.Group>
              <Button variant="outline-warning" onClick={handleOpenUpdateStock}>
                Almoxarifado
              </Button>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateTypeCritialItemsModal
