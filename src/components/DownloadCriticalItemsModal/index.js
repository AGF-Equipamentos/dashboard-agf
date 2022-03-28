import React, { UseState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Title } from './styles'

const DownloadExcelCriticalItemsModal = ({
  isOpen,
  handleClose,
  criticalItems
}) => {
  const handleDownloadExcel = async () => {}
  return (
    <>
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fazer dowload da tabela?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleDownloadExcel}>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleDownloadExcel}>
              Fazer Download
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default DownloadExcelCriticalItemsModal
