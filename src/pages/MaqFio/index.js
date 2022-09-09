import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import { ButtonBase } from '@material-ui/core'
import MaqFioTable from '../../components/MaqFioTable'
import MaqFioTableMotor from '../../components/MaqFioTableMotor'

export default function MaqFio() {
  const history = useHistory()

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
        <MaqFioTable products={['MF25P2P', 'MF40P2', 'MF75P2']} />
        <h4>ESTOQUE MOTORES</h4>
        <MaqFioTableMotor
          products={[
            { product: 'MF25P2P', partNumber: '6800000334' },
            { product: 'MF25P2P', partNumber: 'VIXMOT0004' }
          ]}
        />
      </Container>
    </Cont>
  )
}
