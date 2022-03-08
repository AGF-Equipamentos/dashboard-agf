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
  Spinner,
  DropdownButton,
  Dropdown
  
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Container as Cont } from './styles';
import axios from 'axios';

export default function CriticalItems() {
  const [searchPlaceholder, setSearchPlaceholder] = useState('Pesquise por um código...');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('Pesquisar...');
 
  async function handleSubmit(){
  let response;
    setSearchPlaceholder(
      <Spinner animation="border" size="sm" variant="warning" />,
      );
      const part_numberInformation = await axios.get(
        `${process.env.REACT_APP_LOCALHOST}/critical-items`,
      );
      setItems(part_numberInformation.data); 

      if (part_numberInformation.data.length === 0){
        setSearchPlaceholder('Não tem essa peça...');

      }
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
                pathname: '/'
                
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
              <DropdownButton
              as={InputGroup.Append}
              variant="outline-warning"
              title={filter}
              id="input-group-dropdown-2"
              >
          <Dropdown.Item onClick={() => setFilter('Número da Peça')}>
              Número da Peça
          </Dropdown.Item>
          </DropdownButton>
            <InputGroup.Append>
          
              <Button 
              onClick={handleSubmit}
              type="submit"
              variant="outline-warning"
              >
               Cadastar
              </Button>
              </InputGroup.Append>
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
                <tr key={item.part_number}>
                  <td>{item.part_number}</td>
                  <td>{item.description}</td>
                  <td>{item.stock_obs}</td>
                  <td>{item.purchase_obs}</td>
                  <td>{item.used_obs}</td>
                  <td>{item.responsable}</td>
                  <td>{item.created_at}</td>
                  <td>{item.update_at}</td>
                

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
           
                       
            
           




  