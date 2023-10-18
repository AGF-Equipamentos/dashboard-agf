import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import { ButtonBase } from '@material-ui/core'
import ProductStockTable from '../../components/ProductStockTable'
import PartnumberStockTable from '../../components/PartnumberStockTable'

export default function Multifio() {
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
        <h1>Multifio</h1>
        <ProductStockTable products={['MW74V', 'MW86V', 'MW06V']} />
        <h4>ESTOQUE MOTORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MF90S3', partNumber: '9900002643' },
            { product: 'MF75S3', partNumber: '9900002513' }
          ]}
        />
        <h4>ESTOQUE INVERSORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MF90S3', partNumber: '6800000850' },
            { product: 'MF75S3', partNumber: '6800000849' }
          ]}
        />
      </Container>
    </Cont>
  )
}
