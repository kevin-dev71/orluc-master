/* ======= BUSQUEDA DE PRODUCTOS ==========*/
$("#products-search").on("submit", function(e) {
  e.stopPropagation();
  e.preventDefault();

  var search = $(this)
    .find("input")
    .val();
  if (search === "") {
    location.replace("/admin/products");
  } else {
    search = "search=" + search;
  }
  $.get("/admin/search/products?" + search, function(data) {
    $("#update-search").html("");
    let div = `
      <div class="row mt-3">
      <div class="col-md-12">
        <table class="box table table-striped table-hover table-responsive m-t-0" cellspacing="0">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Producto</th>
              <th>Descripcion</th>
              <th>Precio Costo</th>
              <th>Precio Venta</th>
              <th>Cantidad</th>
              <th>Detalles</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
          `;

    data.products.forEach(function(product) {
      div += `
            <tr>
            <td><img class="img-fluid img-thumbnail" src="${
              product.image
            }"></td>
            <td>${product.name}</td>
            <td>${product.description.substring(0, 50)}....</td>
            <td>${product.cost_price}</td>
            <td>${product.sale_price}</td>
            <td>${product.quantity}</td>
            <td>
              <a class="btn btn-info btn-block btn-sm" href="/admin/products/${
                product._id
              }"><i class="far fa-eye"></i> Ver
                mas</a>
            </td>
            <td>
              <form action="/admin/products/${
                product._id
              }?_method=DELETE" method="POST">
                <input type="hidden" name="_method" value="DELETE">
                <button onclick="modalConfirm(this, event)" class="btn btn-danger btn-block btn-sm"> <i
                    class="fas fa-trash-alt"></i> Delete</button>
              </form>
            </td>
            <td>
              <a class="btn btn-warning btn-block btn-sm" href="/admin/products/${
                product._id
              }/edit"><i
                  class="fas fa-edit"></i>
                Editar</a>
            </td>
          </tr>
            `;
    });
    div += `
                </tbody>
                </table>
            </div>
            </div>
        `;

    $("#update-search").append(div);
  });
});

/* ======= BUSQUEDA DE USUARIOS ==========*/
$("#users-search").on("submit", function(e) {
    e.stopPropagation();
    e.preventDefault();
  
    var search = $(this)
      .find("input")
      .val();
    if (search === "") {
      location.replace("/admin/fidelity");
    } else {
      search = "search=" + search;
    }
    $.get("/admin/search/users?" + search, function(data) {
      $("#update-search").html("");
      let div = `
        <div class="row mt-3">
        <div class="col-md-12">
          <table class="box table table-striped table-hover table-responsive m-t-0" cellspacing="0">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Producto</th>
                <th>Descripcion</th>
                <th>Precio Costo</th>
                <th>Precio Venta</th>
                <th>Cantidad</th>
                <th>Detalles</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
            `;
  
      data.products.forEach(function(product) {
        div += `
              <tr>
              <td><img class="img-fluid img-thumbnail" src="${
                product.image
              }"></td>
              <td>${product.name}</td>
              <td>${product.description.substring(0, 50)}....</td>
              <td>${product.cost_price}</td>
              <td>${product.sale_price}</td>
              <td>${product.quantity}</td>
              <td>
                <a class="btn btn-info btn-block btn-sm" href="/admin/products/${
                  product._id
                }"><i class="far fa-eye"></i> Ver
                  mas</a>
              </td>
              <td>
                <form action="/admin/products/${
                  product._id
                }?_method=DELETE" method="POST">
                  <input type="hidden" name="_method" value="DELETE">
                  <button onclick="modalConfirm(this, event)" class="btn btn-danger btn-block btn-sm"> <i
                      class="fas fa-trash-alt"></i> Delete</button>
                </form>
              </td>
              <td>
                <a class="btn btn-warning btn-block btn-sm" href="/admin/products/${
                  product._id
                }/edit"><i
                    class="fas fa-edit"></i>
                  Editar</a>
              </td>
            </tr>
              `;
      });
      div += `
                  </tbody>
                  </table>
              </div>
              </div>
          `;
  
      $("#update-search").append(div);
    });
  });