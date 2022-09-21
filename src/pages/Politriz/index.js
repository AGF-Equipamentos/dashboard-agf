import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import { ButtonBase } from '@material-ui/core'
import ProductStockTable from '../../components/ProductStockTable'
import PartnumberStockTable from '../../components/PartnumberStockTable'
import OrdersTable from '../../components/OrdersTable'

export default function Politriz() {
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
        <h1>Politriz</h1>
        <ProductStockTable products={['MTL12']} />
        <h4>ESTOQUE MOTORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MTL12', partNumber: '6800000147' },
            { product: 'MTL12', partNumber: '6800000161' },
            { product: 'MTL12', partNumber: '6800000397' },
            { product: 'MTL12', partNumber: '6800000527' },
            { product: 'MTL12', partNumber: '6800000543' },
            { product: 'MTL12', partNumber: 'VIXMOT0004' },
            { product: 'MTL12', partNumber: 'VIXMOT0006' },
            { product: 'MTL12', partNumber: 'VIXMOT0007' }
          ]}
        />
        <h4>ESTOQUE REDUTORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MTL12', partNumber: '9900001411' },
            { product: 'MTL12', partNumber: '9900001412' },
            { product: 'MTL12', partNumber: '9900001445' },
            { product: 'MTL12', partNumber: '9900001457' },
            { product: 'MTL12', partNumber: 'VIXRED0141' }
          ]}
        />
        <h4>ESTOQUE OUTROS </h4>
        <PartnumberStockTable
          products={[
            { product: 'MTL12', partNumber: '1004000017' },
            { product: 'MTL12', partNumber: '1004000018' },
            { product: 'MTL12', partNumber: '1004000019' },
            { product: 'MTL12', partNumber: '1004000020' },
            { product: 'MTL12', partNumber: '1004000021' },
            { product: 'MTL12', partNumber: '1004000022' },
            { product: 'MTL12', partNumber: '1004000023' },
            { product: 'MTL12', partNumber: '1004000024' },
            { product: 'MTL12', partNumber: '1004000025' },
            { product: 'MTL12', partNumber: '1004000026' },
            { product: 'MTL12', partNumber: '1004000027' },
            { product: 'MTL12', partNumber: '1004000028' },
            { product: 'MTL12', partNumber: '1004000029' },
            { product: 'MTL12', partNumber: '1004000030' },
            { product: 'MTL12', partNumber: '1004000041' },
            { product: 'MTL12', partNumber: '9900001903' },
            { product: 'MTL12', partNumber: '9900001908' }
          ]}
        />
        <h5>Pedidos de Compra</h5>
        <OrdersTable
          type="purchases"
          products={[
            { product: 'MTL12', partNumber: '6800000147' },
            { product: 'MTL12', partNumber: '6800000161' },
            { product: 'MTL12', partNumber: '6800000397' },
            { product: 'MTL12', partNumber: '6800000527' },
            { product: 'MTL12', partNumber: '6800000543' },
            { product: 'MTL12', partNumber: 'VIXMOT0004' },
            { product: 'MTL12', partNumber: 'VIXMOT0006' },
            { product: 'MTL12', partNumber: 'VIXMOT0007' },
            { product: 'MTL12', partNumber: '9900001411' },
            { product: 'MTL12', partNumber: '9900001412' },
            { product: 'MTL12', partNumber: '9900001445' },
            { product: 'MTL12', partNumber: '9900001457' },
            { product: 'MTL12', partNumber: 'VIXRED0141' },
            { product: 'MTL12', partNumber: '1004000017' },
            { product: 'MTL12', partNumber: '1004000018' },
            { product: 'MTL12', partNumber: '1004000019' },
            { product: 'MTL12', partNumber: '1004000020' },
            { product: 'MTL12', partNumber: '1004000021' },
            { product: 'MTL12', partNumber: '1004000022' },
            { product: 'MTL12', partNumber: '1004000023' },
            { product: 'MTL12', partNumber: '1004000024' },
            { product: 'MTL12', partNumber: '1004000025' },
            { product: 'MTL12', partNumber: '1004000026' },
            { product: 'MTL12', partNumber: '1004000027' },
            { product: 'MTL12', partNumber: '1004000028' },
            { product: 'MTL12', partNumber: '1004000029' },
            { product: 'MTL12', partNumber: '1004000030' },
            { product: 'MTL12', partNumber: '1004000041' },
            { product: 'MTL12', partNumber: '9900001903' },
            { product: 'MTL12', partNumber: '9900001908' }
          ]}
        />
        <h5>Solicitação de Compra</h5>
        <OrdersTable
          type="purchase_requests"
          products={[
            { product: 'MTL12', partNumber: '6800000147' },
            { product: 'MTL12', partNumber: '6800000161' },
            { product: 'MTL12', partNumber: '6800000397' },
            { product: 'MTL12', partNumber: '6800000527' },
            { product: 'MTL12', partNumber: '6800000543' },
            { product: 'MTL12', partNumber: 'VIXMOT0004' },
            { product: 'MTL12', partNumber: 'VIXMOT0006' },
            { product: 'MTL12', partNumber: 'VIXMOT0007' },
            { product: 'MTL12', partNumber: '9900001411' },
            { product: 'MTL12', partNumber: '9900001412' },
            { product: 'MTL12', partNumber: '9900001445' },
            { product: 'MTL12', partNumber: '9900001457' },
            { product: 'MTL12', partNumber: 'VIXRED0141' },
            { product: 'MTL12', partNumber: '1004000017' },
            { product: 'MTL12', partNumber: '1004000018' },
            { product: 'MTL12', partNumber: '1004000019' },
            { product: 'MTL12', partNumber: '1004000020' },
            { product: 'MTL12', partNumber: '1004000021' },
            { product: 'MTL12', partNumber: '1004000022' },
            { product: 'MTL12', partNumber: '1004000023' },
            { product: 'MTL12', partNumber: '1004000024' },
            { product: 'MTL12', partNumber: '1004000025' },
            { product: 'MTL12', partNumber: '1004000026' },
            { product: 'MTL12', partNumber: '1004000027' },
            { product: 'MTL12', partNumber: '1004000028' },
            { product: 'MTL12', partNumber: '1004000029' },
            { product: 'MTL12', partNumber: '1004000030' },
            { product: 'MTL12', partNumber: '1004000041' },
            { product: 'MTL12', partNumber: '9900001903' },
            { product: 'MTL12', partNumber: '9900001908' }
          ]}
        />
      </Container>
    </Cont>
  )
}
