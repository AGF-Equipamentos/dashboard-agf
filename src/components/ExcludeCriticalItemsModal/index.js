import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const ExcludeCriticalItemsModal = ({ isOpen, handleClose, criticalItem }) => {
  const [error, setError] = useState(Error())
  const handleExcludeSubmit = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_OPMS}/critical-items/${criticalItem.id}`
      )

      handleClose()
      window.location.reload()
    } catch (error) {
      setError(error)
    }
  }
  return (
    <>
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Excluir Item Crítico</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleExcludeSubmit}>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleExcludeSubmit}>
              Excluir
            </Button>
          </Modal.Footer>
        </Form>
        <p
          style={{
            color: 'red',
            textAlign: 'center'
          }}
        >
          {error.message}
        </p>
      </Modal>
    </>
  )
}
export default ExcludeCriticalItemsModal
