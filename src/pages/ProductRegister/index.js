import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  Spinner,
  Container,
  Badge
} from 'react-bootstrap'
import { ButtonBase } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { FiLogIn, FiArrowLeft } from 'react-icons/fi'
import { Container as Cont } from './styles'

import api from '../../services/api'

export default function ProductRegister() {
  const [searchValue, setSearchValue] = useState('')
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('Pesquisar por descrição')
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    'Pesquise por um produto...'
  )
  const history = useHistory()

  async function handleSubmit(searchParam = '', filterParam = '') {
    const search = searchParam || searchValue.toUpperCase().trim()
    const filterHandler = filterParam || filter
    console.log(filterHandler)
    let response
    setProducts([])
    setSearchPlaceholder(
      <Spinner animation="border" size="sm" variant="warning" />
    )
    if (filterHandler === 'Código') {
      response = await api.get(`/register`, {
        params: {
          filial: '0101',
          busca_cod_produto: search || '',
          top: 200
        }
      })
    } else {
      response = await api.get(`/register`, {
        params: {
          filial: '0101',
          busca_desc_produto: search,
          top: 200
        }
      })
    }
    if (response.data.length === 0) {
      setSearchPlaceholder('Não encontramos nenhum produto...')
    }
    setProducts(response.data)
  }

  useEffect(() => {
    if (history.location.state) {
      setFilter(history.location.state.pr_filter)
      setSearchValue(history.location.state.pr_search)
      handleSubmit(
        history.location.state.pr_search,
        history.location.state.pr_filter
      )
    }
    // eslint-disable-next-line
  }, [history.location.state]);

  // submit on press Enter
  function keyPressed(event) {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

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
        <h1>Cadastro de Produtos</h1>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Pesquise por um produto..."
            aria-label="Pesquise por um produto..."
            aria-describedby="basic-addon2"
            autoFocus
            value={searchValue}
            onKeyPress={keyPressed}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <DropdownButton
            as={InputGroup.Append}
            variant="outline-warning"
            title={filter}
            id="input-group-dropdown-2"
          >
            <Dropdown.Item onClick={() => setFilter('Descrição')}>
              Descrição
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Código')}>
              Código
            </Dropdown.Item>
          </DropdownButton>
          <InputGroup.Append>
            <Button
              variant="outline-warning"
              onClick={() => handleSubmit()}
              type="submit"
            >
              Enviar
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>DESCRIÇÃO</th>
              <th>UM</th>
              <th>VER_MAIS</th>
            </tr>
          </thead>
          <tbody>
            {products.length !== 0 ? (
              products.map((product) => (
                <tr key={product.CODIGO}>
                  <td>{product.CODIGO}</td>
                  <td>
                    {product.DESCRICAO} -{' '}
                    {product.BLOQUEADO === true ? (
                      <Badge variant={'danger'}>Item bloqueado!</Badge>
                    ) : null}
                  </td>
                  <td>{product.UM}</td>
                  <td>
                    <ButtonBase
                      onClick={() => {
                        history.replace('/productregister', {
                          ...history.location.state,
                          product: product.CODIGO,
                          pr_search: searchValue,
                          pr_filter: filter
                        })
                        history.push('/prodash', {
                          ...history.location.state,
                          product: product.CODIGO
                        })
                      }}
                    >
                      <FiLogIn color="#999" />
                    </ButtonBase>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">{searchPlaceholder}</td>
              </tr>
            )}
            {products.length > 199 && (
              <tr>
                <td colSpan="5">
                  <strong>
                    Para mais resultados, faça uma pesquisa mais especifica...
                  </strong>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Cont>
  )
}
