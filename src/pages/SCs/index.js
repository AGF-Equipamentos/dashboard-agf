import { useState, useEffect, useCallback } from 'react'
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Spinner,
  Container,
  Dropdown,
  DropdownButton
} from 'react-bootstrap'
import { ButtonBase } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import api from '../../services/api'

export default function SCs() {
  const [scNumber, setScNumber] = useState('')
  const [dataSCs, setDataSCs] = useState([])
  const [scsPlaceholder, setScsPlaceholder] = useState('Pesquise por uma SC...')
  const [filial, setFilial] = useState('0101')
  const history = useHistory()

  const handleSubmit = useCallback(
    async (search) => {
      setDataSCs([])
      setScsPlaceholder(
        <Spinner animation="border" size="sm" variant="warning" />
      )
      let sc = scNumber.trim()

      if (search > 0) {
        sc = search.toUpperCase().trim()
      }
      const response = await api.get(`/scs`, {
        params: {
          filial,
          sc: sc
        }
      })
      if (response.data.length === 0) {
        setScsPlaceholder('Parece que não há uma SC com esse número...')
      }

      setDataSCs(response.data)
    },
    [scNumber, filial]
  )

  const handleFilialPlaceholder = useCallback((filial) => {
    switch (filial) {
      case '0101':
        return 'Matriz'
      case '0102':
        return 'Filial ES'
      case '0103':
        return 'Filial BA'
      default:
        return 'Matriz'
    }
  }, [])

  // submit on press Enter
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (history.location.state) {
      setScNumber(history.location.state.sc_number)
      handleSubmit(history.location.state.sc_number)
    }
    // eslint-disable-next-line
  }, [history.location.state]);

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

        <h1>Solicitações de Compra</h1>
        <InputGroup className="mb-3" onSubmit={handleSubmit}>
          <FormControl
            placeholder="Solicitação de Compra"
            aria-label="Solicitação de Compra"
            aria-describedby="basic-addon2"
            autoFocus
            value={scNumber}
            onKeyPress={keyPressed}
            onChange={(e) => setScNumber(e.target.value)}
          />
          <DropdownButton
            as={InputGroup.Append}
            variant="outline-warning"
            title={handleFilialPlaceholder(filial)}
          >
            <Dropdown.Item onClick={() => setFilial('0101')}>
              Matriz
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilial('0102')}>
              Filial ES
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilial('0103')}>
              Filial BA
            </Dropdown.Item>
          </DropdownButton>

          <InputGroup.Append>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="outline-warning"
            >
              Enviar
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>PRODUTO</th>
              <th>DESCRIÇÃO</th>
              <th>EMISSÃO</th>
              <th>DATA</th>
              <th>UM</th>
              <th>QTD</th>
              <th>QTD_ENT</th>
              <th>SALDO</th>
              <th>OBS</th>
              <th>PC</th>
              <th>ENTREGA</th>
              <th>OP</th>
            </tr>
          </thead>
          <tbody>
            {dataSCs.length !== 0 ? (
              dataSCs.map((scs, i) => (
                <tr key={i}>
                  <td>{scs.ITEM}</td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        history.replace('/scs', {
                          ...history.location.state,
                          sc_number: scNumber
                        })
                        history.push('/prodash', {
                          ...history.location.state,
                          product: scs.PRODUTO
                        })
                      }}
                    >
                      {scs.PRODUTO}
                    </Button>
                  </td>
                  <td>{scs.DESCRICAO}</td>
                  <td>{scs.EMISSAO}</td>
                  <td>{scs.ENTREGA}</td>
                  <td>{scs.UM}</td>
                  <td>{scs.QTD}</td>
                  <td>{scs.QTD_ENT}</td>
                  <td>{scs.SALDO}</td>
                  <td>{scs.OBS}</td>
                  <td>
                    {scs.PC.trim() && (
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                          history.replace('/scs', {
                            ...history.location.state,
                            sc_number: scNumber
                          })
                          history.push('/pcs', {
                            ...history.location.state,
                            pc_number: scs.PC,
                            pc_filter: 'Número'
                          })
                        }}
                      >
                        {scs.PC}
                      </Button>
                    )}
                  </td>
                  <td>{scs.PC_ENTREGA}</td>
                  <td>{scs.OP}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13">{scsPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Cont>
  )
}
