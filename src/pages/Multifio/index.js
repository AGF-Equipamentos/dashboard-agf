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
        <ProductStockTable products={['MW86V', 'MW76V', 'MW74V', 'MW06V']} />
        <h4>ESTOQUE MOTORES ELÉTRICOS</h4>
        <PartnumberStockTable
          products={[
            { product: 'MW74V', partNumber: '6800000891' },
            { product: 'MW76V', partNumber: '6800000891' },
            { product: 'MW86V', partNumber: '6800000891' },
            { product: 'MW06V', partNumber: '6800000357' },
            { product: 'MW74V', partNumber: 'VIXMOT0003' },
            { product: 'MW76V', partNumber: 'VIXMOT0003' },
            { product: 'MW86V', partNumber: 'VIXMOT0003' }
          ]}
        />
        <h4>ESTOQUE SERVOCONVERSORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MW74V', partNumber: '6800000823' },
            { product: 'MW76V', partNumber: '6800000823' },
            { product: 'MW86V', partNumber: '6800000823' },
            { product: 'MW06V', partNumber: '6800000823' },
            { product: 'MW74V', partNumber: '6800000822' },
            { product: 'MW76V', partNumber: '6800000822' },
            { product: 'MW86V', partNumber: '6800000822' },
            { product: 'MW06V', partNumber: '6800000822' }
          ]}
        />
        <h4>ESTOQUE REDUTORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MW74V', partNumber: '9900002352' },
            { product: 'MW76V', partNumber: '9900002352' },
            { product: 'MW86V', partNumber: '9900002352' },
            { product: 'MW06V', partNumber: '9900002352' },
            { product: 'MW06V', partNumber: '9900003017' },
            { product: 'MW06V', partNumber: '9900003018' },
            { product: 'MW74V', partNumber: '9900002354' },
            { product: 'MW76V', partNumber: '9900002354' },
            { product: 'MW86V', partNumber: '9900002354' },
            { product: 'MW74V', partNumber: '9900002355' },
            { product: 'MW76V', partNumber: '9900002355' },
            { product: 'MW86V', partNumber: '9900002355' },
            { product: 'MW74V', partNumber: '9900002353' },
            { product: 'MW76V', partNumber: '9900002353' },
            { product: 'MW86V', partNumber: '9900002353' },
            { product: 'MW06V', partNumber: '9900000622' }
          ]}
        />
        <h4>ESTOQUE INVERSORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MW74V', partNumber: '6800000756' },
            { product: 'MW76V', partNumber: '6800000756' },
            { product: 'MW86V', partNumber: '6800000756' },
            { product: 'MW74V', partNumber: '6800000751' },
            { product: 'MW76V', partNumber: '6800000751' },
            { product: 'MW06V', partNumber: '6800000450' },
            { product: 'MW86V', partNumber: '6800000890' }
          ]}
        />
        <h4>ESTOQUE OUTROS </h4>
        <PartnumberStockTable
          products={[
            { product: 'MW74V', partNumber: '9900003309' },
            { product: 'MW06V', partNumber: '9900003012' },
            { product: 'MW76V', partNumber: '9900003309' },
            { product: 'MW86V', partNumber: '9900003309' },
            { product: 'MW74V', partNumber: '9900003311' },
            { product: 'MW76V', partNumber: '9900003311' },
            { product: 'MW86V', partNumber: '9900003311' },
            { product: 'MW06V', partNumber: '9900003014' },
            { product: 'MW06V', partNumber: '9900003013' },
            { product: 'MW74V', partNumber: '9900003310' },
            { product: 'MW76V', partNumber: '9900003310' },
            { product: 'MW86V', partNumber: '9900003310' },
            { product: 'MW74V', partNumber: '6800000749' },
            { product: 'MW76V', partNumber: '6800000749' },
            { product: 'MW86V', partNumber: '6800000926' },
            { product: 'MW06V', partNumber: '6800000871' },
            { product: 'MW74V', partNumber: '9900002361' },
            { product: 'MW76V', partNumber: '9900002361' },
            { product: 'MW86V', partNumber: '9900002361' },
            { product: 'MW06V', partNumber: '9900002361' },
            { product: 'MW06V', partNumber: '9900003019' },
            { product: 'MW74V', partNumber: '6800000482' },
            { product: 'MW76V', partNumber: '6800000482' },
            { product: 'MW86V', partNumber: '6800000482' }
          ]}
        />
      </Container>
    </Cont>
  )
}
