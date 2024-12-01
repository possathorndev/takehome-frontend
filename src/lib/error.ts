import axios from "axios";

export const parseErrorMessage = (error: Error) => {
  if (axios.isAxiosError(error)) {
    const {data} = error.response || {}
    return typeof data === 'string' ? data : Object.values(data).join(', ')
  }

  return ''
}