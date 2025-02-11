const formattedDate = (timestamp: Date) => {
  if (!timestamp) return
  const date = new Date(timestamp)
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')} às ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export default formattedDate