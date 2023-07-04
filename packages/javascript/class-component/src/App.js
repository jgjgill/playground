import Items from './Items.js'

export class App {
  constructor(appElement) {
    const qq = new Items(appElement)
    qq.temp()
  }
}
