import React, { useCallback, useRef, useState } from 'react';

import { Form, FormGroup, Modal} from 'react-bootstrap';
import axios from 'axios';
import { Button } from 'react-bootstrap';


 export interface Data{
   id: string;
   part_number: string;
   decription: string;
   stock_obs: string;
   purchase: string;
   userd_obs: string;
   responsable: string;
   created_at: String;
   updated_at: string;

 }

 type MainProps = {
userd_obs: string
 }



const Main: React.FC<MainProps> = ({ userd_obs }) => {

const [showNewCriticalItems, setShowNewCriticalItems] = useState(false);
const [Criticaitems_part_number, setPartNumber] = useState('');
const [Criticalitems_stock_obs, setCriticalItems_stock_obs] = useState('');
const [Criticalitems_used_obs, setCriticalItems_used_obs] = useState('');
const [criticalitems, setcriticalitems] = useState<Data>({} as Data);

// const handleExcludeSubmit = useCallback(async () => {

//     await axios.delete(`${process.env.REACT_APP_LOCALHOST.id}/critical-items`);

// }); 


// const handleNewCriticalItemsSubmit = useCallback(async() => {

//   // const newcriticalitens = await axios.post(`${process.env.REACT_APP_LOCALHOST}/critical-items`,{
//   //   part_number: Criticaitems_part_number,
//   //   stock_obs: Criticalitems_stock_obs,
//   //   userd_obs: Criticalitems_used_obs,
//   //   });

// });

return(
<>
  <Modal
  styler={{ color: 'black' }}
  show={showNewCriticalItems}
  onHide={() => setShowNewCriticalItems(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title>Novo Item</Modal.Title>
    </Modal.Header>
    <Form >
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
           <Form.Label>Código</Form.Label>
           <Form.Control 
           type="text"
           placeholder="Digite o código" 
           onChange={e => setPartNumber(e.target.value)}
           />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Observação Estoque</Form.Label>
              <Form.Control
              type="text"
              placeholder="Digite uma observação"
              onChange={e => setCriticalItems_stock_obs(e.target.value)}
              />
              </Form.Group>

              <Form.Group controlId= "exampleForm.ControlInput1">
                <Form.Label>Onde usado</Form.Label>
                <Form.Control
               type="text"
               placeholder="Digite onde é usado"
               onChange={e => setCriticalItems_used_obs(e.target.value)}
               />
              </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() =>  setShowNewCriticalItems(false)}>
          Fechar 
          </Button>
          <Button variant="warning" type="submit">
            Salvar
            </Button>
      </Modal.Footer>
      </Form>
      </Modal>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Item</Modal.Title>
        </Modal.Header>
          
        
      </>
      
  );

};