/* eslint no-undef: 0 */

// Important Variables
var canvas
var context
var pixelColor = [ 0, 0, 0, 255 ]

// Control Variables
var mouseDown = false

// Editor Variables
var eraserSelected = false
var colorPickerSelected = false

function init () {
  listeners()
  canvas = document.getElementById('pixeleditor')
  context = canvas.getContext('2d')
  loadTemplate(true)
}

function listeners () {
  // Canvas Management
  $('#loadTemplate').on('click', () => { loadTemplate(false) })
  $('#uploadImg').on('change', upload)
  $('#downloadImg').on('click', download)

  // Edit Buttons
  $('#selectPencil').on('click', function () { eraserSelected = false })
  $('#selectEraser').on('click', function () { eraserSelected = true })
  $('#selectColor').on('change', updateColor)

  // Mouse Controls
  $('#pixeleditor').on('mousedown', function () {
    mouseDown = true
    // This is needed to capture to first click
    editPixel()
  })

  $('#pixeleditor').on('mouseup', function () {
    mouseDown = false
  })

  $('#pixeleditor').on('mousemove', function () {
    if (mouseDown) {
      editPixel()
    }

    if (colorPickerSelected) {
      updateColorPicker()
    }
  })

  $('#pickColor').on('click', function () {
    $('#pixeleditor').css('cursor', 'help')
    colorPickerSelected = true
  })
}

function upload (e) {
  var reader = new FileReader()
  reader.onload = function (event) {
    let uploadedImage = new Image()
    uploadedImage.onload = function () {
      canvas.width = uploadedImage.width
      canvas.height = uploadedImage.height
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height)
    }
    uploadedImage.src = event.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

function getMouseLocation () {
  let element = $(event.target)
  let canvasOffset = element.offset()
  let offsetX = canvasOffset.left - window.pageXOffset
  let offsetY = canvasOffset.top - window.pageYOffset
  let pixelOffsetX = element.width() / canvas.width
  let pixelOffsetY = element.height() / canvas.height
  let mouseX = parseInt((event.clientX - offsetX) / pixelOffsetX)
  let mouseY = parseInt((event.clientY - offsetY) / pixelOffsetY)

  return [ mouseX, mouseY ]
}

function editPixel () {
  let mouse = getMouseLocation()
  let pxData = context.getImageData(mouse[0], mouse[1], 1, 1)

  if (colorPickerSelected) {
    pixelColor = pxData.data
    colorPickerSelected = false
    $('#pixeleditor').css('cursor', 'crosshair')
    return
  }

  for (let i = 0; i < 3; i++) {
    pxData.data[i] = pixelColor[i]
  }

  pxData.data[3] = eraserSelected ? 0 : 255

  context.putImageData(pxData, mouse[0], mouse[1])
}

function updateColorPicker () {
  let mouse = getMouseLocation()
  let pxData = context.getImageData(mouse[0], mouse[1], 1, 1)
  let r = pxData.data[0]
  let b = pxData.data[1]
  let g = pxData.data[2]
  $('#selectColorParent').css('background-color', 'rgb(' + r + ', ' + b + ', ' + g + ')')
}

function updateColor (event) {
  let hexColor = event.target.value
  pixelColor = []
  pixelColor[0] = parseInt(hexColor.substring(0, 2), 16)
  pixelColor[1] = parseInt(hexColor.substring(2, 4), 16)
  pixelColor[2] = parseInt(hexColor.substring(4, 6), 16)
  pixelColor[3] = 255
}

function download () {
  let unix = parseInt(new Date().getTime() / 1000)
  canvas.toBlob(function (blob) {
    saveAs(blob, 'custom-cape-' + unix + '.png')
  }, 'image/png')
}

function loadTemplate (autoLoad) {
  if (!autoLoad) {
    let confirmed = confirm('Are you sure you want to load the template? It will delete your current cape')
    if (!confirmed) {
      return
    }
  }

  let template = new Image()
  template.onload = function () {
    canvas.width = template.width
    canvas.height = template.height
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(template, 0, 0)
  }
  template.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAA/klEQVRoQ+2X0QrDIAxFk08ZjLLv39fsobBPyVDWlYHFq0Rsyu1LX6Imx5urqqTPxPK/+oFhqlqdKi+7r6t2Kw/RNzQXsl4pRnPxihVmpiJgOmjkBgGN7y30aNx0AL/EFsu7YM8yYX2g6NsQhQGQyhoB4TwAUoWL2ZECtn31hkAAs03wr2OpgHoLeHtBuBYgAOfTgAoYZYIiq6jcwXvjboX2wq7lXsfhMAUQABXAFqAH9JhgfhECRuhngm2vRzjaZDUC6DgGqYCvxmptcOkWQFRweQA1CKcHALvl5MDmu/rkfN2XJwB3pMEmpAKCbZh7ulSAO9JgE1IBwTbMPd0PBl+zIeA9OcoAAAAASUVORK5CYII='
}

init()
