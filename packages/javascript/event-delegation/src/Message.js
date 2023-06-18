export default function Message(element) {
  this.$message = document.querySelector(element)

  this.$message.addEventListener('click', (e) => {
    if (e.target.className !== 'remove-button') return

    this.$pane = e.target.closest('.pane')
    this.$pane.remove()
  })
}
