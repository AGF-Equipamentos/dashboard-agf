import { Alert, Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useDownloadFile } from '../../hooks/useDownloadFiles'

const DownloadExcelCriticalItemsModal = ({
  isOpen,
  handleClose,
  searchValue = '',
  filter = 'Código'
}) => {
  const [showAlert, setShowAlert] = useState(false)

  const onErrorDownloadFile = () => {
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  const downloadExcelFile = useCallback(() => {
    console.log(searchValue, filter)
    const search = searchValue.toUpperCase().trim()

    if (search === '') {
      return axios.get(
        `${process.env.REACT_APP_OPMS}/critical-items/download`,
        {
          responseType: 'blob'
        }
      )
    }

    if (filter === 'Descrição') {
      return axios.get(
        `${process.env.REACT_APP_OPMS}/critical-items/download`,
        {
          responseType: 'blob',
          params: {
            description: search
          }
        }
      )
    }

    if (filter === 'Responsável') {
      return axios.get(
        `${process.env.REACT_APP_OPMS}/critical-items/download`,
        {
          responseType: 'blob',
          params: {
            responsable: search
          }
        }
      )
    }

    return axios.get(`${process.env.REACT_APP_OPMS}/critical-items/download`, {
      responseType: 'blob',
      params: {
        part_number: searchValue
      }
    })
  }, [filter, searchValue])

  const { ref, url, download } = useDownloadFile({
    apiDefinition: downloadExcelFile,
    onError: onErrorDownloadFile
  })

  return (
    <>
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fazer download da tabela?</Modal.Title>
        </Modal.Header>
        <Form>
          <Alert variant="danger" show={showAlert}>
            Algo deu errado, tente novamente
          </Alert>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <a href={url} download="items.xlsx" className="hidden" ref={ref} />
            <Button variant="warning" onClick={download}>
              Download
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default DownloadExcelCriticalItemsModal
