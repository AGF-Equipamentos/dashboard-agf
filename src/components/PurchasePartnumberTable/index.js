import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import PartnumberStockTable from '../PartnumberStockTable'

export default function PurchasePartnumberTable({ products }) {
  const history = useHistory()
  const [estoques, setEstoques] = useState([])
  const [PCs, setPCs] = useState([])
  const [SCs, setSCs] = useState([])
  const [pcPlaceholder, setPcPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />
  )
  const [scPlaceholder, setScPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />
  )
  const [saldosPlaceholder, setSaldosPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />
  )

  useEffect(() => {
    async function loadEstoques() {
      const saldos = await api.get(`/estoques`, {
        params: {
          produto: products
        }
      })
      if (saldos.data.length === 0) {
        setSaldosPlaceholder('Parece que não há saldo...')
      } else {
        setEstoques(saldos.data)
      }

      const pcs = await api.get(`/pcs`, {
        params: {
          filial: '0101',
          legenda: 'PENDENTE' && 'ATENDIMENTO PARCIALMENTE',
          produto: products
        }
      })
      if (pcs.data.length === 0) {
        setPcPlaceholder('Parece que não há PCs...')
      } else {
        setPCs(pcs.data)
      }

      const scs = await api.get(`/scs`, {
        params: {
          filial: '0101',
          aberto: true,
          produto: products
        }
      })
      if (scs.data.length === 0) {
        setScPlaceholder('Parece que não há SCs...')
      } else {
        setSCs(scs.data)
      }
    }
    loadEstoques()
  }, [])

  return (
    // ..::|PEDIDO DE COMPRAS|::..
    <Container>
      <Row>
        <Col>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <td>PC</td>
                <td>COD</td>
                <td>QTD</td>
                <td>QTD_ENT</td>
                <td>DATA</td>
                <td>FORN</td>
              </tr>
            </thead>
            <tbody>
              {PCs.length > 0 ? (
                PCs.map((pc) => (
                  <tr key={pc.PEDIDO.concat('', pc.PRODUTO)}>
                    <td>{pc.PEDIDO}</td>
                    <td>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() =>
                          history.push('/prodash', {
                            ...history.location.state,
                            product: pc.PRODUTO
                          })
                        }
                      >
                        {pc.PRODUTO}
                      </Button>
                    </td>
                    <td>{pc.QTD}</td>
                    <td>{pc.QTD_ENT}</td>
                    <td>{pc.ENTREGA}</td>
                    <td>{pc.DESC_FORN}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">{pcPlaceholder}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* // ..::|SOLICITAÇÃO DE COMPRAS|::.. */}
      <Row>
        <Col>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>SC</th>
                <th>COD</th>
                <th>QTD</th>
                <th>QTD_ENT</th>
                <th>DATA</th>
                <th>OBS</th>
              </tr>
            </thead>
            <tbody>
              {SCs.length > 0 ? (
                SCs.map((sc) => (
                  <tr key={sc.SC.concat('', sc.PRODUTO)}>
                    <td>{sc.SC}</td>
                    <td>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() =>
                          history.push('/prodash', {
                            ...history.location.state,
                            product: sc.PRODUTO
                          })
                        }
                      >
                        {sc.PRODUTO}
                      </Button>
                    </td>
                    <td>{sc.QTD}</td>
                    <td>{sc.QTD_ENT}</td>
                    <td>{sc.ENTREGA}</td>
                    <td>{sc.OBS}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">{scPlaceholder}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
