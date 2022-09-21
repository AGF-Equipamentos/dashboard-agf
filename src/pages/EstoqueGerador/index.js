import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import { ButtonBase } from '@material-ui/core'
import ProductStockTable from '../../components/ProductStockTable'
import PartnumberStockTable from '../../components/PartnumberStockTable'
import OrdersTable from '../../components/OrdersTable'

export default function EstoqueGerador() {
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
        <h1>Geradores</h1>
        <ProductStockTable products={['GS125', 'GS165', 'GS230', 'GS260']} />
        <h4>ESTOQUE MOTORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'GS125', partNumber: '9900001327' },
            { product: 'GS165', partNumber: '9900000777' },
            { product: 'GS230', partNumber: '9900000778' },
            { product: 'GS260', partNumber: '9900001100' }
          ]}
        />
        <h4>ESTOQUE ALTERNADORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'GS125', partNumber: '9900001718' },
            { product: 'GS165', partNumber: '9900000786' },
            { product: 'GS230', partNumber: '9900000821' },
            { product: 'GS260', partNumber: '9900001101' }
          ]}
        />
        <h5>Pedidos de Compra</h5>
        <OrdersTable
          type="purchases"
          products={[
            { product: 'GS125', partNumber: '9900001327' },
            { product: 'GS165', partNumber: '9900000777' },
            { product: 'GS230', partNumber: '9900000778' },
            { product: 'GS260', partNumber: '9900001100' },
            { product: 'GS125', partNumber: '9900001718' },
            { product: 'GS165', partNumber: '9900000786' },
            { product: 'GS230', partNumber: '9900000821' },
            { product: 'GS260', partNumber: '9900001101' }
          ]}
        />
        <h5>Solicitação de Compra</h5>
        <OrdersTable
          type="purchase_requests"
          products={[
            { product: 'GS125', partNumber: '9900001327' },
            { product: 'GS165', partNumber: '9900000777' },
            { product: 'GS230', partNumber: '9900000778' },
            { product: 'GS260', partNumber: '9900001100' },
            { product: 'GS125', partNumber: '9900001718' },
            { product: 'GS165', partNumber: '9900000786' },
            { product: 'GS230', partNumber: '9900000821' },
            { product: 'GS260', partNumber: '9900001101' }
          ]}
        />
      </Container>
    </Cont>
  )
}
