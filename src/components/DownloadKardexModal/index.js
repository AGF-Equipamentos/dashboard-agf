import { Alert, Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { useCallback, useState } from 'react'
import { useDownloadFile } from '../../hooks/useDownloadFiles'

const DownloadExcelKardexModal = ({
  isOpen,
  handleClose,
  searchValue = '',
  produto = 'Código'
}) => {
  const [showAlert, setShowAlert] = useState(false)

  const onErrorDownloadFile = () => {
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  const downloadExcelFile = useCallback(() => {
    const search = searchValue.toUpperCase().trim()
  })

  // await api.get(`/kardex`, {
  //   params: {
  //     filial: '',
  //     produto: '',
  //     data_inicio: '',
  //     data_fim: '',
  //     armazem_inicio: '',
  //     armazem_fim: ''
  //   }
  // })

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
export default DownloadExcelKardexModal
