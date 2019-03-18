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
    let contenedor = "";
    let div = '';
    data.forEach(function(user) {
      div = `
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
        <div class="tile">
            <div class="wrapper">
                <div class="header">${user.name}</div>

                <div class="banner-img img-thumbnail">
                    <img src="${user.facebook? user.facebook.photo : 'https://avatars.servers.getgo.com/2205256774854474505_medium.jpg'}" alt="Image 1">
                </div>

                <div class="stats">

                    <div>
                        <strong>PUNTOS</strong> <span class="puntos">${user.fidelity}</span>
                    </div>

                    <div>
                        <strong>CANJES</strong> <span class="redeem_puntos">${user.canjes}</span>
                    </div>

                    <div>
                        <strong>ID AFILIADO</strong> ${user.affiliateId}
                    </div>

                    <div>
                        <strong>REGISTRADO</strong> ${user.facebook? user.facebook.provider : 'Local'}
                    </div>
                    

                </div>
                

                <div class="footer">
                    <a href="#" class="btn btn-success redeem" data-userid=${user._id}>Redeem</a>
                    <a href="#" class="btn btn-primary premiar" data-userid=${user._id}>+1</a>
                    <a href="#" class="btn btn-danger">Editar</a>
                </div>
            </div>
        </div>
    </div>
    `;
        contenedor += div;
    });   

    $("#update-search").append(contenedor);
  });
});
