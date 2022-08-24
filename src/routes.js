import { BrowserRouter, Route } from 'react-router-dom'

import Page from './components/Page'
import Main from './pages/Main'
import EstoquesMaq from './pages/EstoquesMaq'
import PCs from './pages/PCs'
import SCs from './pages/SCs'
import Pro_Dash from './pages/Pro_Dash'
import EstoquesGer from './pages/EstoqueGer'
import OPsPosVendas from './pages/OPsPosVendas'
import OPsFilial from './pages/OPsFilial'
import OPsPP from './pages/OPsPP'
import ProductRegister from './pages/ProductRegister'
import CriticalItems from './pages/CriticalItems'
import Kardex from './pages/Kardex'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route
        path="/"
        exact
        render={(props) => (
          <Page title="AGF Dash">
            <Main {...props} />
          </Page>
        )}
      />
      <Route
        path="/estoquemaq"
        render={(props) => (
          <Page title="Estoque de Máquinas | Dash">
            <EstoquesMaq {...props} />
          </Page>
        )}
      />
      <Route
        path="/pcs"
        render={(props) => (
          <Page title="Pedidos de Compra | Dash">
            <PCs {...props} />
          </Page>
        )}
      />
      <Route
        path="/scs"
        render={(props) => (
          <Page title="Solicitações de Compra | Dash">
            <SCs {...props} />
          </Page>
        )}
      />
      <Route
        path="/prodash"
        render={(props) => (
          <Page title="Consulta de Produtos | Dash">
            <Pro_Dash {...props} />
          </Page>
        )}
      />
      <Route
        path="/productregister"
        render={(props) => (
          <Page title="Cadastro de Produtos | Dash">
            <ProductRegister {...props} />
          </Page>
        )}
      />
      <Route
        path="/estoqueger"
        render={(props) => (
          <Page title="Geradores | Dash">
            <EstoquesGer {...props} />
          </Page>
        )}
      />
      <Route
        path="/opspos"
        render={(props) => (
          <Page title="OPs Pós Vendas | Dash">
            <OPsPosVendas {...props} />
          </Page>
        )}
      />
      <Route
        path="/opsfilial"
        render={(props) => (
          <Page title="OPs Filial | Dash">
            <OPsFilial {...props} />
          </Page>
        )}
      />
      <Route
        path="/opspp"
        render={(props) => (
          <Page title="OPs Ponto de Pedido | Dash">
            <OPsPP {...props} />
          </Page>
        )}
      />
      <Route
        path="/critical-items"
        render={(props) => (
          <Page title="Itens Críticos | Dash">
            <CriticalItems {...props} />
          </Page>
        )}
      />
      <Route
        path="/kardex"
        render={(props) => (
          <Page title="Kardex | Dash">
            <Kardex {...props} />
          </Page>
        )}
      />
    </BrowserRouter>
  )
}
