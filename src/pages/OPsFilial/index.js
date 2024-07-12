import React, { useEffect, useState } from 'react'
import { Row, Spinner, Container, Button } from 'react-bootstrap'
import { ButtonBase } from '@material-ui/core'

import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import api from '../../services/api'
import { exportToXlsx } from '../../utils/exportToXlsx'

export default function OPsFilial() {
  const [OPs, setOPs] = useState([])
  const [opsPlaceholder, setOpsPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />
  )
  const history = useHistory()

  useEffect(() => {
    async function loadOPs() {
      const response = await api.get(
        '/ops?filial=0101&obs=FILIAL&fechado=false'
      )
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
        <Row className="align-items-center justify-content-between px-3">
          <ButtonBase onClick={() => history.go(-1)}>
            <FiArrowLeft color="#999" />
          </ButtonBase>
          <h1>OPs para a Filial</h1>
          <Button
            variant="warning"
            onClick={() => exportToXlsx(OPs, 'OPs Filial')}
          >
            Exportar
          </Button>
        </Row>

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
