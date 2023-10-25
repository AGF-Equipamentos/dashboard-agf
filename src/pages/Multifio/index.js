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
        <h4>ESTOQUE REDUTORES E MOTORES</h4>
        <PartnumberStockTable
          products={[
            { product: 'MW74V', partNumber: '9900002352' },
            { product: 'MW74V', partNumber: '9900002353' },
            { product: 'MW74V', partNumber: '9900002354' },
            { product: 'MW74V', partNumber: '9900002355' },
            { product: 'MW74V', partNumber: 'VIXMOT0003' },
            { product: 'MW74V', partNumber: '6800000768' },
            { product: 'MW74V', partNumber: '6800000771' }
          ]}
        />
        <h4>ESTOQUE FERRO FUNDIDO</h4>
        <PartnumberStockTable
          products={[
            { product: 'MW74V', partNumber: '1004000077' },
            { product: 'MW74V', partNumber: '1004000083' },
            { product: 'MW74V', partNumber: '1004000084' },
            { product: 'MW74V', partNumber: '1004000085' },
            { product: 'MW74V', partNumber: '1004000086' },
            { product: 'MW74V', partNumber: '1004000087' },
            { product: 'MW74V', partNumber: '1004000088' },
            { product: 'MW74V', partNumber: '1004000089' },
            { product: 'MW74V', partNumber: '1004000090' },
            { product: 'MW74V', partNumber: '1004000091' },
            { product: 'MW74V', partNumber: '1004000092' },
            { product: 'MW74V', partNumber: '1004000093' },
            { product: 'MW74V', partNumber: '1004000094' },
            { product: 'MW74V', partNumber: '1004000095' },
            { product: 'MW74V', partNumber: '1004000096' },
            { product: 'MW74V', partNumber: '1004000097' },
            { product: 'MW74V', partNumber: '1004000098' },
            { product: 'MW74V', partNumber: '1004000099' },
            { product: 'MW74V', partNumber: '1004000100' },
            { product: 'MW74V', partNumber: '1004000101' },
            { product: 'MW74V', partNumber: '1004000113' },
            { product: 'MW74V', partNumber: '1004000114' }
          ]}
        />
        <h4>ESTOQUE ALUMINIO FUNDIDO</h4>
        <PartnumberStockTable
          products={[
            { product: 'MW74V', partNumber: '1004000061' },
            { product: 'MW74V', partNumber: '1004000062' },
            { product: 'MW74V', partNumber: '1004000063' },
            { product: 'MW74V', partNumber: '1004000064' },
            { product: 'MW74V', partNumber: '1004000066' },
            { product: 'MW74V', partNumber: '1004000067' },
            { product: 'MW74V', partNumber: '1004000068' },
            { product: 'MW74V', partNumber: '1004000069' },
            { product: 'MW74V', partNumber: '1004000070' },
            { product: 'MW74V', partNumber: '1004000071' },
            { product: 'MW74V', partNumber: '1004000072' },
            { product: 'MW74V', partNumber: '1004000106' },
            { product: 'MW74V', partNumber: '1004000107' },
            { product: 'MW74V', partNumber: '1004000108' }
          ]}
        />
        <h4>ESTOQUE OUTROS </h4>
        <PartnumberStockTable
          products={[
            { product: 'MW74V', partNumber: '1016000062' },
            { product: 'MW74V', partNumber: '1016000063' },
            { product: 'MW74V', partNumber: '6800000772' },
            { product: 'MW74V', partNumber: 'MW74V30763' },
            { product: 'MW74V', partNumber: 'MW74V30764' },
            { product: 'MW74V', partNumber: 'MW74V30765' },
            { product: 'MW74V', partNumber: 'MW74V30766' },
            { product: 'MW74V', partNumber: 'MW74V30767' },
            { product: 'MW74V', partNumber: '9900001623' },
            { product: 'MW74V', partNumber: '9900002324' },
            { product: 'MW74V', partNumber: '9900002325' },
            { product: 'MW74V', partNumber: '9900002326' },
            { product: 'MW74V', partNumber: '9900002327' },
            { product: 'MW74V', partNumber: '9900002328' },
            { product: 'MW74V', partNumber: '9900002329' },
            { product: 'MW74V', partNumber: 'VIXROL0067' },
            { product: 'MW74V', partNumber: '9900000876' },
            { product: 'MW74V', partNumber: '9900002338' },
            { product: 'MW74V', partNumber: '9900002339' },
            { product: 'MW74V', partNumber: '9900002340' },
            { product: 'MW74V', partNumber: '9900002341' },
            { product: 'MW74V', partNumber: '9900002342' },
            { product: 'MW74V', partNumber: '9900000877' },
            { product: 'MW74V', partNumber: '9900002333' },
            { product: 'MW74V', partNumber: '9900002334' },
            { product: 'MW74V', partNumber: '9900002335' },
            { product: 'MW74V', partNumber: '9900002336' },
            { product: 'MW74V', partNumber: '9900002337' },
            { product: 'MW74V', partNumber: '9900002029' },
            { product: 'MW74V', partNumber: '9900002330' },
            { product: 'MW74V', partNumber: '9900002351' },
            { product: 'MW74V', partNumber: '9900002361' },
            { product: 'MW74V', partNumber: '9900002428' },
            { product: 'MW74V', partNumber: '9900002429' },
            { product: 'MW74V', partNumber: '9900002430' },
            { product: 'MW74V', partNumber: '9900002445' },
            { product: 'MW74V', partNumber: '9900002504' }
          ]}
        />
      </Container>
    </Cont>
  )
}
