export const routes = {
  home: "/",
  gallery: "/gallery",
}

interface Params {
  [key: string]: string
}

const replaceParamsInRoutePath = (path: string, params: Params) => {
  const paramsKeys = Object.keys(params)
  if (!paramsKeys.length) {
    return path
  }

  paramsKeys.forEach(property => {
    const reg = new RegExp(`:${property}(?![\\w\\d])`, "i")
    path = path.replace(reg, params[property])
  })

  return path
}

export const getRoutePath = (name: keyof typeof routes, params: Params = {}) =>
  replaceParamsInRoutePath(routes[name], params)
