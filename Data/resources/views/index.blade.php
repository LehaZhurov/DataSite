<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Создание формы</title>
    @vite(['resources/css/app.css'])
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
  </head>
  <body>
    <nav class="navbar bg-light">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Data.com</span>
        </div>
    </nav>
    <div id = 'workobl'>
      <div id="alertblock">
      
      </div>
      <h1>Конструктор формы</h1>
      <div class="container-fluid d-flex justify-content-center">
          <div id="constructor" class = 'container d-flex' style='flex-direction:column'>
  
          </div>
      </div>
      <button class = 'btn btn-primary' id = 'saveform' type = 'button'>Сохранить</button>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
    @vite(['resources/css/app.css', 
                'resources/js/app.js',
                'resources/js/form/FormBuilder.js',
                'resources/js/form/createrForm.js'])
  </body>
</html>