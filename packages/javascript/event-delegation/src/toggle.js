export default function Toggle(element) {
  this.$toggle = document.querySelector(element)

  this.$toggle.addEventListener('click', (e) => {
    if (e.target.dataset.toggleId !== undefined) {
      this.$target = document.querySelector(`#${e.target.dataset.toggleId}`)
      this.$target.hidden = !this.$target.hidden
    }
  })
}
