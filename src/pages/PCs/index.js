import { useState, useEffect, useCallback } from 'react'
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Badge,
  Row,
  DropdownButton,
  Dropdown,
  Col,
  Spinner,
  Container
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'
import { Container as Cont } from './styles'
import { generatePrintCode } from '../../utils/generatePrintCode'
import LastPCsModal from '../../components/LastPCsModal'

import api from '../../services/api'
import PrintModal from '../../components/PrintModal'
import { ButtonBase } from '@material-ui/core'

export default function PCs() {
  const [searchValue, setSearchValue] = useState('')
  const [dataPCs, setDataPCs] = useState([])
  const [formattedPCs, setFormattedPCs] = useState([])
  const [sumPCs, setSumPCs] = useState([])
  const [pcsPlaceholder, setPcsPlaceholder] = useState('Pesquise por um PC...')
  const [filter, setFilter] = useState('Pesquisar por número do PC')
  const [filial, setFilial] = useState('0101')
  const history = useHistory()
  // LastPCsModal
  const [isPCModalOpen, setIsPCModalOpen] = useState(false)
  const [pcsData, setPcsData] = useState([])

  const handleSubmit = useCallback(
    async (searchInput, filterInput) => {
      let searchVar = searchValue.toUpperCase().trim()
      let filterVar = filter
      let response
      setDataPCs([])
      setPcsPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )

      if (searchInput > 0) {
        searchVar = searchInput.toUpperCase().trim()
      }
      if (filterInput !== undefined) {
        filterVar = filterInput
      }
      if (filterVar === 'CNPJ') {
        response = await api.get(`/pcs`, {
          params: {
            filial,
            legenda: "PENDENTE', 'ATENDIDO PARCIALMENTE",
            cnpj: searchVar
          }
        })
        if (response.data.length === 0) {
          setPcsPlaceholder('Parece que não há um PC com esse CNPJ...')
        }
      } else {
        response = await api.get(`/pcs`, {
          params: {
            filial,
            pc: searchVar
          }
        })
        if (response.data.length === 0) {
          setPcsPlaceholder('Parece que não há um PC com esse número...')
        }
      }

      setDataPCs(response.data)
    },
    [searchValue, filter, filial]
  )

  useEffect(() => {
    const mapPCs = dataPCs.map(
      (pc) => pc.PRECO * (pc.QTD - pc.QTD_ENT) - pc.DESCONTO
    )
    const totalSumPCs = mapPCs.length > 0 ? mapPCs.reduce((a, b) => a + b) : 0
    setSumPCs(totalSumPCs)
  }, [dataPCs])

  // submit on press Enter
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (history.location.state) {
      setFilter(history.location.state.pc_filter)
      setSearchValue(history.location.state.pc_number)
      handleSubmit(
        history.location.state.pc_number,
        history.location.state.pc_filter
      )
    }
    // eslint-disable-next-line
  }, [history.location.state]);

  useEffect(() => {
    const pcParam = new URLSearchParams(history.location.search).get('pc')
    if (pcParam) {
      setFilter('Número')
      setSearchValue(pcParam)
      handleSubmit(pcParam, 'Número')
    }

    // eslint-disable-next-line
  }, [history.location.search]);

  const handlePC = useCallback(
    async (pcInput) => {
      handleSubmit(pcInput, 'Número')
    },
    [handleSubmit]
  )

  // modal handle

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)
  const [textPrint, setTextPrint] = useState('')

  function handleClose() {
    setIsPrintModalOpen(false)
  }

  const handlePrintPC = () => {
    const updatedPCs = dataPCs.map((pc) => ({
      ...pc,
      id: pc.ITEM
    }))
    setFormattedPCs(updatedPCs.filter((row) => row.SALDO > 0))
    const generatedPrintText = generatePrintCode(dataPCs)
    setTextPrint(generatedPrintText.join(''))
    setIsPrintModalOpen(true)
  }

  const handleFilialPlaceholder = useCallback((filial) => {
    switch (filial) {
      case '0101':
        return 'Matriz'
      case '0102':
        return 'Filial ES'
      case '0103':
        return 'Filial BA'
      default:
        return 'Matriz'
    }
  }, [])

  function handlePCModalClose() {
    setIsPCModalOpen(false)
  }

  const handlePCModal = async (partNumber) => {
    let product = partNumber.toUpperCase().trim()

    const response = await api.get(
      `inputdocs?filial=0101&produto=${product}&top=10&desc=true`
    )

    const pcsFormatted = response.data.map((pc) => {
      return {
        ...pc,
        PRECO: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(pc.PRECO)
      }
    })

    setPcsData(pcsFormatted)
    setIsPCModalOpen(true)
  }

  return (
    <Cont>
      <PrintModal
        textPrint={textPrint}
        isOpen={isPrintModalOpen}
        handleClose={handleClose}
        pcsData={formattedPCs}
      />
      <LastPCsModal
        isOpen={isPCModalOpen}
        handleClose={handlePCModalClose}
        pcsData={pcsData}
      />
      <Container fluid className="justify-content-center">
        <Row>
          <Col align="left" style={{ marginBottom: -50, marginTop: 12 }}>
            <ButtonBase onClick={() => history.go(-1)}>
              <FiArrowLeft color="#999" />
            </ButtonBase>
          </Col>
        </Row>
        <h1>Pedidos de Compra</h1>
        <InputGroup className="mb-3" onSubmit={handleSubmit}>
          <FormControl
            placeholder="Pedido de Compra"
            aria-label="Pedido de Compra"
            aria-describedby="basic-addon2"
            autoFocus
            value={searchValue}
            onKeyPress={keyPressed}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <DropdownButton
            as={InputGroup.Append}
            variant="outline-warning"
            title={filter}
            id="input-group-dropdown-2"
          >
            <Dropdown.Item onClick={() => setFilter('Número')}>
              Número
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('CNPJ')}>
              CNPJ
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            as={InputGroup.Append}
            variant="outline-warning"
            title={handleFilialPlaceholder(filial)}
            id="input-group-dropdown-2"
          >
            <Dropdown.Item onClick={() => setFilial('0101')}>
              Matriz
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilial('0102')}>
              Filial ES
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilial('0103')}>
              Filial BA
            </Dropdown.Item>
          </DropdownButton>

          <InputGroup.Append>
            <Button
              onClick={() => handleSubmit()}
              type="submit"
              variant="outline-warning"
              style={{ borderRadius: '0 5px 5px 0' }}
            >
              Enviar
            </Button>
          </InputGroup.Append>
          <Button
            style={{ marginLeft: 5 }}
            variant="outline-warning margin-left"
            onClick={handlePrintPC}
          >
            Gerar código para impressão
          </Button>
        </InputGroup>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>APROVADO</th>
              <th>PC</th>
              <th>EMISSÃO</th>
              <th>ITEM</th>
              <th>PRODUTO</th>
              <th>DESCRIÇÃO</th>
              <th>UM</th>
              <th>QTD</th>
              <th>QTD_ENT</th>
              <th>SALDO</th>
              <th>PREÇO</th>
              <th>ULT_PCs</th>
              <th>NUM_SC</th>
              <th>OBS</th>
              <th>ENTREGA</th>
              <th>FORN</th>
              <th>DESC_FORN</th>
              <th>OP</th>
            </tr>
          </thead>
          <tbody>
            {dataPCs.length !== 0 ? (
              dataPCs.map((pcs, i) => (
                <tr key={i}>
                  <td>
                    {pcs.APROVADO === 'L' ? (
                      <Badge variant="success">SIM</Badge>
                    ) : (
                      <Badge variant="danger">NÃO</Badge>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => handlePC(pcs.PEDIDO)}
                    >
                      {pcs.PEDIDO}
                    </Button>
                  </td>
                  <td>{pcs.EMISSAO}</td>
                  <td>{pcs.ITEM}</td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        history.replace('/pcs', {
                          ...history.location.state,
                          pc_number: searchValue,
                          pc_filter: filter
                        })
                        history.push('/prodash', {
                          ...history.location.state,
                          product: pcs.PRODUTO
                        })
                      }}
                    >
                      {pcs.PRODUTO}
                    </Button>
                  </td>
                  <td>{pcs.DESCRICAO}</td>
                  <td>{pcs.UM}</td>
                  <td>{pcs.QTD}</td>
                  <td>{pcs.QTD_ENT}</td>
                  <td>{pcs.SALDO}</td>
                  <td>R${pcs.PRECO - pcs.DESCONTO}</td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => handlePCModal(pcs.PRODUTO)}
                    >
                      <FiExternalLink />
                    </Button>
                  </td>
                  <td>
                    {pcs.NUMSC.trim() && (
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                          history.replace('/pcs', {
                            ...history.location.state,
                            pc_number: searchValue,
                            pc_filter: filter
                          })
                          history.push('/scs', {
                            ...history.location.state,
                            sc_number: pcs.NUMSC
                          })
                        }}
                      >
                        {pcs.NUMSC}
                      </Button>
                    )}
                  </td>
                  <td>{pcs.OBS}</td>
                  <td>{pcs.ENTREGA}</td>
                  <td>{pcs.FORN}</td>
                  <td>{pcs.DESC_FORN}</td>
                  <td>{pcs.OP}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="18">{pcsPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>
        <h3>
          Total do pedido:{' '}
          {sumPCs.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })}
        </h3>
      </Container>
    </Cont>
  )
}
