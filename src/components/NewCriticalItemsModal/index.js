import React, { useState } from 'react'

import { Form, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const NewCriticalItemsModal = ({ isOpen, handleClose}) => {
  const [showNewCriticalItems, setShowNewCriticalItems] = useState(false)
  const [Criticaitems_part_number, setPartNumber] = useState('')
  const [Criticalitems_stock_obs, setCriticalItems_stock_obs] = useState('')
  const [Criticalitems_used_obs, setCriticalItems_used_obs] = useState('')

 const handleNewCriticalItemsSubmit = async () => {
  try{
  const newCriticalItems = await axios.post(`${process.env.REACT_APP_LOCALHOST.id}/critical-items`,{
   part_number: Criticaitems_part_number,
  stock_obs: Criticalitems_stock_obs,
  used_obs: Criticalitems_used_obs,

  });
  const newData = [... data, newCriticalItems.data ];

  mutate(newData, false);

  setShowNewCriticalItems(false);
  }catch (err) {
  if (err instanceof Yup.ValidationError){
  const errors = getValidationErrors(err);
  formSave.currrent?.setErrors(errors);
  return;
  }

  addToast({
   type: 'error',
  title: 'erro na criação do Item Critico',
  description: 'Parece que este Item Critico não existe, já foi fechado, ou já foi criado.', 
  });
  }
  },[addToast, data, mutate,Criticalitems_part_number, Critical_stock_obs, Criticalitems_userd_obs];

  return (
    <>
      <Modal styles={{ color: 'black' }} show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Item</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleNewCriticalItemsSubmit}>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o código"
                  onChange={(e) => setPartNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Observação Estoque</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite uma observação"
                  onChange={(e) => setCriticalItems_stock_obs(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Onde usado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite onde é usado"
                  onChange={(e) => setCriticalItems_used_obs(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="warning" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default NewCriticalItemsModal