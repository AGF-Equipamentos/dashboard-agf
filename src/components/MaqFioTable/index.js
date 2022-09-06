import { useState } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function MaqFioTable({ estoques, saldosPlaceholder }) {
  const history = useHistory()

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>FILIAL</th>
          <th>CÓDIGO</th>
          <th>SALDO</th>
          <th>ARMAZEM</th>
        </tr>
      </thead>

      <tbody>
        {estoques.length > 0 ? (
          estoques.map((estoque) => (
            <tr key={estoque.FILIAL.concat('', estoque.PRODUTO)}>
              <td>{estoque.FILIAL}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() =>
                    history.push('/prodash', {
                      ...history.location.state,
                      product: estoque.PRODUTO
                    })
                  }
                >
                  {estoque.PRODUTO}
                </Button>
              </td>
              <td>{estoque.SALDO}</td>
              <td>{estoque.ARMAZEM}</td>
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
