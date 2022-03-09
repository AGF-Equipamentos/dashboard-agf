export function generatePrintCode(data) {
  const printItens = data.map((item) => {
    return `
      ^XA
    
      ^FO50,30^GB540,240,8^FS
      ^FO50,50^A0,40^FD ${item.PRODUTO}^FS
      ^FO370,55^A0,25^FD PC ${item.PEDIDO}^FS
      ^FO370,120^A0,25^FD ${new Intl.DateTimeFormat('pt-BR').format(
        Date.now()
      )}^FS
      ^FO53,145^A0,35^FD ${item.DESCRICAO.slice(0, 29)}^FS
      ^FO53,185^A0,35^FD ${item.DESCRICAO.slice(30, 59)}^FS
      ^FO53,225^A0,35^FD ${item.DESCRICAO.slice(60, 89)}^FS

      ^XZ
      `.repeat(item.SALDO)
  })
  return printItens
}
