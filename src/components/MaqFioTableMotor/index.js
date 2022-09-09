import { useEffect, useState } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function MaqFioTableMotor({ products }) {
  const history = useHistory()
  const [estoques, setEstoques] = useState([])
  const [saldosPlaceholder, setSaldosPlaceholder] = useState(
    <Spinner animation="border" size="sm" variant="warning" />
  )

  useEffect(() => {
    const partNumbers = products.map((product) => product.partNumber)

    async function loadEstoques() {
      const { data: balances } = await api.get(`/estoques`, {
        params: {
          produto: partNumbers,
          filial: '0101',
          armazem: '01'
        }
      })

      if (balances.lenght === 0) {
        setSaldosPlaceholder('Parece que não há saldo...')
      } else {
        const stocks = products.map((product) => {
          const saldoFinded = balances.find(
            (balanceItem) => balanceItem['PRODUTO'] === product.partNumber
          )
          return {
            ...product,
            balance: saldoFinded?.['SALDO'] ?? 0
          }
        })
        setEstoques(stocks)
      }
    }
    loadEstoques()
  }, [])

  return (
    <Table>
      <thead>
        <tr>
          <th>EQUIPAMENTO</th>
          <th>CÓDIGO</th>
          <th>SALDO</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{}</td>
          <td>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() =>
                history.push('/prodash', {
                  ...history.location.state,
                  product: products.PRODUTO
                })
              }
            >
              {products.partNumbers}
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}
