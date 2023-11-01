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
  Spinner,
  Badge,
  DropdownButton,
  Dropdown
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'
import axios from 'axios'
import NewCriticalItemsModal from '../../components/NewCriticalItemsModal'
import ExcludeCriticalItemsModal from '../../components/ExcludeCriticalItemsModal'
import UpdateTypeCritialItemsModal from '../../components/UpdateTypeCriticaItemsModal'
import DownloadExcelCriticalItemsModal from '../../components/DownloadCriticalItemsModal'
import { ButtonBase } from '@material-ui/core'

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
  const [
    showDownloadExcelCriticalItemsModal,
    setShowDownloadExcelCriticalItemsModal
  ] = useState(false)
  const history = useHistory()

  const [filter, setFilter] = useState('Código')

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_OPMS}/critical-items`
      )

      setItems(response.data)
    }

    fetchItems()
  }, [])

  // handle redirecting from other pages
  useEffect(() => {
    if (history.location.state) {
      setSearchValue(history.location.state.ci_part_number)
      setFilter(history.location.state.ci_filter)
      handleSubmit(
        history.location.state.ci_part_number,
        history.location.state.ci_filter
      )
    }
    // eslint-disable-next-line
  }, [history.location.state]);

  async function handleSubmit(searchParam = '', filterParam = 'Código') {
    let part_numberInformation
    const search = searchParam || searchValue.toUpperCase().trim()
    const filterHandler = filterParam || searchValue.toUpperCase().trim()

    setItems([])
    setSearchPlaceholder(
      <Spinner animation="border" size="sm" variant="warning" />
    )

    if (search === '') {
      part_numberInformation = await axios.get(
        `${process.env.REACT_APP_OPMS}/critical-items`
      )
      if (part_numberInformation.data.length === 0) {
        setSearchPlaceholder('Não encontramos nenhum item...')
      }
    } else {
      if (filterHandler === 'Código') {
        part_numberInformation = await axios.get(
          `${process.env.REACT_APP_OPMS}/critical-items`,
          {
            params: {
              part_number: search
            }
          }
        )
        if (part_numberInformation.data.length === 0) {
          setSearchPlaceholder('Não encontramos nenhum item...')
        }
      }
      if (filter === 'Descrição') {
        part_numberInformation = await axios.get(
          `${process.env.REACT_APP_OPMS}/critical-items`,
          {
            params: {
              description: search
            }
          }
        )
        if (part_numberInformation.data.length === 0) {
          setSearchPlaceholder('Não encontramos nenhum item...')
        }
      }

      if (filter === 'Responsável') {
        part_numberInformation = await axios.get(
          `${process.env.REACT_APP_OPMS}/critical-items`,
          {
            params: {
              responsible: search
            }
          }
        )
        if (part_numberInformation.data.length === 0) {
          setSearchPlaceholder('Não encontramos nenhum item...')
        }
      }
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
  async function handleOpenDownloadExcelCriticalItems() {
    setShowDownloadExcelCriticalItemsModal(true)
  }
  async function handleCloseDownloadExcelCriticalItems() {
    setShowDownloadExcelCriticalItemsModal(false)
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
      <DownloadExcelCriticalItemsModal
        isOpen={showDownloadExcelCriticalItemsModal}
        handleClose={handleCloseDownloadExcelCriticalItems}
        filter={filter}
        searchValue={searchValue}
      />

      <Container fluid className="justify-content-center">
        <Row>
          <Col align="left" style={{ marginBottom: -50, marginTop: 12 }}>
            <ButtonBase onClick={() => history.go(-1)}>
              <FiArrowLeft color="#999" />
            </ButtonBase>
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
          <Row>
            <Col>
              <DropdownButton
                as={InputGroup.Append}
                variant="outline-warning"
                title={filter}
                id="input-group-dropdown-1"
              >
                <Dropdown.Item onClick={() => setFilter('Código')}>
                  Código
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter('Descrição')}>
                  Descrição
                </Dropdown.Item>

                <Dropdown.Item onClick={() => setFilter('Responsável')}>
                  Responsável
                </Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col>
              <InputGroup.Append>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant="outline-warning"
                >
                  Enviar
                </Button>
              </InputGroup.Append>
            </Col>
            <Col>
              <InputGroup.Append>
                <Button
                  onClick={handleOpenNewCriticalItemsModal}
                  type="submit"
                  variant="outline-warning"
                >
                  Novo
                </Button>
              </InputGroup.Append>
            </Col>
            <Col>
              <InputGroup.Append>
                <Button
                  onClick={handleOpenDownloadExcelCriticalItems}
                  type="submit"
                  variant="outline-warning"
                >
                  Download
                </Button>
              </InputGroup.Append>
            </Col>
          </Row>
        </InputGroup>

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>DESCRIÇÃO</th>
              <th>OBS ESTOQUE</th>
              <th>OBS COMPRAS</th>
              <th>ONDE USADO</th>
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
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        history.replace('/critical-items', {
                          ...history.location.state,
                          ci_part_number: searchValue,
                          ci_filter: filter
                        })
                        history.push('/prodash', {
                          ...history.location.state,
                          product: ci.part_number
                        })
                      }}
                    >
                      {ci.part_number}
                    </Button>
                  </td>
                  <td>{ci.description}</td>
                  <td>{ci.stock_obs}</td>
                  <td>{ci.purchase_obs}</td>
                  <td>{ci.used_obs}</td>
                  <td>
                    <Badge pill variant="danger">
                      {ci.responsible}
                    </Badge>{' '}
                  </td>
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
