const helpers = {};

helpers.trimString = (text, startstring, endstring) => {
  return text.substring(startstring, endstring);
};

helpers.paginationRow = (pages, current) => {
  let nav = `
    <nav class="mx-auto">
        <ul class="pagination">
    `;
  // if pages exist
  if (pages > 0) {
    // FIRST ITEM
    if (current == 1) {
      nav += `
            <li class="page-item disabled">
                <a class="page-link" href="#">First</a>
            </li>
            `;
    } else {
      nav += `
            <li class="page-item">
                <a class="page-link" href="/admin/products?page=1">First</a>
            </li>`;
    }
    // ITEMS
    let i = Number(current) > 5 ? Number(current) - 4 : 1;
    if (i !== 1) {
      nav += `
            <li class="page-item disabled">
                <a class="page-link" href="#">...</a>
            </li>
            `;
    }
    for (; i <= Number(current) + 4 && i <= pages; i++) {
      if (i == current) {
        nav += `
                <li class="page-item active">
                    <a class="page-link" href="${i}">
                        ${i}
                    </a>
                </li>
                `;
      } else {
        nav += `
                <li class="page-item">
                    <a class="page-link" href="/admin/products?page=${i}">
                        ${i}
                    </a>
                </li>
                `;
      }
      if (i == Number(current) + 4 && i < pages) {
        nav += `
                <li class="page-item disabled">
                    <a class="page-link" href="#">...</a>
                </li>
                `;
      }
    }
    // <!-- LAST ITEM -->
    if (current == pages) {
      nav += `
            <li class="page-item disabled">
                <a class="page-link" href="#">
                    Last
                </a>
            </li>
            `;
    } else {
      nav += `
            <li class="page-item">
                <a class="page-link" href="/admin/products?page=${pages}">
                    Last
                </a>
            </li>
            `;
    }
  }
  nav += `</ul>
        </nav>`;

  return nav;
};

helpers.isEven = (conditional, options) => {
  if (conditional % 2 == 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};

helpers.pdfBreak = products => {
    let contenedor = ``;
    products.forEach((product, index, array) => {
        if (index % 2 != 0) {
            contenedor += `
                <div class='row breaker-avoid'>
                    <div class="col-md-6">
                        <div class="single_menu_list">
                            <img src="${products[index - 1].image}" alt="">
                            <div class="menu_content">
                                <h4>${products[index - 1].name} <span>₡${products[index - 1].sale_price}</span></h4>
                                <p>${products[index - 1].description}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="single_menu_list">
                            <img src="${products[index].image}" alt="">
                            <div class="menu_content">
                                <h4>${products[index].name} <span>₡${products[index].sale_price}</span></h4>
                                <p>${products[index].description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        if(index == products.length - 1 && index % 2 == 0){
            contenedor += `
                <div class='row breaker-avoid'>
                    <div class="col-md-6">
                        <div class="single_menu_list">
                            <img src="${product.image}" alt="">
                            <div class="menu_content">
                                <h4>${product.name} <span>₡${product.sale_price}</span></h4>
                                <p>${product.description}</p>
                            </div>
                        </div>
                    </div>                    
                </div>
            `
        }
    });
    return contenedor;
};


helpers.fidelityCount = user => {
    let contenedor = ``;
    for(let i = 1 ; i <= 10; i++){
        if(i <= user.fidelity){
            if(i == 10){
                contenedor += `<div class="stamp stamp-add"><i class="fa fa-gift"></i></div>`;    
            } else {
                contenedor += `<div class="stamp stamp-add">${i}</div>`;
            }
        } else {
            contenedor += `<div class="stamp">${i}</div>`;
        }
    }
    return contenedor;
};

module.exports = helpers;
