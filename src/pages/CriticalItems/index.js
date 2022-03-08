import React, {useState} from 'react';

import {
  Col,
  Container, 
  Row, 
  Button,
  InputGroup,
  Table,
  Form,
  FormControl,
  Spinner

} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Container as Cont } from './styles';
import axios from 'axios';

 

export default function CriticalItems() {
  
  const [searchValue, setSearchValue] = useState('');
  const [searchPlaceholder, setSearchPlaceholder] = useState('Pesquise por um código...');
  const [items, setItems] = useState([]);
  
  async function handleSubmit(){
    setSearchPlaceholder(
     <Spinner animation="border" size="sm" variant="warning" />,
    );

     const part_numberInformation = await axios.get(
      `${process.env.LOCALHOST}/critical-items`,
     );
     setItems(part_numberInformation.data); 

  }
   function keyPressed(event){
    if (event.key === 'Enter'){
      handleSubmit();
    }
  }
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
      
          
          <Form.Control type="text" placeholder="Número da peça..." /><br />
          <Form.Control type="text" placeholder="Observação de Estoque..."/><br />
          <Form.Control type="text" placeholder="Observação de Compras..."/><br />
          <Form.Control type="text" placeholder="Usado..."/><br />
          <Form.Control type="text" placeholder="Responsavel..."/><br />
          
          <Button
          onClick={handleSubmit}
          type="submit"
          variant="outline-warning"
          >
          Cadastrar 
          </Button>
        </InputGroup>
        <Table responsive striped bordered houver>
          <thead>
            <tr>
              <th>NÚMERO DA PEÇA</th>
              <th>DESCRIÇÃO DO ITEM</th>
              <th>OBSERVAÇÃO DO ESTOQUE</th>
              <th>OBSERVAÇÃO DE COMPRAS</th>
              <th>Usado</th>
              <th>RESPONSAVEL</th>
              <th>CRIADO:</th>
              <th>ULT. ATUAL.</th>
            </tr>
          </thead>
          <tbody>
            {items.length !== 0 ? (
              items.map(item => (
                <tr key={item.NUMERO_PECA}>
                  <td>{item.NUMERO_PECA}</td>
                  <td>{item.DESSCRICAO}</td>
                  <td>{item.OBSERVACAO_ESTOQUE}</td>
                  <td>{item.OBSERVACAO_COMPRAS}</td>
                  <td>{item.USADO}</td>
                  <td>{item.RESPONSAVEL}</td>
                  <td>{item.CRIADO}</td>
                  <td>{item.ULT_ATUAL}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">{searchPlaceholder}</td>
              </tr>
            )}
          </tbody>
          </Table>
      </Container>
    </Cont>
  );
}
           
                       
            
           




  