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
          armazem: '01,99'
        }
      })

      const { data: pcs } = await api.get(`/pcs`, {
        params: {
          filial: '0101',
          legenda: ['PENDENTE', 'ATENDIDO PARCIALMENTE'],
          produto: partNumbers
        }
      })

      const pcsBalance = pcs.reduce((acc, pc) => {
        if (!acc[pc.PRODUTO]) {
          acc[pc.PRODUTO] = {
            balancePC: pc.QTD - pc.QTD_ENT
          }
          return acc
        }

        acc[pc.PRODUTO].balancePC =
          acc[pc.PRODUTO].balancePC + (pc.QTD - pc.QTD_ENT)
        return acc
      }, {})

      const { data: scs } = await api.get(`/scs`, {
        params: {
          filial: '0101',
          aberto: true,
          produto: partNumbers
        }
      })

      const scsBalance = scs.reduce((acc, sc) => {
        if (!acc[sc.PRODUTO]) {
          acc[sc.PRODUTO] = {
            balanceSC: sc.QTD - sc.QTD_ENT
          }
          return acc
        }

        acc[sc.PRODUTO].balanceSC =
          acc[sc.PRODUTO].balanceSC + (sc.QTD - sc.QTD_ENT)
        return acc
      }, {})

      const { data: emps } = await api.get(`/emp`, {
        params: {
          filial: '0101',
          produto: partNumbers
        }
      })

      const empsBalance = emps.reduce((acc, emp) => {
        if (!acc[emp.CODIGO]) {
          acc[emp.CODIGO] = {
            balanceEMP: emp.SALDO
          }
          return acc
        }

        acc[emp.CODIGO].balanceEMP = acc[emp.CODIGO].balanceEMP + emp.SALDO
        return acc
      }, {})

      const { data: registers } = await api.get(`/register`, {
        params: {
          filial: '0101',
          produto: partNumbers
        }
      })

      if (balances.length === 0) {
        setSaldosPlaceholder('Parece que não há saldo...')
      } else {
        const stocks = products.map((product) => {
          const saldoFinded = balances.find(
            (balanceItem) => balanceItem['PRODUTO'] === product.partNumber
          )

          const registerFinded = registers.find(
            (registerItem) => registerItem['CODIGO'] === product.partNumber
          )

          return {
            ...product,
            description: registerFinded?.['DESCRICAO'] ?? '',
            stockBalance: saldoFinded?.['SALDO'] ?? 0,
            pcsBalance: pcsBalance[product.partNumber]?.balancePC ?? 0,
            scsBalance: scsBalance[product.partNumber]?.balanceSC ?? 0,
            empsBalance: empsBalance[product.partNumber]?.balanceEMP ?? 0
          }
        })
        setEstoques(stocks)
      }
    }
    loadEstoques()
  }, [products])

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>CÓDIGO</th>
          <th>DESCRIÇÃO</th>
          <th>EQUIPAMENTO</th>
          <th>EMP</th>
          <th>PCs</th>
          <th>SCs</th>
          <th>ESTOQUE</th>
          <th>SALDO</th>
        </tr>
      </thead>

      <tbody>
        {estoques.length > 0 ? (
          estoques.map((estoque, i) => (
            <tr key={estoque.product.concat('', estoque.partNumber, i)}>
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
              <td>{estoque.description}</td>
              <td>{estoque.product}</td>
              <td>{estoque.empsBalance}</td>
              <td>{estoque.pcsBalance}</td>
              <td>{estoque.scsBalance}</td>
              <td>{estoque.stockBalance}</td>
              {estoque.pcsBalance +
                estoque.scsBalance +
                estoque.stockBalance -
                estoque.empsBalance >=
              0 ? (
                <td
                  style={{
                    color: '#006100',
                    backgroundColor: '#C6EFCE'
                  }}
                >
                  {estoque.pcsBalance +
                    estoque.scsBalance +
                    estoque.stockBalance -
                    estoque.empsBalance}
                </td>
              ) : (
                <td
                  style={{
                    color: '#9C0006',
                    backgroundColor: '#FFC7CE'
                  }}
                >
                  {estoque.pcsBalance +
                    estoque.scsBalance +
                    estoque.stockBalance -
                    estoque.empsBalance}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">{saldosPlaceholder}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}
