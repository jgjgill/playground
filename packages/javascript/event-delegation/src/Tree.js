export default function Tree(element) {
  this.$tree = document.querySelector(element)
  this.$liList = this.$tree.querySelectorAll('li')

  for (const $li of this.$liList) {
    const $span = document.createElement('span')
    $li.prepend($span)
    $span.append($span.nextSibling)
  }

  this.$tree.addEventListener('click', (e) => {
    if (e.target.tagName !== 'SPAN') return

    this.$ul = e.target.parentNode.querySelector('ul')
    if (!this.$ul) return
    this.$ul.hidden = !this.$ul.hidden
  })
}
