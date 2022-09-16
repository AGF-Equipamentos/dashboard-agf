import { useEffect, useState } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function PartnumberStockTable({ products }) {
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

      if (balances.length === 0) {
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
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>EQUIPAMENTO</th>
          <th>CÓDIGO</th>
          <th>SALDO</th>
        </tr>
      </thead>

      <tbody>
        {estoques.length > 0 ? (
          estoques.map((estoque) => (
            <tr key={estoque.product.concat('', estoque.partNumber)}>
              <td>{estoque.product}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() =>
                    history.push('/prodash', {
                      ...history.location.state,
                      product: estoque.partNumber
                    })
                  }
                >
                  {estoque.partNumber}
                </Button>
              </td>
              <td>{estoque.balance}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">{saldosPlaceholder}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}
