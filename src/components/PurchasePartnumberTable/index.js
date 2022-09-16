import { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import api from '../../services/api'

export default function PurchasePartnumberTable({ products }) {
  const history = useHistory()
  const [estoques, setEstoques] = useState([])
  const [saldosPlaceholder, setSaldosPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />
  )

  useEffect(() => {
    async function loadEstoques() {
      const saldos = await api.get(`/pcs`, {
        params: {
          produto: products
        }
      })

      if (saldos.data.length === 0) {
        setSaldosPlaceholder('Parece que não há saldo...')
      } else {
        setEstoques(saldos.data)
      }
    }
    loadEstoques()
  }, [])

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <td>PC</td>
          <td>COD</td>
          <td>QTD</td>
          <td>QTD_ENT.</td>
          <td>DATA</td>
          <td>FORN.</td>
        </tr>
      </thead>
    </Table>
  )
}
