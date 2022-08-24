import { useState } from 'react'
import {
  Table,
  Button,
  Row,
  Col,
  Spinner,
  Container,
  Form
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont, TableContainer } from './styles'

import api from '../../services/api'

export default function Kardex() {
  const [searchValue, setSearchValue] = useState('')
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('Pesquisar por produto')
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    'Pesquise por um produto...'
  )

  async function handleSubmit() {
    const search = searchValue.toUpperCase().trim()
    let response
    setProducts([])
    setSearchPlaceholder(
      <Spinner animation="border" size="sm" variant="warning" />
    )
    if (filter === 'Código') {
      response = await api.get(`/kardex${search}`)
    }
    if (response.data.length === 0) {
      setSearchPlaceholder('Não encontramos nenhum produto...')
    }
    setProducts(response.data)
  }

  // submit on press Enter
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Cont>
      <Container fluid className="justify-content-center">
        <Row>
          <Col align="left" style={{ marginBottom: -50, marginTop: 12 }}>
            <Link
              to={{
                pathname: '/'
              }}
            >
              <FiArrowLeft color="#999" />
            </Link>
          </Col>
        </Row>
        <h1>Consulta Kardex</h1>
        <TableContainer>
          <table>
            <tr>
              <Form.Group>
                <Form.Label>Filial</Form.Label>
                <Form.Control placeholder="0101" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Produto</Form.Label>
                <Form.Control placeholder="VIXMOT0011" />
              </Form.Group>
            </tr>
          </table>
          <table>
            <tr>
              <Form.Group>
                <Form.Label>Data Inicio</Form.Label>
                <Form.Control placeholder="01/08/2022" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Data Fim</Form.Label>
                <Form.Control placeholder="31/08/2022" />
              </Form.Group>
            </tr>
          </table>
          <table>
            <tr>
              <Form.Group>
                <Form.Label>Armazem Inicio</Form.Label>
                <Form.Control placeholder="01" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Armazem Fim</Form.Label>
                <Form.Control placeholder="01" />
              </Form.Group>
            </tr>
          </table>
        </TableContainer>
        <Button variant="outline-warning" onClick={handleSubmit} type="submit">
          Enviar
        </Button>

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>FILIAL</th>
              <th>DATA MOV.</th>
              <th>MOVIMENTO</th>
              <th>PRODUTO</th>
              <th>DESCR. PRODUTOS</th>
              <th>TES/TM</th>
              <th>CFOP</th>
              <th>ARMAZEM</th>
              <th>SERIE</th>
              <th>DOCUMENTO</th>
              <th>CODIGO</th>
              <th>LOJA</th>
              <th>NOME</th>
              <th>NF ORIGEM</th>
              <th>QTDE</th>
              <th>CUSTO UNITARIO</th>
              <th>CUSTO TOTAL</th>
              <th>SEQUENCIA</th>
              <th>SEQUEN. CALC.</th>
              <th>USUARIO</th>
              <th>SALDO QTDE.</th>
              <th>SALDO TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {products.length !== 0 ? (
              products.map((product) => (
                <tr key={product.PRODUTO}>
                  <td>{product.FILIAL}</td>
                  <td>{product.DATA_MOV}</td>
                  <td>{product.MOVIMENTO}</td>
                  <td>{product.PRODUTO}</td>
                  <td>{product.DESCR_PRODUTOS}</td>
                  <td>{product.TES_TM}</td>
                  <td>{product.CFOP}</td>
                  <td>{product.ARMAZEM}</td>
                  <td>{product.SERIE}</td>
                  <td>{product.DOCUMENTO}</td>
                  <td>{product.CODIGO}</td>
                  <td>{product.LOJA}</td>
                  <td>{product.NOME}</td>
                  <td>{product.NF_ORIGEM}</td>
                  <td>{product.QTDE}</td>
                  <td>{product.CUSTO_UNITARIO}</td>
                  <td>{product.CUSTO_TOTAL}</td>
                  <td>{product.SEQUINCIA}</td>
                  <td>{product.SEQUEN_CALC}</td>
                  <td>{product.USUARIO}</td>
                  <td>{product.SALDO_QTDE}</td>
                  <td>{product.SALDO_CUSTO_TOTAL}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="22">{searchPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Cont>
  )
}
