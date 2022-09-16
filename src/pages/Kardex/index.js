import { useState } from 'react'
import { Table, Button, Row, Col, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import api from '../../services/api'

export default function Kardex() {
  const [filialValue, setFilialValue] = useState('')
  const [productValue, setProductValue] = useState(null)
  const [dataIniciolValue, setDataInicioValue] = useState('')
  const [dataFimValue, setDataFimValue] = useState('')
  const [armazemInicioValue, setArmazemInicioValue] = useState('')
  const [armazemFimValue, setArmazemFimValue] = useState('')
  const [kardexRows, setKardexRows] = useState([])
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    'Pesquise por um produto...'
  )

  async function handleSubmit() {
    const kardexRowsData = await api.get(`/kardex`, {
      params: {
        ...(filialValue && { filial: filialValue.toUpperCase().trim() }),
        ...(productValue && { produto: productValue.toUpperCase().trim() }),
        ...(dataIniciolValue && {
          data_inicio: dataIniciolValue.toUpperCase().trim()
        }),
        ...(dataFimValue && { data_fim: dataFimValue.toUpperCase().trim() }),
        ...(armazemInicioValue && {
          armazem_inicio: armazemInicioValue.toUpperCase().trim()
        }),
        ...(armazemFimValue && {
          armazem_fim: armazemFimValue.toUpperCase().trim()
        })
      }
    })

    setKardexRows(kardexRowsData.data)
  }

  // submit on press Enter
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Cont>
      <Container fluid>
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
        <h1 className="text-center">Consulta Kardex</h1>
        <Container fluid className="mb-4">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Filial</Form.Label>
                <Form.Control
                  name="filial"
                  onKeyPress={keyPressed}
                  placeholder="0101"
                  onChange={(e) => setFilialValue(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Produto</Form.Label>
                <Form.Control
                  placeholder="Digite um produto..."
                  onChange={(e) => setProductValue(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Data Inicio</Form.Label>
                <Form.Control
                  type="text"
                  onFocus={(e) => (e.target.type = 'date')}
                  placeholder="01/01/2000"
                  onChange={(e) => setDataInicioValue(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Data Fim</Form.Label>
                <Form.Control
                  type="text"
                  onFocus={(e) => (e.target.type = 'date')}
                  placeholder="01/01/2099"
                  onChange={(e) => setDataFimValue(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Armazem Inicio</Form.Label>
                <Form.Control
                  placeholder="01"
                  onChange={(e) => setArmazemInicioValue(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Armazem Fim</Form.Label>
                <Form.Control
                  placeholder="01"
                  onChange={(e) => setArmazemFimValue(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="outline-warning"
                onClick={handleSubmit}
                type="submit"
                className="w-100"
              >
                Enviar
              </Button>
            </Col>
          </Row>
        </Container>
        <Container fluid className="mb-6">
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
                {/* <th>SERIE</th> */}
                <th>DOCUMENTO / SERIE</th>
                {/* <th>CODIGO</th> */}
                {/* <th>LOJA</th> */}
                {/* <th>NOME</th> */}
                {/* <th>NF ORIGEM</th> */}
                <th>QTDE.</th>
                <th>CUSTO UNITARIO</th>
                <th>CUSTO TOTAL</th>
                {/* <th>SEQUENCIA</th> */}
                {/* <th>SEQUEN. CALC.</th> */}
                <th>USUARIO</th>
                <th>SALDO QTDE.</th>
                <th>SALDO CUSTO TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {kardexRows.length !== 0 ? (
                kardexRows.map((product) => (
                  <tr
                    style={product['Qtde.'] < 0 ? { color: 'red' } : {}}
                    key={product.PRODUTO}
                  >
                    <td>{product['Filial']}</td>
                    <td>
                      {new Intl.DateTimeFormat('pt-BR').format(
                        new Date(product['Data Mov.'])
                      )}
                    </td>
                    <td>{product['Movimento']}</td>
                    <td>{product['Produto']}</td>
                    <td>{product['Descr. Produto']}</td>
                    <td>{product['TES/TM']}</td>
                    <td>{product['CFOP']}</td>
                    <td>{product['Armazem']}</td>
                    {/*<td>{product['Serie']}</td>*/}
                    <td>
                      {product['Documento']}
                      {product['Serie'] && `/ ${product['Serie']}`}
                    </td>
                    {/* <td>{product['Codigo']}</td> */}
                    {/* <td>{product['Loja']}</td> */}
                    {/* <td>{product['Nome']}</td> */}
                    {/* <td>{product['NF Origem']}</td> */}
                    <td>
                      {product['Qtde.'] < 0 ? (
                        <p className="text-danger">{product['Qtde.']}</p>
                      ) : (
                        product['Qtde.']
                      )}
                    </td>
                    <td>
                      {product['Custo Unitario'] < 0 ? (
                        <p className="text-danger">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(new Number(product['Custo Unitario']) * -1)}
                        </p>
                      ) : (
                        new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(new Number(product['Custo Unitario']))
                      )}
                    </td>
                    <td>
                      {product['Custo Unitario'] < 0 ? (
                        <p className="text-danger">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(new Number(product['Custo Total']) * -1)}
                        </p>
                      ) : (
                        new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(new Number(product['Custo Total']))
                      )}
                    </td>
                    {/* <td>{product['Sequencia']}</td> */}
                    {/* <td>{product['Seq. Calc.']}</td> */}
                    <td>{product['Usuario']}</td>
                    <td>{product['saldoQtde']}</td>
                    <td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(new Number(product['saldoCustoTotal']))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15">{searchPlaceholder}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </Container>
    </Cont>
  )
}
