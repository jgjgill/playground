export default function Menu(element) {
  this.element = document.querySelector(element)

  this.element.addEventListener('click', (e) => {
    const action = e.target.dataset.action
    if (action) {
      this[action]()
    }
  })

  this.save = () => {
    alert('저장하기')
  }

  this.load = () => {
    alert('불러오기')
  }

  this.search = () => {
    alert('검색하기')
  }
}
