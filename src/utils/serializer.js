const serializer = (serializeSingle) => (data) => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(serializeSingle)
  }
  return serializeSingle(data)
}

module.exports = serializer
