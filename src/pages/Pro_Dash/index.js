import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Badge,
  Spinner,
  Container,
  Overlay,
  Tooltip,
  Alert,
  Form
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import {
  addWeeks,
  format,
  getMonth,
  getWeek,
  getYear,
  startOfWeek,
  endOfWeek
} from 'date-fns'
import toISODate from '../../utils/toISODate'
import { Container as Cont } from './styles'
import { generateSimplePrintCode } from '../../utils/generateSimplePrintCode'
import LastPCsModal from '../../components/LastPCsModal'

import api from '../../services/api'
import { average3Months } from '../../utils/average'
import { ButtonBase } from '@material-ui/core'

export default function Pro_Dash() {
  const [productNumber, setProductNumber] = useState('')
  const [almoxarifados, setAlmoxarifados] = useState([])
  const [supermercados, setSupermercados] = useState([])
  const [quebrados, setQuebrados] = useState([])
  const [pos, setPos] = useState([])
  const [vix, setVix] = useState([])
  const [bahia, setBahia] = useState([])
  const [stockWarehouse06, setStockWarehouse06] = useState([])
  const [productInfo, setProductInfo] = useState([])
  const [PCs, setPCs] = useState([])
  const [SCs, setSCs] = useState([])
  const [OPs, setOPs] = useState([])
  const [EMPs, setEMPs] = useState([])
  const [OUs, setOUs] = useState([])
  const [Average, setAverage] = useState([])
  const [Average02, setAverage02] = useState([])
  const [Average03, setAverage03] = useState([])
  const [useStore99OnWeekPlanning, setUseStore99OnWeekPlanning] = useState(true)

  const [codigoPlaceholder, setCodigoPlaceholder] = useState(
    'Pesquise por um código...'
  )
  const [pcPlaceholder, setPcPlaceholder] = useState(
    'Pesquise por um código...'
  )
  const [scPlaceholder, setScPlaceholder] = useState(
    'Pesquise por um código...'
  )
  const [opPlaceholder, setOpPlaceholder] = useState(
    'Pesquise por um código...'
  )
  const [ouPlaceholder, setOuPlaceholder] = useState(
    'Pesquise por um código...'
  )
  const [empPlaceholder, setEmpPlaceholder] = useState(
    'Pesquise por um código...'
  )
  const [averagePlaceholder, setAveragePlaceholder] = useState(
    'Pesquise por um código...'
  )
  const [average02Placeholder, setAverage02Placeholder] = useState(
    'Pesquise por um código...'
  )
  const [average03Placeholder, setAverage03Placeholder] = useState(
    'Pesquise por um código...'
  )

  const [almoxarifadoPlaceholder, setAlmoxarifadoPlaceholder] = useState(0)
  const [supermercadosPlaceholder, setSupermercadosPlaceholder] = useState(0)
  const [posPlaceholder, setPosPlaceholder] = useState(0)
  const [vixPlaceholder, setVixPlaceholder] = useState(0)
  const [bahiaPlaceholder, setBahiaPlaceholder] = useState(0)
  const [stock06Placeholder, setStock06Placeholder] = useState(0)
  const [quebradosPlaceholder, setQuebradosPlaceholder] = useState(0)
  const [sumEmp, setSumEmp] = useState('')
  const [sumSCs, setSumSCs] = useState('')
  const [sumPCs, setSumPCs] = useState('')
  const [sumOPs, setSumOPs] = useState('')
  const [saldoPrev, setSaldoPrev] = useState('')
  const [lastThreeMonthAverage, setlastThreeMonthAverage] = useState(0)
  const [lastThreeMonthAverage02, setlastThreeMonthAverage02] = useState(0)
  const [lastThreeMonthAverage03, setlastThreeMonthAverage03] = useState(0)
  const history = useHistory()
  const completeDate = new Date()

  // array de datas ( data atual ) somando mais 7 dias => fazer isso 12 vezes => gerando 12 datas
  // Fazer um map, transformanda as 12 datas em 12 objetos.

  const dates = [
    'ATR',
    ...Array.from({ length: 12 }, (_, i) =>
      addWeeks(endOfWeek(completeDate), i)
    )
  ]

  const period = dates.map((date) => {
    if (date === 'ATR')
      return {
        date,
        week: 'ATR',
        year: 'ATR'
      }
    return {
      date,
      week: getWeek(date),
      year: getYear(date)
    }
  })

  // average consumption
  const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const month2DigArray = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ]
  const currentMonth = getMonth(new Date()) + 1

  useEffect(() => {
    const mapEmpenhos = EMPs.map((emp) => emp.SALDO)
    const sumEmpenhos =
      mapEmpenhos.length > 0
        ? Number(parseFloat(mapEmpenhos.reduce((a, b) => a + b)).toFixed(2))
        : 0
    setSumEmp(sumEmpenhos)

    const mapSCs = SCs.map((sc) => sc.QTD - sc.QTD_ENT)
    const totalSumSCs =
      mapSCs.length > 0
        ? Number(parseFloat(mapSCs.reduce((a, b) => a + b)).toFixed(2))
        : 0
    setSumSCs(totalSumSCs)

    const mapPCs = PCs.map((pc) => pc.QTD - pc.QTD_ENT)
    const totalSumPCs =
      mapPCs.length > 0
        ? Number(parseFloat(mapPCs.reduce((a, b) => a + b)).toFixed(2))
        : 0
    setSumPCs(totalSumPCs)

    const mapOPs = OPs.map((op) => op.QTD - op.QTD_PRO)
    const totalSumOPs =
      mapOPs.length > 0
        ? Number(parseFloat(mapOPs.reduce((a, b) => a + b)).toFixed(2))
        : 0
    setSumOPs(totalSumOPs)

    const saldo =
      (almoxarifados[0] !== undefined ? almoxarifados[0].SALDO : 0) +
      sumPCs +
      sumOPs +
      (supermercados[0] !== undefined
        ? useStore99OnWeekPlanning && supermercados[0].SALDO
        : 0) +
      (stockWarehouse06[0] !== undefined ? stockWarehouse06[0].SALDO : 0) +
      sumSCs -
      sumEmp
    setSaldoPrev(Number(parseFloat(saldo).toFixed(2)))
  }, [
    EMPs,
    PCs,
    SCs,
    almoxarifados,
    sumEmp,
    sumPCs,
    sumSCs,
    OPs,
    sumOPs,
    useStore99OnWeekPlanning,
    supermercados,
    stockWarehouse06
  ])

  // Colocar OPs, Onde Usado e opção matriz/filial

  const handleSubmit = useCallback(
    async (search) => {
      let product = productNumber.toUpperCase().trim()

      if (search) {
        product = search.toUpperCase().trim()
      }

      setProductInfo([])
      setAlmoxarifados([])
      setSupermercados([])
      setQuebrados([])
      setPos([])
      setVix([])
      setBahia([])
      setStockWarehouse06([])
      setPCs([])
      setSCs([])
      setOPs([])
      setOUs([])
      setEMPs([])
      setAverage([])
      setAverage02([])
      setAverage03([])

      setCodigoPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setAlmoxarifadoPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setSupermercadosPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setQuebradosPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setPosPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setVixPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setBahiaPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setStock06Placeholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setPcPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setScPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setOpPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setEmpPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setOuPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setAveragePlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setAverage02Placeholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      setAverage03Placeholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )

      const [
        { value: productInfoResponse },
        { value: stock01 },
        { value: stock03 },
        { value: stock04 },
        { value: stock06 },
        { value: stock99 },
        { value: stockBranchES },
        { value: stockBranchBA },
        { value: purchaseOrders },
        { value: purchaseRequests },
        { value: pos },
        { value: usedBy },
        { value: commits },
        { value: average0101 },
        { value: average0102 },
        { value: average0103 }
      ] = await Promise.allSettled([
        api.get(`/register?filial=0101&produto=${product}`),
        api.get(`/estoques?filial[]=0101&produto[]=${product}&armazem[]=01`),
        api.get(`/estoques?filial[]=0101&produto[]=${product}&armazem[]=03`),
        api.get(`/estoques?filial[]=0101&produto[]=${product}&armazem[]=04`),
        api.get(`/estoques?filial[]=0101&produto[]=${product}&armazem[]=06`),
        api.get(`/estoques?filial[]=0101&produto[]=${product}&armazem[]=99`),
        api.get(`/estoques?filial[]=0102&produto[]=${product}`),
        api.get(`/estoques?filial[]=0103&produto[]=${product}`),
        api.get(
          `/pcs?filial=0101&legenda=PENDENTE',%20'ATENDIDO%20PARCIALMENTE&produto=${product}`
        ),
        api.get(`/scs?filial=0101&aberto=true&produto=${product}`),
        api.get(`/ops?filial=0101&produto=${product}&fechado=false`),
        api.get(`/ou?filial=0101&produto=${product}`),
        api.get(`/emp?filial=0101&produto=${product}`),
        api.get(`/average?filial=0101&produto=${product}`),
        api.get(`/average?filial=0102&produto=${product}`),
        api.get(`/average?filial=0103&produto=${product}`)
      ])

      // Product Info Call
      if (productInfoResponse.data.length === 0) {
        setCodigoPlaceholder('Parece que esse código não existe...')
      } else {
        setProductInfo(productInfoResponse.data)
      }

      // Stocks Calls
      if (stock01.data.length === 0) {
        setAlmoxarifados([{ SALDO: 0 }])
      } else {
        setAlmoxarifados(stock01.data)
      }

      if (stock03.data.length === 0) {
        setPos([{ SALDO: 0 }])
      } else {
        setPos(stock03.data)
      }

      if (stock04.data.length === 0) {
        setQuebrados([{ SALDO: 0 }])
      } else {
        setQuebrados(stock04.data)
      }

      if (stock06.data.length === 0) {
        setStockWarehouse06([{ SALDO: 0 }])
      } else {
        setStockWarehouse06(stock06.data)
      }

      if (stock99.data.length === 0) {
        setSupermercados([{ SALDO: 0 }])
      } else {
        setSupermercados(stock99.data)
      }

      if (stockBranchES.data.length === 0) {
        setVix([{ SALDO: 0 }])
      } else {
        const totalStock = stockBranchES.data.reduce((acc, stock) => {
          return stock.SALDO + acc
        }, 0)
        setVix([{ SALDO: totalStock }])
      }

      if (stockBranchBA.data.length === 0) {
        setBahia([{ SALDO: 0 }])
      } else {
        const totalStock = stockBranchBA.data.reduce((acc, stock) => {
          return stock.SALDO + acc
        }, 0)
        setBahia([{ SALDO: totalStock }])
      }

      // Purchase Orders
      if (purchaseOrders.data.length === 0) {
        setPcPlaceholder('Parece que não há PCs...')
      } else {
        const purchaseOrdersUpdated = purchaseOrders.data.map((item) => {
          const itemUpdated = {
            ...item,
            DATE: toISODate(item.ENTREGA),
            WEEK:
              toISODate(item.ENTREGA) < startOfWeek(new Date())
                ? 'ATR'
                : getWeek(toISODate(item.ENTREGA)),
            YEAR:
              toISODate(item.ENTREGA) < startOfWeek(new Date())
                ? 'ATR'
                : getYear(toISODate(item.ENTREGA))
          }
          return itemUpdated
        })
        setPCs(purchaseOrdersUpdated)
      }

      // Purchase Requests
      if (purchaseRequests.data.length === 0) {
        setScPlaceholder('Parece que não há SCs...')
      } else {
        const purchaseRequestsUpdated = purchaseRequests.data.map((item) => {
          const date = toISODate(item.ENTREGA)
          const itemUpdated = {
            ...item,
            DATE: date,
            WEEK: date < startOfWeek(new Date()) ? 'ATR' : getWeek(date),
            YEAR: date < startOfWeek(new Date()) ? 'ATR' : date
          }
          return itemUpdated
        })
        setSCs(purchaseRequestsUpdated)
      }

      // Production Orders
      if (pos.data.length === 0) {
        setOpPlaceholder('Parece que não há OPs...')
      } else {
        setOPs(pos.data)
      }

      // Used By
      if (usedBy.data.length === 0) {
        setOuPlaceholder('Parece que não é usado em nenhum lugar...')
      } else {
        setOUs(usedBy.data)
      }

      // Commits
      if (commits.data.length === 0) {
        setEmpPlaceholder('Parece que não há empenhos...')
      } else {
        const reponseUpdated8 = commits.data.map((item) => {
          const date = toISODate(item.ENTREGA)
          const itemUpdated = {
            ...item,
            DATE: date,
            WEEK: date < startOfWeek(new Date()) ? 'ATR' : getWeek(date),
            YEAR: date < startOfWeek(new Date()) ? 'ATR' : getYear(date)
          }
          return itemUpdated
        })
        setEMPs(reponseUpdated8)
      }

      // Last 12 Month Average
      // Average 0101
      if (average0101.data.length === 0) {
        setAveragePlaceholder('Parece que não há consumo...')
      } else {
        const reponseUpdated10 = average0101.data.map((item) => {
          const itemUpdated = {
            ...item,
            average:
              Math.round(
                ((item.Q01 +
                  item.Q02 +
                  item.Q03 +
                  item.Q04 +
                  item.Q05 +
                  item.Q06 +
                  item.Q07 +
                  item.Q08 +
                  item.Q09 +
                  item.Q10 +
                  item.Q11 +
                  item.Q12) /
                  12 +
                  Number.EPSILON) *
                  100
              ) / 100,
            total:
              item.Q01 +
              item.Q02 +
              item.Q03 +
              item.Q04 +
              item.Q05 +
              item.Q06 +
              item.Q07 +
              item.Q08 +
              item.Q09 +
              item.Q10 +
              item.Q11 +
              item.Q12
          }
          return itemUpdated
        })
        const lastThreeMonthAverageReduce = average3Months(
          currentMonth,
          reponseUpdated10[0]
        )

        setlastThreeMonthAverage(lastThreeMonthAverageReduce)
        setAverage(reponseUpdated10[0])
      }

      // Average 0102
      if (average0102.data.length === 0) {
        setAverage02Placeholder('Parece que não há consumo...')
      } else {
        const averageUpdated0102 = average0102.data.map((item) => {
          const itemUpdated = {
            ...item,
            average02:
              Math.round(
                ((item.Q01 +
                  item.Q02 +
                  item.Q03 +
                  item.Q04 +
                  item.Q05 +
                  item.Q06 +
                  item.Q07 +
                  item.Q08 +
                  item.Q09 +
                  item.Q10 +
                  item.Q11 +
                  item.Q12) /
                  12 +
                  Number.EPSILON) *
                  100
              ) / 100,
            total:
              item.Q01 +
              item.Q02 +
              item.Q03 +
              item.Q04 +
              item.Q05 +
              item.Q06 +
              item.Q07 +
              item.Q08 +
              item.Q09 +
              item.Q10 +
              item.Q11 +
              item.Q12
          }
          return itemUpdated
        })

        const lastThreeMonthAverageReduce = average3Months(
          currentMonth,
          averageUpdated0102[0]
        )
        setlastThreeMonthAverage02(lastThreeMonthAverageReduce)
        setAverage02(averageUpdated0102[0])
      }

      // Average 0103
      if (average0103.data.length === 0) {
        setAverage03Placeholder('Parece que não há consumo...')
      } else {
        const averageUpdated0103 = average0103.data.map((item) => {
          const itemUpdated = {
            ...item,
            average03:
              Math.round(
                ((item.Q01 +
                  item.Q02 +
                  item.Q03 +
                  item.Q04 +
                  item.Q05 +
                  item.Q06 +
                  item.Q07 +
                  item.Q08 +
                  item.Q09 +
                  item.Q10 +
                  item.Q11 +
                  item.Q12) /
                  12 +
                  Number.EPSILON) *
                  100
              ) / 100,
            total:
              item.Q01 +
              item.Q02 +
              item.Q03 +
              item.Q04 +
              item.Q05 +
              item.Q06 +
              item.Q07 +
              item.Q08 +
              item.Q09 +
              item.Q10 +
              item.Q11 +
              item.Q12
          }
          return itemUpdated
        })

        const lastThreeMonthAverageReduce = average3Months(
          currentMonth,
          averageUpdated0103[0]
        )
        setlastThreeMonthAverage03(lastThreeMonthAverageReduce)

        setAverage03(averageUpdated0103[0])
      }
    },
    [productNumber, currentMonth]
  )

  // submit on press Enter
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (history.location.state) {
      setProductNumber(history.location.state.product)
      handleSubmit(history.location.state.product)
    }

    // eslint-disable-next-line
  }, [history.location.state]);

  const [show, setShow] = useState(false)
  const [printQtd, setPrintQtd] = useState(1)
  const target = useRef(null)

  function handlePrint() {
    if (productInfo.length !== 0) {
      const productPrint = {
        ...productInfo[0],
        PRODUTO: productInfo[0].CODIGO,
        SALDO: Number(printQtd)
      }
      navigator.clipboard.writeText(generateSimplePrintCode([productPrint]))
      setShow(!show)
      setTimeout(() => {
        setShow(false)
      }, 1500)
    }
  }

  // LastPCsModal
  const [isPCModalOpen, setIsPCModalOpen] = useState(false)
  const [pcsData, setPcsData] = useState([])

  function handlePCModalClose() {
    setIsPCModalOpen(false)
  }

  const handlePCModal = async () => {
    let product = productNumber.toUpperCase().trim()

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
      <Container fluid className="justify-content-center">
        <Row>
          <Col align="left" style={{ marginBottom: -50, marginTop: 12 }}>
            <ButtonBase onClick={() => history.go(-1)}>
              <FiArrowLeft color="#999" />
            </ButtonBase>
          </Col>
        </Row>
        <h1>Consulta de Produtos</h1>
        <Row>
          <Col xs={8}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Código do Produto"
                aria-label="Código do Produto"
                aria-describedby="basic-addon2"
                autoFocus
                value={productNumber}
                onKeyPress={keyPressed}
                onChange={(e) => setProductNumber(e.target.value)}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-warning"
                  onClick={() => handleSubmit()}
                  type="submit"
                  style={{ borderRadius: '0 5px 5px 0' }}
                >
                  Enviar
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col>
            <Button
              variant="outline-warning"
              onClick={handlePCModal}
              type="submit"
            >
              Ultimas entradas
            </Button>
            <LastPCsModal
              isOpen={isPCModalOpen}
              handleClose={handlePCModalClose}
              pcsData={pcsData}
            />
          </Col>
          <Col>
            <InputGroup>
              <FormControl
                type="number"
                placeholder="Qtd"
                onChange={(e) => setPrintQtd(e.target.value)}
              />
              <InputGroup.Append>
                <Button
                  ref={target}
                  variant="outline-warning"
                  onClick={handlePrint}
                >
                  Etiqueta
                </Button>
                <Overlay target={target.current} show={show} placement="top">
                  {(props) => (
                    <Tooltip {...props}>
                      Copiado para a área de transferência!
                    </Tooltip>
                  )}
                </Overlay>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>DESCRIÇÃO</th>
                  <th>GRUPO</th>
                  <th>UM</th>
                  <th>PP</th>
                  <th>LE</th>
                  <th>EST_SEG</th>
                  <th>APRO</th>
                  <th>LOC</th>
                </tr>
              </thead>
              <tbody>
                {productInfo.length !== 0 ? (
                  productInfo.map((product, i) => (
                    <tr key={i}>
                      <td>{product.DESCRICAO}</td>
                      <td>{product.GRUPO}</td>
                      <td>{product.UM}</td>
                      <td>{product.PP}</td>
                      <td>{product.LE}</td>
                      <td>{product.ESTSEG}</td>
                      <td>{product.APROPRI !== 'I' ? 'D' : 'I'}</td>
                      <td>{product.LOCACAO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">{codigoPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        {productInfo.length !== 0 && productInfo[0].BLOQUEADO === true ? (
          <Row>
            <Col>
              <Alert variant={'danger'}>Este item está bloqueado!</Alert>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ALMOXARIFADO</th>
                </tr>
              </thead>
              <tbody>
                {almoxarifados.length !== 0 ? (
                  almoxarifados.map((almoxarifado, i) => (
                    <tr key={i}>
                      <td>{almoxarifado.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{almoxarifadoPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>SUPERMERCADO</th>
                </tr>
              </thead>
              <tbody>
                {supermercados.length !== 0 ? (
                  supermercados.map((supermercado, i) => (
                    <tr key={i}>
                      <td>{supermercado.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{supermercadosPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ARMAZEM 06</th>
                </tr>
              </thead>
              <tbody>
                {stockWarehouse06.length !== 0 ? (
                  stockWarehouse06.map((stock06, i) => (
                    <tr key={i}>
                      <td>{stock06.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{stock06Placeholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>QUEBRADO</th>
                </tr>
              </thead>
              <tbody>
                {quebrados.length !== 0 ? (
                  quebrados.map((quebrado, i) => (
                    <tr key={i}>
                      <td>{quebrado.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{quebradosPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>POS-VENDAS</th>
                </tr>
              </thead>
              <tbody>
                {pos.length !== 0 ? (
                  pos.map((posItem, i) => (
                    <tr key={i}>
                      <td>{posItem.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{posPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>FILIAL ES</th>
                </tr>
              </thead>
              <tbody>
                {vix.length !== 0 ? (
                  vix.map((vixItem) => (
                    <tr key={vixItem.SALDO}>
                      <td>{vixItem.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{vixPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>FILIAL BA</th>
                </tr>
              </thead>
              <tbody>
                {bahia.length !== 0 ? (
                  bahia.map((bahiaItem) => (
                    <tr key={bahiaItem.SALDO}>
                      <td>{bahiaItem.SALDO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{bahiaPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Consumo últimos 12 meses - Filial SP</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  {monthArray.map((month, i) => {
                    return (
                      <th key={i}>
                        {currentMonth + month - 1 > 12
                          ? `${currentMonth + month - 13}`
                          : `${currentMonth + month - 1}`}
                      </th>
                    )
                  })}
                  <th>MÉDIA ÚLT 3 MESES</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {Average?.length !== 0 ? (
                  <tr>
                    {monthArray.map((month, i) => {
                      return (
                        <td key={i}>
                          {currentMonth + month - 1 > 12
                            ? Average?.[
                                `Q${month2DigArray[currentMonth + month - 14]}`
                              ]
                            : Average?.[
                                `Q${month2DigArray[currentMonth + month - 2]}`
                              ]}
                        </td>
                      )
                    })}
                    <td>{lastThreeMonthAverage}</td>
                    <td>{Average.total}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="14">{averagePlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Consumo últimos 12 meses - Filial ES</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  {monthArray.map((month, i) => {
                    return (
                      <th key={i}>
                        {currentMonth + month - 1 > 12
                          ? `${currentMonth + month - 13}`
                          : `${currentMonth + month - 1}`}
                      </th>
                    )
                  })}
                  <th>MÉDIA ÚLT 3 MESES</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {Average02?.length !== 0 ? (
                  <tr>
                    {monthArray.map((month, i) => {
                      return (
                        <td key={i}>
                          {currentMonth + month - 1 > 12
                            ? Average02?.[
                                `Q${month2DigArray[currentMonth + month - 14]}`
                              ]
                            : Average02?.[
                                `Q${month2DigArray[currentMonth + month - 2]}`
                              ]}
                        </td>
                      )
                    })}
                    <td>{lastThreeMonthAverage02}</td>
                    <td>{Average02.total}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="14">{average02Placeholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Consumo últimos 12 meses - Filial BA</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  {monthArray.map((month, i) => {
                    return (
                      <th key={i}>
                        {currentMonth + month - 1 > 12
                          ? `${currentMonth + month - 13}`
                          : `${currentMonth + month - 1}`}
                      </th>
                    )
                  })}
                  <th>MÉDIA ÚLT 3 MESES</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {Average03?.length !== 0 ? (
                  <tr>
                    {monthArray.map((month, i) => {
                      return (
                        <td key={i}>
                          {currentMonth + month - 1 > 12
                            ? Average03?.[
                                `Q${month2DigArray[currentMonth + month - 14]}`
                              ]
                            : Average03?.[
                                `Q${month2DigArray[currentMonth + month - 2]}`
                              ]}
                        </td>
                      )
                    })}
                    <td>{lastThreeMonthAverage03}</td>
                    <td>{Average03.total}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="14">{average03Placeholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Planejamento Semanal</h5>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Considera armazém 99?"
              defaultChecked={useStore99OnWeekPlanning}
              onChange={(e) => setUseStore99OnWeekPlanning(e.target.checked)}
            />
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th style={{ paddingBlock: '35px' }}>#</th>
                  {period.map((period, i) => {
                    if (period.week === 'ATR') {
                      return <th style={{ paddingBlock: '35px' }}>ATRASO</th>
                    }
                    return (
                      <th key={i}>
                        WK{period.week}
                        <br />
                        <p style={{ fontSize: '12px', marginBottom: '4px' }}>
                          {format(
                            startOfWeek(period.date, { weekStartsOn: 1 }),
                            'dd/MM'
                          )}
                          <br />
                          {format(
                            startOfWeek(period.date, { weekStartsOn: 5 }),
                            'dd/MM'
                          )}
                        </p>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {EMPs.length !== 0 ? (
                  <>
                    <tr>
                      <td>EMPENHO</td>

                      {period.map((period, i) => {
                        const empWK = EMPs.reduce((acc, value) => {
                          if (value.WEEK === 'ATR' && period.week === 'ATR') {
                            return acc + value.SALDO
                          }
                          if (
                            value.DATE <= period.date &&
                            value.DATE >= startOfWeek(period.date)
                          ) {
                            return acc + value.SALDO
                          }
                          return acc
                        }, 0)
                        if (period.week === 'ATR' && empWK !== 0) {
                          return (
                            <td
                              style={{
                                color: '#9C0006',
                                backgroundColor: '#FFC7CE'
                              }}
                            >
                              {Math.round((empWK + Number.EPSILON) * 100) / 100}
                            </td>
                          )
                        }

                        return (
                          <td key={i}>
                            {Math.round((empWK + Number.EPSILON) * 100) / 100}
                          </td>
                        )
                      })}
                    </tr>
                    <tr>
                      <td>PC</td>
                      {period.map((period, i) => {
                        const pcWK = PCs.reduce((acc, value) => {
                          if (
                            value.WEEK === 'ATR' &&
                            period.week === 'ATR' &&
                            value.APROVADO === 'L'
                          ) {
                            return acc + value.SALDO
                          }
                          if (
                            value.DATE <= period.date &&
                            value.DATE >= startOfWeek(period.date) &&
                            value.APROVADO === 'L'
                          ) {
                            return acc + value.SALDO
                          }
                          return acc
                        }, 0)
                        if (period.week === 'ATR' && pcWK !== 0) {
                          return (
                            <td
                              style={{
                                color: '#9C0006',
                                backgroundColor: '#FFC7CE'
                              }}
                            >
                              {Math.round((pcWK + Number.EPSILON) * 100) / 100}
                            </td>
                          )
                        }

                        return (
                          <td key={i}>
                            {Math.round((pcWK + Number.EPSILON) * 100) / 100}
                          </td>
                        )
                      })}
                    </tr>
                    <tr>
                      <td>SALDO</td>

                      {period.map((period, i) => {
                        const empWK = EMPs.reduce((acc, value) => {
                          if (value.WEEK === 'ATR') {
                            return acc + value.SALDO
                          }
                          if (value.DATE <= period.date) {
                            return acc + value.SALDO
                          }
                          return acc
                        }, 0)
                        const pcWK = PCs.reduce((acc, value) => {
                          if (value.WEEK === 'ATR' && value.APROVADO === 'L') {
                            return acc + value.SALDO
                          }
                          if (
                            value.DATE <= period.date &&
                            value.APROVADO === 'L'
                          ) {
                            return acc + value.SALDO
                          }
                          return acc
                        }, 0)
                        const scWK = SCs.reduce((acc, value) => {
                          if (value.WEEK === 'ATR') {
                            return acc + value.SALDO
                          }
                          if (value.DATE <= period.date) {
                            return acc + value.SALDO
                          }
                          return acc
                        }, 0)

                        if (
                          pcWK +
                            scWK -
                            empWK +
                            almoxarifados[0].SALDO +
                            (useStore99OnWeekPlanning &&
                              supermercados[0].SALDO) +
                            stockWarehouse06[0].SALDO <
                          0
                        ) {
                          return (
                            <td
                              style={{
                                color: '#9C0006',
                                backgroundColor: '#FFC7CE'
                              }}
                            >
                              {Math.round(
                                (pcWK +
                                  scWK -
                                  empWK +
                                  almoxarifados[0].SALDO +
                                  (useStore99OnWeekPlanning &&
                                    supermercados[0].SALDO) +
                                  stockWarehouse06[0].SALDO +
                                  Number.EPSILON) *
                                  100
                              ) / 100}
                            </td>
                          )
                        }

                        if (
                          pcWK +
                            scWK -
                            empWK +
                            almoxarifados[0].SALDO +
                            (useStore99OnWeekPlanning &&
                              supermercados[0].SALDO) +
                            stockWarehouse06[0].SALDO ===
                          0
                        ) {
                          return (
                            <td
                              style={{
                                color: '#9C6500',
                                backgroundColor: '#FFEB9C'
                              }}
                            >
                              {Math.round(
                                (pcWK +
                                  scWK -
                                  empWK +
                                  almoxarifados[0].SALDO +
                                  (useStore99OnWeekPlanning &&
                                    supermercados[0].SALDO) +
                                  stockWarehouse06[0].SALDO +
                                  Number.EPSILON) *
                                  100
                              ) / 100}
                            </td>
                          )
                        }

                        return (
                          <td
                            key={i}
                            style={{
                              color: '#006100',
                              backgroundColor: '#C6EFCE'
                            }}
                          >
                            {Math.round(
                              (pcWK +
                                scWK -
                                empWK +
                                almoxarifados[0].SALDO +
                                (useStore99OnWeekPlanning &&
                                  supermercados[0].SALDO) +
                                stockWarehouse06[0].SALDO +
                                Number.EPSILON) *
                                100
                            ) / 100}
                          </td>
                        )
                      })}
                    </tr>
                    <tr>
                      <td>SC</td>
                      {period.map((period, i) => {
                        const scWK = SCs.reduce((acc, value) => {
                          if (value.WEEK === 'ATR' && period.week === 'ATR') {
                            return acc + value.SALDO
                          }
                          if (
                            value.DATE <= period.date &&
                            value.DATE >= startOfWeek(period.date)
                          ) {
                            return acc + value.SALDO
                          }
                          return acc
                        }, 0)

                        if (period.week === 'ATR' && scWK !== 0) {
                          return (
                            <td
                              style={{
                                color: '#9C0006',
                                backgroundColor: '#FFC7CE'
                              }}
                            >
                              {Math.round((scWK + Number.EPSILON) * 100) / 100}
                            </td>
                          )
                        }
                        return (
                          <td key={i}>
                            {Math.round((scWK + Number.EPSILON) * 100) / 100}
                          </td>
                        )
                      })}
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td colSpan="14">{empPlaceholder}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Total Empenhado</th>
                  <th>Total em SC</th>
                  <th>Total em PC</th>
                  <th>Total em OP</th>
                  <th>Saldo (previsto)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{sumEmp}</td>
                  <td>{sumSCs}</td>
                  <td>{sumPCs}</td>
                  <td>{sumOPs}</td>
                  <td>{saldoPrev}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Pedidos de Compra</h5>

            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>EMISSÃO</th>
                  <th>APROVADO</th>
                  <th>PC</th>
                  <th>QTD</th>
                  <th>QTD_ENT</th>
                  <th>SALDO</th>
                  <th>DATA</th>
                  <th>FORN</th>
                </tr>
              </thead>
              <tbody>
                {PCs.length !== 0 ? (
                  PCs.map((pc, i) => (
                    <tr key={i}>
                      <td>{pc.EMISSAO}</td>
                      <td>
                        {pc.APROVADO === 'L' ? (
                          <Badge variant="success">SIM</Badge>
                        ) : (
                          <Badge variant="danger">NÃO</Badge>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => {
                            history.replace('/prodash', {
                              ...history.location.state,
                              product: productNumber
                            })
                            history.push('/pcs', {
                              ...history.location.state,
                              pc_number: pc.PEDIDO,
                              pc_filter: 'Número'
                            })
                          }}
                        >
                          {pc.PEDIDO}
                        </Button>
                      </td>
                      <td>{pc.QTD}</td>
                      <td>{pc.QTD_ENT}</td>
                      <td>{pc.SALDO}</td>
                      <td>{pc.ENTREGA}</td>
                      <td>{pc.DESC_FORN}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">{pcPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Solicitações de Compra</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>EMISSÃO</th>
                  <th>SC</th>
                  <th>QTD</th>
                  <th>QTD_ATEND</th>
                  <th>DATA</th>
                  <th>OBS</th>
                </tr>
              </thead>
              <tbody>
                {SCs.length !== 0 ? (
                  SCs.map((sc, i) => (
                    <tr key={i}>
                      <td>{sc.EMISSAO}</td>
                      <td>
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => {
                            history.replace('/prodash', {
                              ...history.location.state,
                              product: productNumber
                            })
                            history.push('/scs', {
                              ...history.location.state,
                              sc_number: sc.SC
                            })
                          }}
                        >
                          {sc.SC}
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
        <Row>
          <Col>
            <h5>Ordens de Produção</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>OP</th>
                  <th>CÓDIGO</th>
                  <th>DESCRIÇÃO</th>
                  <th>QTD</th>
                  <th>DATA_EMI</th>
                  <th>DATA_INI</th>
                  <th>DATA_FIM</th>
                  <th>CC</th>
                  <th>OBS</th>
                  <th>QTD_PRO</th>
                </tr>
              </thead>
              <tbody>
                {OPs.length !== 0 ? (
                  OPs.map((op, i) => (
                    <tr key={i}>
                      <td>{op.OP}</td>
                      <td>{op.PRODUTO}</td>
                      <td>{op.DESCRICAO}</td>
                      <td>{op.QTD}</td>
                      <td>{op.DAT_EMI}</td>
                      <td>{op.DAT_INI}</td>
                      <td>{op.DAT_FIM}</td>
                      <td>{op.CC}</td>
                      <td>{op.OBS}</td>
                      <td>{op.QTD_PRO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">{opPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Onde Usado</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>EQUIPAMENTO</th>
                  <th>QTD</th>
                </tr>
              </thead>
              <tbody>
                {OUs.length !== 0 ? (
                  OUs.map((ou, i) => (
                    <tr key={i}>
                      <td>{ou.CODIGO}</td>
                      <td>{ou.QUANTIDADE}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">{ouPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col xs={8}>
            <h5>Planejamento (Empenhos)</h5>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>EQUIP</th>
                  <th>OP</th>
                  <th>QTD</th>
                  <th>ARM</th>
                  <th>DATA</th>
                </tr>
              </thead>
              <tbody>
                {EMPs.length !== 0 ? (
                  EMPs.map((emp, i) => (
                    <tr key={i}>
                      <td>{emp.DEC_OP}</td>
                      <td>{emp.OP}</td>
                      <td>{emp.SALDO}</td>
                      <td>{emp.ARMAZEM}</td>
                      <td>{emp.ENTREGA}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">{empPlaceholder}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Cont>
  )
}
