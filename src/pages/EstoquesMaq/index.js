import { useEffect, useState, useCallback } from 'react'
import {
  Table,
  Row,
  Col,
  Container,
  InputGroup,
  Dropdown,
  Spinner,
  DropdownButton
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'
import { ButtonBase } from '@material-ui/core'

import api from '../../services/api'

export default function EstoquesMaq() {
  const [estoques, setEstoques] = useState([])
  const [filial, setFilial] = useState([
    '0101',
    '0102',
    '0103',
    '0104',
    '0105',
    '0106'
  ])
  const [estoquesPlaceholder, setEstoquesPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />
  )
  const history = useHistory()

  useEffect(() => {
    async function loadEstoques() {
      const response = await api.get(`/estoques`, {
        params: {
          filial: filial,
          grupo: [
            '0060',
            '0080',
            '0094',
            '0500',
            '0501',
            '0502',
            '0503',
            '0510',
            '0520',
            '0530',
            '0540',
            '0550',
            '0560',
            '0570'
          ]
        }
      })
      if (response.data.length === 0) {
        setEstoquesPlaceholder('Parece que não há nada em estoque...')
      }
      setEstoques(response.data)
    }
    loadEstoques()
  }, [filial])

  const handleFilialPlaceholder = useCallback((filial) => {
    switch (filial) {
      case '0101':
        return 'Matriz'
      case '0102':
        return 'Filial ES'
      case '0103':
        return 'Filial BA'
      case '0104':
        return 'AGF Máquinas Agrícolas'
      case '0105':
        return 'Filial CE'
      case '0106':
        return 'Filial MT'
      default:
        return 'Matriz'
    }
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
        <h1>Estoque de Máquinas</h1>
        <DropdownButton
          as={InputGroup.Append}
          className="mb-3"
          variant="outline-warning"
          title={handleFilialPlaceholder(filial)}
        >
          <Dropdown.Item
            onClick={() =>
              setFilial(['0101', '0102', '0103', '0104', '0105', '0106'])
            }
          >
            Todas
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilial('0101')}>
            Matriz
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilial('0102')}>
            Filial ES
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilial('0103')}>
            Filial BA
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilial('0104')}>
            Filial Máquinas Agrícolas
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilial('0105')}>
            Filial CE
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilial('0106')}>
            Filial MT
          </Dropdown.Item>
        </DropdownButton>

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>FILIAL</th>
              <th>CÓDIGO</th>
              <th>DESCRIÇÃO</th>
              <th>SALDO</th>
              <th>ARMAZEM</th>
            </tr>
          </thead>

          <tbody>
            {estoques.length > 0 ? (
              estoques.map((estoque) => (
                <tr
                  key={estoque.FILIAL.concat(
                    estoque.FILIAL,
                    estoque.PRODUTO,
                    estoque.ARMAZEM
                  )}
                >
                  <td>{estoque.FILIAL}</td>
                  <td>{estoque.PRODUTO}</td>
                  <td>{estoque.DESCRICAO}</td>
                  <td>{estoque.SALDO}</td>
                  <td>{estoque.ARMAZEM}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">{estoquesPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Cont>
  )
}
