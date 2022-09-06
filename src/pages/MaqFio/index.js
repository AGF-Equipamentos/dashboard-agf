import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import api from '../../services/api'
import { ButtonBase } from '@material-ui/core'

export default function MaqFio() {
  const [estoques, setEstoques] = useState([])
  const [saldosPlaceholder, setSaldosPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />
  )
  const history = useHistory()

  useEffect(() => {
    async function loadEstoques() {
      const saldos = await api.get(`/estoques`, {
        params: {
          produto: ['MF25P2P', 'MF40P2', 'MF75P2', 'VB45E']
        }
      })
      if (saldos.data.lenght === 0) {
        setSaldosPlaceholder('Parece que não há saldo...')
      } else {
        console.log(saldos.data)
        setEstoques(saldos.data)
      }
    }
    loadEstoques()
  }, [])

  return (
    <Cont>
      <Container fluid className="justify-content-center">
        <Row>
          <Col align="left" style={{ marginBottom: -50, marginTop: 12 }}>
            <ButtonBase onClick={() => history.go(-1)}>
              <FiArrowLeft color="#999" />
            </ButtonBase>
          </Col>
        </Row>
        <h1>Máquina de Fio</h1>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>FILIAL</th>
              <th>CÓDIGO</th>
              <th>SALDO</th>
              <th>ARMAZEM</th>
            </tr>
          </thead>

          <tbody>
            {estoques.length > 0 ? (
              estoques.map((estoque) => (
                <tr key={estoque.FILIAL.concat('', estoque.PRODUTO)}>
                  <td>{estoque.FILIAL}</td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() =>
                        history.push('/prodash', {
                          ...history.location.state,
                          product: estoque.PRODUTO
                        })
                      }
                    >
                      {estoque.PRODUTO}
                    </Button>
                  </td>
                  <td>{estoque.SALDO}</td>
                  <td>{estoque.ARMAZEM}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">{saldosPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Cont>
  )
}
