import React, {useState} from 'react';
// import { useState } from 'react';
import {
  Col,
  Container, 
  Row, 
  Button,
  FormContol,
  InputGroup,
  Table,
  Form,

} from 'react-bootstrap';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container as Cont } from './styles';
// import { useState } from 'react';




// function KeyPressed(event){
// id (event.Key === 'Enter'){
// handleSubmit();
// }
// }

export default function CriticalItems() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Cont>
      <Container fluid className="justify-content-center">
        <Row>
          <Col align="left" style={{ marginBottom: -50, marginTop: 12 }}>
            <Link
              to={{
                pathname: '/',
              }}
            >
              <FiArrowLeft color="#999" />
            </Link>
          </Col>
        </Row>
        <h1>Itens Críticos</h1>
        <InputGroup className="mb-3">
          <FormContol
          placeholder="Pesquise por um Item..."
          aria-label="Pesquise por um Item..."
          aria-describedby='basic-addon2'
          autoFocus
          value={searchValue}
          onKeyPress={KeyPressed}
          onChange={ e => setSearchValue(e.target.value)}
          />
          <Form.Control size="lg" type="text" placeholder="Digite o número da peça..." /><br />
          <Form.Control siza="lg" type="text" placeholder="Observação de Estoque"/><br />
          <Form.Control size="lg" type="text" placeholder="Observação de Compras"/><br />
          <Form.Control size="lg" type="text" placeholder="Usado"/><br />
          <Form.Control size="lg" type="text" placeholder="Responsavel"/><br />

          <Button
          onClick={handleSubmit}
          type="submit"
          >
           Enviar
          </Button>
        </InputGroup>
        <Table responsive striped bordered houver>
          <thead>
            <tr>
              <th>NÚMERO DA PEÇA</th>
              <th> DESCRIÇÃO DO ITEM</th>
              <th>OBSERVAÇÃO DO ESTOQUE</th>
              <th>OBSERVAÇÃO DE COMPRAS</th>
              <th>usado_obs</th>
              <th>RESPONSAVEL</th>
              
            </tr>
          </thead>



        </Table>
      </Container>
    </Cont>
  );
}
// if (filter === 'Código') {
// response = await axios.get(
// `/register?filial=0101&busca_cod_produto=${search}`,
// );
// } else {
// response = await api.get(
// `/register?filial=0101&busca_desc_produto=${search}`,
// );