export function generatePrintCode(data) {
  const printItens = data.map(item => {
    return `
      ^XA
  
      ^FO120,30^GB605,240,8^FS
      ^FO135,90^A0,55^FD ${item.PRODUTO}^FS
      ^FO500,90^A0,25^FD PC ${item.PEDIDO}^FS
      ^FO500,120^A0,25^FD ${new Intl.DateTimeFormat('pt-BR').format(
        Date.now(),
      )}^FS
      ^FO135,180^A0,35^FD ${item.DESCRICAO.slice(0, 30)}^FS
      ^FO135,220^A0,35^FD ${item.DESCRICAO.slice(30, 60)}^FS
      ^FO135,270^A0,35^FD ${item.DESCRICAO.slice(60, 89)}^FS
  
      ^XZ
      `.repeat(item.SALDO);
  });
  return printItens;
}
