import { useEffect, useState } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function OrdersTable({ type, products }) {
  const history = useHistory()
  const [orders, setOrder] = useState([])
  const [orderPlaceholder, setOrderPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />
  )

  useEffect(() => {
    async function loadEstoques() {
      const partNumbers = products.map((product) => product.partNumber)
      if (type === 'purchases') {
        const pcs = await api.get(`/pcs`, {
          params: {
            filial: '0101',
            legenda: ['PENDENTE', 'ATENDIDO PARCIALMENTE'],
            produto: partNumbers
          }
        })
        if (pcs.data.length === 0) {
          setOrderPlaceholder('Parece que não há PCs...')
        } else {
          setOrder(pcs.data)
        }
      } else {
        const scs = await api.get(`/scs`, {
          params: {
            filial: '0101',
            aberto: true,
            produto: partNumbers
          }
        })
        if (scs.data.length === 0) {
          setOrderPlaceholder('Parece que não há SCs...')
        } else {
          setOrder(scs.data)
        }
      }
    }
    loadEstoques()
  }, [products, type])

  return (
    <Table responsive striped bordered hover>
      {type === 'purchases' ? (
        <>
          <thead>
            <tr>
              <td>PC</td>
              <td>COD</td>
              <td>QTD</td>
              <td>QTD_ENT</td>
              <td>DATA</td>
              <td>FORN</td>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.PEDIDO.concat('', order.PRODUTO)}>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        history.push('/pcs', {
                          ...history.location.state,
                          pc_number: order.PEDIDO,
                          pc_filter: 'Número'
                        })
                      }}
                    >
                      {order.PEDIDO}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() =>
                        history.push('/prodash', {
                          ...history.location.state,
                          product: order.PRODUTO
                        })
                      }
                    >
                      {order.PRODUTO}
                    </Button>
                  </td>
                  <td>{order.QTD}</td>
                  <td>{order.QTD_ENT}</td>
                  <td>{order.ENTREGA}</td>
                  <td>{order.DESC_FORN}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">{orderPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </>
      ) : (
        <>
          <thead>
            <tr>
              <td>SC</td>
              <td>COD</td>
              <td>QTD</td>
              <td>QTD_ENT</td>
              <td>DATA</td>
              <td>OBS</td>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.SC.concat('', order.PRODUTO)}>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        history.push('/scs', {
                          ...history.location.state,
                          sc_number: order.SC
                        })
                      }}
                    >
                      {order.SC}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() =>
                        history.push('/prodash', {
                          ...history.location.state,
                          product: order.PRODUTO
                        })
                      }
                    >
                      {order.PRODUTO}
                    </Button>
                  </td>
                  <td>{order.QTD}</td>
                  <td>{order.QTD_ENT}</td>
                  <td>{order.ENTREGA}</td>
                  <td>{order.OBS}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">{orderPlaceholder}</td>
              </tr>
            )}
          </tbody>
        </>
      )}
    </Table>
  )
}
