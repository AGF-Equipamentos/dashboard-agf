export function generateSimplePrintCode(data) {
  const printItens = data.map((item) => {
    return `
      ^XA
  
      ^FO50,30^GB540,240,8^FS
      ^FO50,50^A0,55^FD ${item.PRODUTO}^FS
      )}^FS
      ^FO50,140^A0,35^FD ${item.DESCRICAO.slice(0, 29)}^FS
      ^FO50,180^A0,35^FD ${item.DESCRICAO.slice(30, 59)}^FS
      ^FO50,230^A0,35^FD ${item.DESCRICAO.slice(60, 89)}^FS
  
      ^XZ
      `.repeat(item.SALDO)
  })
  return printItens
}
