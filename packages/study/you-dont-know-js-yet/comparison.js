const dayStart = '07:30'
const dayEnd = '17:45'

function scheduleMeeting(startTime, durationMinutes) {
  const formattedStartTime = formattedSeocond(startTime)
  const formattedDayStart = formattedSeocond(dayStart)
  const formattedDayEnd = formattedSeocond(dayEnd)

  console.log(
    formattedDayStart <= formattedStartTime &&
      formattedStartTime + durationMinutes <= formattedDayEnd,
  )
}

function formattedSeocond(time) {
  const [hours, minutes] = time.split(':').map(Number)

  return hours * 60 + minutes
}

scheduleMeeting('7:00', 15)
scheduleMeeting('07:15', 30)
scheduleMeeting('7:30', 30)
scheduleMeeting('11:30', 60)
scheduleMeeting('17:00', 45)
scheduleMeeting('17:30', 30)
scheduleMeeting('18:00', 15)
