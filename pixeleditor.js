/* eslint no-undef: 0 */

var canvas
var context
var uploadedImage

function init () {
  listeners()
  canvas = document.getElementById('pixeleditor')
  context = canvas.getContext('2d')
}

function listeners () {
  $('#uploadImg').on('change', function (e) { upload(e) })
  $('#pixeleditor').on('mousedown', function (e) { handleMouseDown(e) })
}

function upload (e) {
  var reader = new FileReader()
  reader.onload = function (event) {
    uploadedImage = new Image()
    uploadedImage.onload = function () {
      canvas.width = uploadedImage.width
      canvas.height = uploadedImage.height
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height)
    }
    uploadedImage.src = event.target.result
  }
  reader.readAsDataURL(e.target.files[0])
  console.log(e.target.files[0])
}

function handleMouseDown (e) {
  let canvasOffset = $('#pixeleditor').offset()
  let offsetX = canvasOffset.left
  let offsetY = canvasOffset.top
  let pixelOffsetX = 930 / 64
  let pixelOffsetY = 465 / 32
  let mouseX = parseInt((e.clientX - offsetX) / pixelOffsetX)
  let mouseY = parseInt((e.clientY - offsetY) / pixelOffsetY)

  let pxData = context.getImageData(mouseX, mouseY, 1, 1)
  pxData.data[0] = 255
  pxData.data[1] = 0
  pxData.data[2] = 0
  pxData.data[3] = 255
  context.putImageData(pxData, mouseX, mouseY)
}

init()
