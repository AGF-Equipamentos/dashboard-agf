import { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import api from '../../services/api'
import { ButtonBase } from '@material-ui/core'
import MaqFioTable from '../../components/MaqFioTable'

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
        <MaqFioTable />
      </Container>
    </Cont>
  )
}
