import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Button, Modal, Overlay, Tooltip } from 'react-bootstrap'
import { DataGrid } from '@material-ui/data-grid'
import { Container as Cont } from './styles'
import { generatePrintCode } from '../../utils/generatePrintCode'
import { copyToClipboardWithoutHttps } from '../../utils/copyToClipboardWithoutHttps'

export default function PrintModal({ isOpen, handleClose, pcsData }) {
  const [selectionModel, setSelectionModel] = useState([])
  const [dataSelectionModel, setDataSelectionModel] = useState([])
  const [rows, setRows] = useState([])

  function handlePreClose() {
    setSelectionModel([])
    handleClose()
  }

  useEffect(() => {
    setRows(pcsData)
  }, [pcsData])

  const handlePrintPC = () => {
    copyToClipboardWithoutHttps(generatePrintCode(dataSelectionModel))
    // only with https
    // navigator.clipboard.writeText(generatePrintCode(dataSelectionModel))
    setShow(!show)
    setTimeout(() => {
      setShow(false)
    }, 1500)
  }

  const [show, setShow] = useState(false)
  const target = useRef(null)

  const columns = [
    { field: 'PRODUTO', headerName: 'PRODUTO', width: 150 },
    { field: 'DESCRICAO', headerName: 'DESCRICAO', width: 720 },
    {
      field: 'SALDO',
      headerName: 'SALDO',
      width: 150,
      type: 'number',
      editable: true
    }
  ]

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, value }) => {
      if (field === 'SALDO') {
        const updatedRows = rows.map((row) => {
          if (row.id === id) {
            return { ...row, SALDO: Number(value) }
          }
          return row
        })
        setRows(updatedRows)
        const newSelectionData = updatedRows.filter((row) =>
          selectionModel.includes(row.id)
        )
        setDataSelectionModel(newSelectionData)
      }
    },
    [rows, selectionModel]
  )

  return (
    <Cont>
      <Modal size="xl" show={isOpen} onHide={handlePreClose}>
        <Modal.Header closeButton>
          <Modal.Title>Gerar código para impressão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', height: 350 }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(newSelection) => {
                  setSelectionModel(newSelection)
                  const newSelectionData = rows.filter((row) =>
                    newSelection.includes(row.id)
                  )
                  setDataSelectionModel(newSelectionData)
                }}
                selectionModel={selectionModel}
                onCellEditCommit={(props) =>
                  handleEditCellChangeCommitted(props)
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePreClose}>
            Fechar
          </Button>
          <Button ref={target} variant="warning" onClick={handlePrintPC}>
            Gerar código
          </Button>
          <Overlay target={target.current} show={show} placement="top">
            {(props) => (
              <Tooltip {...props}>
                Copiado para a área de transferência!
              </Tooltip>
            )}
          </Overlay>
        </Modal.Footer>
      </Modal>
    </Cont>
  )
}
