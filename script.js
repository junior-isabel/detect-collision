
const ctx = canvas.getContext('2d')
const mouse = {
  x: null,
  y: null
}
const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
}
const TWO_PI = 2 * Math.PI
ctx.__proto__.point = function (x, y, color = "#000") {

  this.save()
  this.beginPath()
  this.fillStyle = color
  this.arc(x || 0, y || 0, 5, 0, 2 * Math.PI)
  this.fill()
  this.restore()
}

function loop () {
  requestAnimationFrame(loop)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  collideLineToCircle()

}

function collidePointToPoint () {
  ctx.point(mouse.x,mouse.y, "#00f")
  let color = "#000"
  if (mouse.x === 200 && mouse.y === 250)
    color = "#f00"
  ctx.point(200, 250, color)
}

function collidePointToRect () {

  let color = "#000"
  if (mouse.x > center.x - 150 && mouse.x < center.x + 150 &&
    mouse.y > center.y - 150 && mouse.y < center.y + 150) color = "#f00"
  ctx.fillStyle = color
  ctx.fillRect(center.x - 150, center.y - 150, 300, 300)
  ctx.point(mouse.x, mouse.y, "#00f")


}
function collidePointToCircle () {
  const dx = center.x - mouse.x
  const dy = center.y - mouse.y
  const srh = Math.pow(dx, 2) + Math.pow(dy, 2)

  let color = "#000"
  if (srh < Math.pow(150, 2)) color = "#f00"
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(center.x, center.y, 150, 0, TWO_PI)
  ctx.fill()

  ctx.point(mouse.x, mouse.y, "#00f")
}

function collideCircleToCircle () {
  const dx = center.x - mouse.x
  const dy = center.y - mouse.y
  const sh = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
  let color = "#000"
  let acc = 150 + 75
  if (sh < acc) color = "#f00"

  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(center.x, center.y, 150, 0, TWO_PI)
  ctx.fill()

  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = "#00f"
  ctx.arc(mouse.x, mouse.y, 75, 0, TWO_PI)
  ctx.fill()
  ctx.restore()
}

function collideRectToRect () {

  let color = "#000"

  if (mouse.x + 75 > center.x - 150 &&
    mouse.x - 75 < center.x + 150 &&
    mouse.y + 75 > center.y - 150 &&
    mouse.y - 75 <  center.y + 150) color = "#f00"
  ctx.fillStyle = color
  ctx.fillRect(center.x - 150, center.y - 150, 300, 300)

  ctx.save()
  ctx.fillStyle ="#00f"
  ctx.fillRect(mouse.x - 75, mouse.y - 75, 150, 150)
  ctx.restore()
}

function collideRectToCircle () {

  let x = mouse.x
  let y = mouse.y
  
  color = "#000"
  if (x < center.x - 100) x = center.x - 100
  else if (x > center.x + 100) x = center.x + 100
  
  if (y < center.y - 100) y = center.y - 100
  else if (y > center.y + 100) y = center.y + 100
  let dx = mouse.x - x
  let dy = mouse.y - y

  let mag = Math.sqrt(dx ** 2 + dy ** 2)
  if (mag < 60) color = "#f00"
  ctx.save()
  ctx.fillStyle = color
  ctx.fillRect(center.x - 100, center.y - 100, 200, 200)
  ctx.restore()

  ctx.beginPath()
  ctx.arc(mouse.x, mouse.y, 60, 0, TWO_PI)
  ctx.fill()
  ctx.point(x, y, "#00f")
}

function collideLineToPoint () {

  let d1x = mouse.x - 500
  let d1y = mouse.y - 40

  let d2x = mouse.x - 100
  let d2y = mouse.y - 400

  let dx = 500 - 100
  let dy = 40 - 400
  let h = Math.sqrt(dx ** 2 + dy ** 2)
  let h1 = Math.sqrt(d1x ** 2 + d1y ** 2)
  let h2 = Math.sqrt(d2x ** 2 + d2y ** 2)

  let color ="#000"
  if ((h1 + h2) >= h - 0.2 && (h1 + h2) <= h + 0.2) color = "#f00"
  ctx.save()
  ctx.lineWidth = 5
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.moveTo(500, 40)
  ctx.lineTo(100, 400)
  ctx.stroke()
  ctx.restore()

  ctx.point(mouse.x, mouse.y, "#00f")
}

function collideLineToCircle () {

  let x1 = 100
  let y1 = 500
  let x2 = 500
  let y2 = 100
  let x3 = mouse.x
  let y3 = mouse.y
  let mag = Math.sqrt((x2 - x1) **  2 + (y2- y1) ** 2)
  let dot = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / mag ** 2

  let x = x1 + (x2 - x1) * dot
  let y = y1 + (y2 - y1) * dot
  let color  ="#000"
  console.log(dot)
  let len  = Math.sqrt((x - x3) ** 2 + ( y - y3) ** 2)

  if (len < 50 && dot >= 0 && dot <= 1) {
    color = "#f00"
  }
  ctx.beginPath()
  ctx.arc(x3, y3, 50, 0, TWO_PI)
  ctx.fill()
  
  ctx.save()
  ctx.lineWidth = 5
  ctx.strokeStyle = color
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.restore()

  ctx.point(x, y, "#00f")

  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = 5
  ctx.strokeStyle ="#f00"
  ctx.moveTo(x, y)
  ctx.lineTo(x3, y3)
  ctx.stroke()
  ctx.restore()
}

loop()


canvas.addEventListener('mousemove', onHandlerMouseMove)


function onHandlerMouseMove (e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}