import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'
const DownloadExcelCriticalItemsModal = ({
  isOpen,
  handleClose,
  searchValue,
  filter
}) => {
  async function handleDownloadExcel() {
    // if (filter === 'Código') {
    //   await axios.get(`${process.env.REACT_APP_LOCALHOST}/critical-items/`, {
    //     params: {
    //       part_number: searchValue
    //     }
    //   })
    // }
    // if (filter === 'Descrição') {
    //   await axios.get(`${process.env.REACT_APP_LOCALHOST}/critical-items`, {
    //     params: {
    //       description: searchValue
    //     }
    //   })
    // }
    // if (filter === 'Responsável') {
    //   await axios.get(`${process.env.REACT_APP_LOCALHOST}/critical-items`, {
    //     params: {
    //       responsable: searchValue
    //     }
    //   })
    // }
  }
  return (
    <>
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fazer download da tabela?</Modal.Title>
        </Modal.Header>
        <Form>
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
