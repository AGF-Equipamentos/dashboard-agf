import React, { useEffect, useState } from 'react'
import { Row, Col, Spinner, Container } from 'react-bootstrap'
import { ButtonBase } from '@material-ui/core'

import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import api from '../../services/api'

export default function OPsProducao() {
  const [OPs, setOPs] = useState([])
  const [opsPlaceholder, setOpsPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />
  )
  const history = useHistory()

  useEffect(() => {
    async function loadOPs() {
      const response = await api.get('/ops', {
        params: {
          filial: '0101',
          grupo: [
            '0010',
            '0020',
            '0030',
            '0040',
            '0050',
            '0060',
            '0070',
            '0080',
            '0090',
            '0091',
            '0092',
            '0093',
            '0094',
            '0095',
            '0097',
            '0110',
            '0120',
            '0130',
            '0200',
            '0201',
            '0202',
            '0203',
            '0204',
            '0300',
            '0301',
            '0350',
            '0360',
            '0370',
            '0375',
            '0380',
            '0390',
            '0400',
            '0401',
            '0490',
            '0500',
            '0501',
            '0502',
            '0503',
            '0504',
            '0505',
            '0510',
            '0520',
            '0530',
            '0540',
            '0550',
            '0560',
            '0570',
            '0580'
          ],
          fechado: false
        }
      })
      if (response.data.length === 0) {
        setOpsPlaceholder('Parece que não há ops...')
      }
      setOPs(response.data)
    }
    loadOPs()
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
        <h1>OPs Produção</h1>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>OP</th>
              <th>CÓDIGO</th>
              <th>DESCRIÇÃO</th>
              <th>QTD</th>
              <th>DATA_EMI</th>
              <th>DATA_INI</th>
              <th>DATA_FIM</th>
              <th>CC</th>
              <th>OBS</th>
              <th>QTD_PRO</th>
            </tr>
          </thead>

          <tbody>
            {OPs.length > 0 ? (
              OPs.map((ops, i) => (
                <tr key={i}>
                  <td>{ops.OP}</td>
                  <td>{ops.PRODUTO}</td>
                  <td>{ops.DESCRICAO}</td>
                  <td>{ops.QTD}</td>
                  <td>{ops.DAT_EMI}</td>
                  <td>{ops.DAT_INI}</td>
                  <td>{ops.DAT_FIM}</td>
                  <td>{ops.CC}</td>
                  <td>{ops.OBS}</td>
                  <td>{ops.QTD_PRO}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">{opsPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Cont>
  )
}
