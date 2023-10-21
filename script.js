const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdown-form')
const dateElement = document.getElementById('date-picker')
const countdownEl = document.getElementById('countdown')
const countdownEleTitle = document.getElementById('countdown-title')
const countdownEleBtn = document.getElementById('countdown-button')
const timeEls = document.querySelectorAll('span')
const completeEl = document.getElementById('complete')
const completeEleInfo = document.getElementById('complete-info')
const completeEleBtn = document.getElementById('complete-button')
const loadSpinner = document.getElementById('loading')
const container = document.getElementById('container')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = new Date()
let countdownActive
let savedCountdown

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// Set min Date in the picker
const today = new Date().toISOString().split('T')[0]
dateElement.setAttribute('min', today)

function updateDOM () {
  countdownActive = setInterval(() => {
    const now = new Date().getTime()
    const distance = countdownValue - now
    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)

    // populate countdown

    countdownEleTitle.textContent = `${countdownTitle}`

    if (distance < 0) {
      inputContainer.hidden = true
      countdownEl.hidden = true
      clearInterval(countdownActive)
      completeEleInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
      completeEl.hidden = false
      loadSpinner.hidden = true
      container.style.opacity = 1
    } else {
      //   Hide input
      inputContainer.hidden = true

      //   Show countdown
      countdownEl.hidden = false
      timeEls[0].textContent = `${days}`
      timeEls[1].textContent = `${hours}`
      timeEls[2].textContent = `${minutes}`
      timeEls[3].textContent = `${seconds}`
    }
    loadSpinner.hidden = true
    container.style.opacity = 1
  }, second)
}

function updateCountdown (e) {
  e.preventDefault()
  container.style.opacity = 0
  loadSpinner.hidden = false
  countdownTitle = e.srcElement[0].value
  countdownDate = e.srcElement[1].value
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate
  }
  localStorage.setItem('countdown', JSON.stringify(savedCountdown))
  e.srcElement[0].value = ''
  e.srcElement[1].value = ''
  //   get the number version of current date
  if (countdownDate === '') {
    alert('Please select a date for the countdown.')
  } else {
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

function restorePreviousCountdown () {
  savedCountdown = JSON.parse(localStorage.getItem('countdown'))
  if (savedCountdown) {
    container.style.opacity = 0
    loadSpinner.hidden = false
    countdownTitle = savedCountdown.title
    countdownDate = savedCountdown.date
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}
// Reset all values
function reset () {
  // Hide countdown
  countdownEl.hidden = true
  //   Hide complete
  completeEl.hidden = true
  //   Show input
  inputContainer.hidden = false
  //   Stop the countdown
  clearInterval(countdownActive)
  //   Reset values
  countdownTitle = ''
  countdownDate = ''
  countdownValue = Date
  localStorage.removeItem('countdown')
}

// Event listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownEleBtn.addEventListener('click', reset)
completeEleBtn.addEventListener('click', reset)
document.addEventListener('DOMContentLoaded', restorePreviousCountdown)
