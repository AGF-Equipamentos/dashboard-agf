import React, { useEffect, useState } from 'react'
import { FiEdit, FiXOctagon } from 'react-icons/fi'

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
import NewCriticalItemsModal from '../../components/NewCriticalItemsModal'
import ExcludeCriticalItemsModal from '../../components/ExcludeCriticalItemsModal'
import UpdateTypeCritialItemsModal from '../../components/UpdateTypeCriticaItemsModal'

export default function CriticalItems() {
  const [showNewCriticalItemsModal, setShowNewCriticalItemsModal] =
    useState(false)
  const [showExcludeCriticalItemsModal, setShowExcludeCriticaItemsModal] =
    useState(false)
  const [ciSelected, setCiSelected] = useState({})
  const [
    showUpdateTypeCriticalItemsModal,
    setShowUpdateTypeCriticalItemsModal
  ] = useState(false)

  const [searchPlaceholder, setSearchPlaceholder] = useState(
    'Pesquise por um código...'
  )
  const [items, setItems] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCALHOST}/critical-items`
      )

      setItems(response.data)
    }

    fetchItems()
  }, [])

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

  async function handleOpenNewCriticalItemsModal() {
    setShowNewCriticalItemsModal(true)
  }

  async function handleCloseNewCriticalItemsModal() {
    setShowNewCriticalItemsModal(false)
  }

  async function handleOpenExcludeCriticalItemsModal(ci) {
    setCiSelected(ci)
    setShowExcludeCriticaItemsModal(true)
  }
  async function handleCloseExcludeCriticalItemsModal() {
    setShowExcludeCriticaItemsModal(false)
  }
  async function handleOpenUpdateTypeCriticalItemsModal(ci) {
    setCiSelected(ci)
    setShowUpdateTypeCriticalItemsModal(true)
  }
  async function handleCloseUpdateTypeCriticalItemsModal() {
    setShowUpdateTypeCriticalItemsModal(false)
  }
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Cont>
      <NewCriticalItemsModal
        isOpen={showNewCriticalItemsModal}
        handleClose={handleCloseNewCriticalItemsModal}
      />
      <ExcludeCriticalItemsModal
        isOpen={showExcludeCriticalItemsModal}
        handleClose={handleCloseExcludeCriticalItemsModal}
        criticalItem={ciSelected}
      />
      <UpdateTypeCritialItemsModal
        isOpen={showUpdateTypeCriticalItemsModal}
        handleClose={handleCloseUpdateTypeCriticalItemsModal}
        criticalItem={ciSelected}
      />
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
          <InputGroup.Append>
            <Col></Col>

            <Button
              onClick={handleOpenNewCriticalItemsModal}
              type="submit"
              variant="outline-warning"
            >
              Novo
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>NÚMERO DA PEÇA</th>
              <th>DESCRIÇÃO DO ITEM</th>
              <th>OBSERVAÇÃO DO ESTOQUE</th>
              <th>OBSERVAÇÃO DE COMPRAS</th>
              <th>USADO</th>
              <th>RESPONSÁVEL</th>
              <th>CRIADO:</th>
              <th>ULT. ATUAL.</th>
              <th>AÇÕES</th>
            </tr>
          </thead>

          <tbody>
            {items.length !== 0 ? (
              items.map((ci) => (
                <tr key={ci.id}>
                  <td>{ci.part_number}</td>
                  <td>{ci.description}</td>
                  <td>{ci.stock_obs}</td>
                  <td>{ci.purchase_obs}</td>
                  <td>{ci.used_obs}</td>
                  <td>{ci.responsable}</td>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(ci.created_at)
                    )}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(ci.updated_at)
                    )}
                  </td>

                  <td>
                    <Button
                      block={false}
                      variant="link"
                      style={{ color: 'black', padding: 0 }}
                      onClick={() => handleOpenUpdateTypeCriticalItemsModal(ci)}
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      onClick={() => handleOpenExcludeCriticalItemsModal(ci)}
                      variant="link"
                      style={{ color: 'black', padding: 0 }}
                    >
                      <FiXOctagon />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">{searchPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Cont>
  )
}
