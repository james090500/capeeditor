/* eslint no-undef: 0 */
var canvas
var context
var uploadedImage
var pixelColor = [ 0, 0, 0, 255 ]

var mouseDown = false

function init () {
  listeners()
  canvas = document.getElementById('pixeleditor')
  context = canvas.getContext('2d')
  loadTemplate(true)
}

function listeners () {
  $('#loadTemplate').on('click', () => { loadTemplate(false) })
  $('#uploadImg').on('change', upload)
  $('#chooseColor').on('change', updateColor)
  $('#downloadImg').on('click', download)

  $('#pixeleditor').on('mousedown', function () {
    mouseDown = true
  })

  $('#pixeleditor').on('mouseup', function () {
    mouseDown = false
  })

  $('#pixeleditor').on('mousemove', function (e) {
    if (mouseDown) {
      editPixel(e)
    }
  })
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
}

function editPixel (e) {
  let canvasOffset = $('#pixeleditor').offset()
  let offsetX = canvasOffset.left - window.pageXOffset
  let offsetY = canvasOffset.top - window.pageYOffset
  let pixelOffsetX = $('#pixeleditor').width() / canvas.width
  let pixelOffsetY = $('#pixeleditor').height() / canvas.height
  let mouseX = parseInt((e.clientX - offsetX) / pixelOffsetX)
  let mouseY = parseInt((e.clientY - offsetY) / pixelOffsetY)

  let pxData = context.getImageData(mouseX, mouseY, 1, 1)
  for (let i = 0; i < 3; i++) {
    pxData.data[i] = pixelColor[i]
  }
  pxData.data[3] = 255

  context.putImageData(pxData, mouseX, mouseY)
}

function updateColor () {
  let hexColor = $('#chooseColor').val()
  hexColor = hexColor.replace('#', '')
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
    console.log('test')
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
