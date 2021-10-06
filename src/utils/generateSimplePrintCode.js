export function generateSimplePrintCode(data) {
  const printItens = data.map(item => {
    return `
    ^XA
    
    ^FO120,30^GB605,240,8^FS
    ^FO135,50^A0,55^FD ${item.PRODUTO}^FS
    )}^FS
    ^FO135,140^A0,35^FD ${item.DESCRICAO.slice(0, 30)}^FS
    ^FO135,180^A0,35^FD ${item.DESCRICAO.slice(30, 60)}^FS
    ^FO135,230^A0,35^FD ${item.DESCRICAO.slice(60, 89)}^FS

    ^XZ
      `.repeat(item.SALDO);
  });
  return printItens;
}