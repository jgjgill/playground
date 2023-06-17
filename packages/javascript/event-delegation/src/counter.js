export default function Counter(element) {
  this.$counter = document.querySelector(element)

  this.$counter.addEventListener('click', (e) => {
    if (e.target.dataset.counter !== undefined) {
      e.target.value++
    }
  })
}
