export function copyToClipboardWithoutHttps(text) {
  const input = document.createElement('textarea')
  input.innerHTML = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}
