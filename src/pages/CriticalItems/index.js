import React, { useState } from 'react'

import {
  Col,
  Container,
  Row,
  Button,
  InputGroup,
  Table,
  Form,
  Spinner
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'
import axios from 'axios'

export default function CriticalItems() {
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    'Pesquise por um código...'
  )
  const [items, setItems] = useState([])
  const [searchValue, setSearchValue] = useState('')

  async function handleSubmit() {
    let part_numberInformation
    const search = searchValue.toUpperCase().trim()
    setItems([])
    setSearchPlaceholder(
      <Spinner animation="border" size="sm" variant="warning" />
    )
    part_numberInformation = await axios.get(
      `${process.env.REACT_APP_LOCALHOST}/critical-items`,
      {
        params: {
          part_number: search
        }
      }
    )
    if (searchValue === '') {
      part_numberInformation = await axios.get(
        `${process.env.REACT_APP_LOCALHOST}/critical-items`
      )
    } else {
      setSearchPlaceholder('Não encontramos a peça...')
    }

    setItems(part_numberInformation.data)
  }
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
        <h1>Itens Críticos</h1>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Pesquisar por um item..."
            arial-label="Pesquisar por um item..."
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={keyPressed}
          />
          <InputGroup.Append>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="outline-warning"
            >
              Enviar
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <Table responsive striped bordered houver>
          <thead>
            <tr>
              <th>NÚMERO DA PEÇA</th>
              <th>DESCRIÇÃO DO ITEM</th>
              <th>OBSERVAÇÃO DO ESTOQUE</th>
              <th>OBSERVAÇÃO DE COMPRAS</th>
              <th>USADO</th>
              <th>RESPONSAVEL</th>
              <th>CRIADO:</th>
              <th>ULT. ATUAL.</th>
            </tr>
          </thead>

          <tbody>
            {items.length !== 0 ? (
              items.map((item) => (
                <tr key={item.part_number}>
                  <td>{item.part_number}</td>
                  <td>{item.description}</td>
                  <td>{item.stock_obs}</td>
                  <td>{item.purchase_obs}</td>
                  <td>{item.used_obs}</td>
                  <td>{item.responsable}</td>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(item.created_at)
                    )}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(item.update_at)
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">{searchPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Cont>
  )
}
