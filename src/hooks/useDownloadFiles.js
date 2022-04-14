import { useRef, useState } from 'react'

export const useDownloadFile = ({ apiDefinition, onError }) => {
  const ref = useRef(null)
  const [url, setFileUrl] = useState()

  const download = async () => {
    try {
      const { data } = await apiDefinition()
      const url = URL.createObjectURL(new Blob([data]))
      setFileUrl(url)
      ref.current?.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      onError()
    }
  }

  return { download, ref, url }
}
