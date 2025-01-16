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
  Tooltip,
  Spinner,
  Container,
  OverlayTrigger
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'
import { Container as Cont } from './styles'
import { generatePrintCode } from '../../utils/generatePrintCode'
import LastPCsModal from '../../components/LastPCsModal'

import api from '../../services/api'
import PrintModal from '../../components/PrintModal'
import { ButtonBase } from '@material-ui/core'
import { excludedCollaboratorSuppliers } from '../../utils/excludedCollaboratorSuppliers'

export default function PCs() {
  const [pCHeader, setPCHeader] = useState(0)
  const [issueHeader, setIssueHeader] = useState(0)
  const [payCondHeader, setPayCondHeader] = useState(0)
  const [payDescHeader, setPayDescHeader] = useState(0)
  const [supplierHeader, setSupplierHeader] = useState(0)
  const [supplierDescHeader, setSupplierDescHeader] = useState(0)
  const [currencyHeader, setCurrencyHeader] = useState(0)
  const [currencyDescHeader, setCurrencyDescHeader] = useState(0)
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
      setPCHeader(<Spinner animation="border" size="sm" variant="warning" />)
      setIssueHeader(<Spinner animation="border" size="sm" variant="warning" />)
      setPayCondHeader(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setPayDescHeader(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setSupplierHeader(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setSupplierDescHeader(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setCurrencyHeader(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setCurrencyDescHeader(
        <Spinner animation="border" size="sm" variant="warning" />
      )

      function setPlaceholder() {
        setPCHeader(0)
        setIssueHeader(0)
        setPayCondHeader(0)
        setPayDescHeader(0)
        setSupplierHeader(0)
        setSupplierDescHeader(0)
        setCurrencyHeader(0)
        setCurrencyDescHeader(0)
      }

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
        setPlaceholder()
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
        setPlaceholder()
      }

      const filteredData = response.data.filter(
        (pc) => !excludedCollaboratorSuppliers.includes(pc.FORN)
      )

      if (filteredData.length === 0) {
        setPcsPlaceholder('Parece que não há um PC com esse número...')
      }
      setDataPCs(filteredData)
      setPlaceholder()
    },
    [searchValue, filter, filial]
  )

  useEffect(() => {
    const mapPCs = dataPCs.map(
      (pc) =>
        (pc.PRECO - pc.DESCONTO / pc.QTD) * (pc.QTD - pc.QTD_ENT) + pc.FRETE
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

  //Calculate Value Itens Total
  const calculateValueItensFooter = () => {
    let valueItensFooter = 0
    dataPCs.forEach((pc) => {
      valueItensFooter += pc.PRECO * pc.QTD
    })
    return valueItensFooter.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  //Calculate Value Frete
  const calculateValueFreteFooter = () => {
    let valueFreteFooter = 0
    dataPCs.forEach((pc) => {
      valueFreteFooter += pc.FRETE
    })
    return valueFreteFooter.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  //Calculate Value Despesas
  const calculateValueCostsFooter = () => {
    let valueCostsFooter = 0
    dataPCs.forEach((pc) => {
      valueCostsFooter += pc.DESPESAS
    })
    return valueCostsFooter.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  //Calculate Value Discounts
  const calculateValueDiscountsFooter = () => {
    let valueDiscountsFooter = 0
    dataPCs.forEach((pc) => {
      valueDiscountsFooter += pc.DESCONTO
    })
    return valueDiscountsFooter.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
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
      case '0104':
        return 'AGF Maquinas Agrícolas'
      case '0105':
        return 'Filial CE'
      case '0106':
        return 'Filial MT'
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
            <Dropdown.Item onClick={() => setFilial('0105')}>
              Filial CE
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilial('0106')}>
              Filial MT
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
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <td>NUM PEDIDO</td>
                  <td>DATA EMISSÃO</td>
                </tr>
              </thead>
              <tbody>
                {dataPCs.length !== 0 ? (
                  <tr>
                    <td>{dataPCs[0].PEDIDO}</td>
                    <td>{dataPCs[0].EMISSAO}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>{pCHeader}</td>
                    <td>{issueHeader}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <td>TIPO MOEDA</td>
                  <td>DESCRIÇÃO MOEDA</td>
                </tr>
              </thead>
              <tbody>
                {dataPCs.length !== 0 ? (
                  <>
                    <tr>
                      <td>{dataPCs[0].MOEDA}</td>
                      <td>{dataPCs[0].DESC_MOEDA}</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td>{currencyHeader}</td>
                    <td>{currencyDescHeader}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <td>CONDIÇÃO PAGTO</td>
                  <td>DESCRIÇÃO PAGTO</td>
                </tr>
              </thead>
              <tbody>
                {dataPCs.length !== 0 ? (
                  <>
                    <tr>
                      <td>{dataPCs[0].COND_PAGTO}</td>
                      <td>{dataPCs[0].DESC_PAGTO}</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td>{payCondHeader}</td>
                    <td>{payDescHeader}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <td>FORNEC.</td>
                  <td>DESC. FORNEC.</td>
                  <td>CNPJ FORNEC.</td>
                </tr>
              </thead>
              <tbody>
                {dataPCs.length !== 0 ? (
                  <tr>
                    <td>{dataPCs[0].FORN}</td>
                    <td>{dataPCs[0].DESC_FORN}</td>
                    <td>{dataPCs[0].CNPJ}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>{supplierHeader}</td>
                    <td>{supplierDescHeader}</td>
                    <td>{supplierDescHeader}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>APROVADO</th>
              <th>ITEM</th>
              <th>PRODUTO</th>
              <th>DESCRIÇÃO</th>
              <th>UM</th>
              <th>CC</th>
              <th>QTD</th>
              <th>QTD_ENT</th>
              <th>SALDO</th>
              <th>PREÇO_UNIT</th>
              <th>VALOR_TOTAL</th>
              <th>ULT_PCs</th>
              <th>NUM_SC</th>
              <th>OBS</th>
              <th>ENTREGA</th>
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
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="button-tooltip-1">
                          <span>{pcs.DESC_CENTRO_CUSTO}</span>
                        </Tooltip>
                      }
                    >
                      <span>{pcs.CENTRO_CUSTO}</span>
                    </OverlayTrigger>
                  </td>
                  <td>{pcs.QTD}</td>
                  <td>{pcs.QTD_ENT}</td>
                  <td>{pcs.SALDO}</td>
                  <td>
                    {(pcs.PRECO - pcs.DESCONTO / pcs.QTD).toLocaleString(
                      'pt-br',
                      {
                        style: 'currency',
                        currency: 'BRL'
                      }
                    )}
                  </td>
                  <td>
                    {(pcs.PRECO * pcs.QTD).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
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
                  <td>{pcs.OP}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16">{pcsPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <td>VALOR DA MERCADORIA</td>
              <td>FRETE</td>
              <td>DESPESAS</td>
              <td>DESCONTOS</td>
              <td>TOTAL DO PEDIDO</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{calculateValueItensFooter()}</td>
              <td>{calculateValueFreteFooter()}</td>
              <td>{calculateValueCostsFooter()}</td>
              <td>{calculateValueDiscountsFooter()}</td>
              <td>
                {sumPCs.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Cont>
  )
}
