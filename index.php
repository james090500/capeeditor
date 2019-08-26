<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Pixel Editor</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/31c6200c4b.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js" integrity="sha256-FPJJt8nA+xL4RU6/gsriA8p8xAeLGatoyTjldvQKGdE=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js" integrity="sha256-CJWfUCeP3jLdUMVNUll6yQx37gh9AKmXTRxvRf7jzro=" crossorigin="anonymous"></script>
    <style>
      #pixeleditor {
        cursor: crosshair;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEX9/f3Kysz3PEtXAAAAG0lEQVQY02P4//9/AwMDw5CngaD+//8DQ50GAO2gqCu/k7NTAAAAAElFTkSuQmCC');
        border: 1px solid black;
        width: 100%;
        image-rendering: optimizeSpeed;             /* Older versions of FF          */
        image-rendering: -moz-crisp-edges;          /* FF 6.0+                       */
        image-rendering: -webkit-optimize-contrast; /* Safari                        */
        image-rendering: -o-crisp-edges;            /* OS X & Windows Opera (12.02+) */
        image-rendering: pixelated;                 /* Awesome future-browsers       */
        -ms-interpolation-mode: nearest-neighbor;   /* IE                            */
      }

      #loadTemplate {
        position: absolute;
        bottom: 0;
        left: 0;
        margin-left: 20px;
      }
    </style>
  </head>
  <body style="background:#efefef">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-6 text-center" style="background:#fff;height:100vh;">
          <h1>Pixel Editor</h1>
          <div class="row">
            <div class="col-11">
              <canvas id="pixeleditor"></canvas>
            </div>
            <div class="col">
              <button type="button" class="btn btn-success mb-1" id="selectPencil" title="Pencil"><i class="fas fa-pencil-alt"></i></button>
              <button type="button" class="btn btn-danger mb-1" id="selectEraser" title="Eraser"><i class="fas fa-eraser"></i></button>
              <button class="btn btn-dark jscolor {valueElement: 'selectColor'}" title="Choose colour"><i class="fas fa-palette"></i></button>
              <input type="hidden" id="selectColor" value="000000">
              <button type="button" class="btn mt-1" id="pickColor" title="Colour picker"><i class="fas fa-eye-dropper"></i></button>
              <label type="button" id="uploadImg" class="btn btn-info btn-file mt-5" title="Upload cape"><i class="fas fa-upload"></i><input type="file" class="d-none"></label>
              <button type="button" id="downloadImg" class="btn btn-success mt-1" title="Download cape"><i class="fas fa-download"></i></button>
              <button id="loadTemplate" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="pixeleditor.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
</html>
