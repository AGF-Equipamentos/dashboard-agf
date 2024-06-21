import { Button, Modal, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Container as Cont } from './styles'

export default function LastPCsModal({ isOpen, handleClose, pcsData }) {
  const history = useHistory()
  return (
    <Cont>
      <Modal size="xl" show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Últimos documentos de entrada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>PC</th>
                <th>QTD</th>
                <th>PREÇO</th>
                <th>ENTREGUE</th>
                <th>FORN</th>
              </tr>
            </thead>
            <tbody>
              {pcsData.length !== 0 ? (
                pcsData.map((pc, index) => (
                  <tr key={index}>
                    <td>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                          history.replace('/prodash', {
                            ...history.location.state,
                            product: pc.PRODUTO
                          })
                          history.push('/pcs', {
                            ...history.location.state,
                            pc_number: pc.PEDIDO,
                            pc_filter: 'Número'
                          })
                        }}
                      >
                        {pc.PEDIDO}
                      </Button>
                    </td>
                    <td>{pc.QTD}</td>
                    <td>{pc.PRECO}</td>
                    <td>{pc.ENTREGUE}</td>
                    <td>{pc.DESC_FORN}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">Algo deu errado</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Cont>
  )
}
