import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import { ButtonBase } from '@material-ui/core'
import ProductStockTable from '../../components/ProductStockTable'
import PartnumberStockTable from '../../components/PartnumberStockTable'

export default function Sweeper() {
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
        <h1>Vassoura</h1>
        <ProductStockTable products={['VC66']} />
        <h4>ESTOQUE ITENS HIDRÁULICOS</h4>
        <PartnumberStockTable
          products={[
            { product: 'VC66', partNumber: '9900001378' },
            { product: 'VC66', partNumber: '5102010101' },
            { product: 'VC66', partNumber: '5102010102' },
            { product: 'VC66', partNumber: '6300000057' },
            { product: 'VC66', partNumber: '5600000404' },
            { product: 'VC66', partNumber: '5600000371' }
          ]}
        />
        <h4>ESTOQUE CERDAS</h4>
        <PartnumberStockTable
          products={[
            { product: 'VC66', partNumber: '15501158P' },
            { product: 'VC66', partNumber: '15501158A' }
          ]}
        />
        <h4>ESTOQUE OUTROS </h4>
        <PartnumberStockTable
          products={[
            { product: 'VC66', partNumber: '9900000077' },
            { product: 'VC66', partNumber: '9900001059' },
            { product: 'VC66', partNumber: '9900002994' }
          ]}
        />
      </Container>
    </Cont>
  )
}
