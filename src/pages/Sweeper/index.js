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
        <h4>ESTOQUE MOTORES ELÉTRICOS</h4>
        <PartnumberStockTable
          products={[
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' }
          ]}
        />
        <h4>ESTOQUE SERVOCONVERSORES</h4>
        <PartnumberStockTable
          products={[
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' }
          ]}
        />
        <h4>ESTOQUE REDUTORES</h4>
        <PartnumberStockTable
          products={[
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' }
          ]}
        />
        <h4>ESTOQUE INVERSORES</h4>
        <PartnumberStockTable
          products={[
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' }
          ]}
        />
        <h4>ESTOQUE OUTROS </h4>
        <PartnumberStockTable
          products={[
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' },
            { product: '', partNumber: '' }
          ]}
        />
      </Container>
    </Cont>
  )
}
