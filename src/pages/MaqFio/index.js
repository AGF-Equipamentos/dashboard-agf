import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import { ButtonBase } from '@material-ui/core'
import ProductStockTable from '../../components/ProductStockTable'
import PartnumberStockTable from '../../components/PartnumberStockTable'
import OrdersTable from '../../components/OrdersTable'

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
        <ProductStockTable
          products={['MF25P2P', 'MF40P2', 'MF75P2', 'VB45E']}
        />
        <h4>ESTOQUE MOTORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MF25P2P', partNumber: '6800000334' },
            { product: 'MF25P2P', partNumber: 'VIXMOT0004' },
            { product: 'MF40P2', partNumber: '6800000357' },
            { product: 'MF40P2', partNumber: 'VIXMOT0004' },
            { product: 'MF40P2', partNumber: 'VIXMOT0036' },
            { product: 'MF75P2', partNumber: 'VIXMOT0003' },
            { product: 'MF75P2', partNumber: 'VIXMOT0004' },
            { product: 'MF75P2', partNumber: 'VIXMOT0036' }
          ]}
        />
        <h4>ESTOQUE REDUTORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MF40P2', partNumber: '9900000567' },
            { product: 'MF40P2', partNumber: '9900000764' },
            { product: 'MF40P2', partNumber: 'VIXRED0083' },
            { product: 'MF25P2P', partNumber: '9900000567' },
            { product: 'MF75P2', partNumber: 'VIXRED0080' },
            { product: 'MF75P2', partNumber: 'VIXRED0081' },
            { product: 'MF75P2', partNumber: 'VIXRED0082' },
            { product: 'MF75P2', partNumber: 'VIXRED0083' }
          ]}
        />
        <h4>ESTOQUE INVERSORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MF25P2P', partNumber: '6800000256' },
            { product: 'MF25P2P', partNumber: '6800000651' },
            { product: 'MF40P2', partNumber: '6800000256' },
            { product: 'MF40P2', partNumber: '6800000450' },
            { product: 'MF75P2', partNumber: '6800000256' },
            { product: 'MF75P2', partNumber: '6800000699' }
          ]}
        />
        <h5>Pedidos de Compra</h5>
        <OrdersTable
          type="purchases"
          products={[
            { product: 'MF25P2P', partNumber: '6800000334' },
            { product: 'MF25P2P', partNumber: 'VIXMOT0004' },
            { product: 'MF40P2', partNumber: '6800000357' },
            { product: 'MF40P2', partNumber: 'VIXMOT0004' },
            { product: 'MF40P2', partNumber: 'VIXMOT0036' },
            { product: 'MF75P2', partNumber: 'VIXMOT0003' },
            { product: 'MF75P2', partNumber: 'VIXMOT0004' },
            { product: 'MF75P2', partNumber: 'VIXMOT0036' },
            { product: 'MF40P2', partNumber: '9900000567' },
            { product: 'MF40P2', partNumber: '9900000764' },
            { product: 'MF40P2', partNumber: 'VIXRED0083' },
            { product: 'MF25P2P', partNumber: '9900000567' },
            { product: 'MF75P2', partNumber: 'VIXRED0080' },
            { product: 'MF75P2', partNumber: 'VIXRED0081' },
            { product: 'MF75P2', partNumber: 'VIXRED0082' },
            { product: 'MF75P2', partNumber: 'VIXRED0083' },
            { product: 'MF25P2P', partNumber: '6800000256' },
            { product: 'MF25P2P', partNumber: '6800000651' },
            { product: 'MF40P2', partNumber: '6800000256' },
            { product: 'MF40P2', partNumber: '6800000450' },
            { product: 'MF75P2', partNumber: '6800000256' },
            { product: 'MF75P2', partNumber: '6800000699' }
          ]}
        />
        <h5>Solicitação de Compra</h5>
        <OrdersTable
          type="purchase_requests"
          products={[
            { product: 'MF25P2P', partNumber: '6800000334' },
            { product: 'MF25P2P', partNumber: 'VIXMOT0004' },
            { product: 'MF40P2', partNumber: '6800000357' },
            { product: 'MF40P2', partNumber: 'VIXMOT0004' },
            { product: 'MF40P2', partNumber: 'VIXMOT0036' },
            { product: 'MF75P2', partNumber: 'VIXMOT0003' },
            { product: 'MF75P2', partNumber: 'VIXMOT0004' },
            { product: 'MF75P2', partNumber: 'VIXMOT0036' },
            { product: 'MF40P2', partNumber: '9900000567' },
            { product: 'MF40P2', partNumber: '9900000764' },
            { product: 'MF40P2', partNumber: 'VIXRED0083' },
            { product: 'MF25P2P', partNumber: '9900000567' },
            { product: 'MF75P2', partNumber: 'VIXRED0080' },
            { product: 'MF75P2', partNumber: 'VIXRED0081' },
            { product: 'MF75P2', partNumber: 'VIXRED0082' },
            { product: 'MF75P2', partNumber: 'VIXRED0083' },
            { product: 'MF25P2P', partNumber: '6800000256' },
            { product: 'MF25P2P', partNumber: '6800000651' },
            { product: 'MF40P2', partNumber: '6800000256' },
            { product: 'MF40P2', partNumber: '6800000450' },
            { product: 'MF75P2', partNumber: '6800000256' },
            { product: 'MF75P2', partNumber: '6800000699' }
          ]}
        />
      </Container>
    </Cont>
  )
}
