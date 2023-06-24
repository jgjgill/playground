export const parse = (querystring) =>
  querystring.split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=')
    if (key && value) {
      acc[key] = value
    }
    return acc
  }, {})
