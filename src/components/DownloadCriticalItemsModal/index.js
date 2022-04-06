import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'
const DownloadExcelCriticalItemsModal = ({
  isOpen,
  handleClose,
  // criticalItems,
  search,
  filter
}) => {
  const handleDownloadExcel = async () => {
    // let part_numberInformation
    // if (filter === 'Código') {
    //   part_numberInformation = await axios.get(
    //     `${process.env.REACT_APP_LOCALHOST}/critical-items`,
    //     {
    //       params: {
    //         part_number: search
    //       }
    //     }
    //   )
    // }
    // if (filter === 'Descrição') {
    //   part_numberInformation = await axios.get(
    //     `${process.env.REACT_APP_LOCALHOST}/critical-items`,
    //     {
    //       params: {
    //         description: search
    //       }
    //     }
    //   )
    // }
    // if (filter === 'Respinsável') {
    //   part_numberInformation = await axios.get(
    //     `${process.env.REACT_APP_LOCALHOST}/critical-items`,
    //     {
    //       params: {
    //         responsable: search
    //       }
    //     }
    //   )
    // }
  }
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
