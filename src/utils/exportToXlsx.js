import XLSX from 'xlsx'

export const exportToXlsx = (
  data,
  fileName,
  type = 'application/octet-stream'
) => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, fileName)
  const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

  // Create a link and download the file
  const blob = new Blob([xlsxData], { type })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName}.xlsx`
  a.click()
  window.URL.revokeObjectURL(url)
}
