import { Button, Form, Modal } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import UpdatePurchaseCriticalItemsModal from '../PurchaseCriticalItemsModal'
import UpdateStockCriticalItemsModal from '../StockCriticalItemsModal'

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
    handleClose()
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
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Escolha o tipo de atualização</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Row className="justfy-content-center">
              <Col className=" justfy-content-center aling-items-center">
                <Form.Group>
                  <Row className="aling-items-center">
                    <Col></Col>
                    <Col>
                      <Button
                        block
                        type="button"
                        variant="outline-warning"
                        onClick={handleOpenUpdatePurchase}
                      >
                        Compras
                      </Button>
                    </Col>
                    <Col></Col>
                  </Row>
                </Form.Group>

                <Form.Group>
                  <Row className="aling-items-center">
                    <Col></Col>
                    <Col>
                      <Button
                        block
                        variant="outline-warning"
                        onClick={handleOpenUpdateStock}
                      >
                        Almoxarifado
                      </Button>
                    </Col>
                    <Col></Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateTypeCritialItemsModal
