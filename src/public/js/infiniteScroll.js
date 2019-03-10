document.addEventListener("DOMContentLoaded", () => {

    let currentPage = Number(2);
    let finalPage = Number(1);

    document.getElementById('load-more-btn')
	.addEventListener('click', async e => {
		e.preventDefault();
        const response  = await fetch("/api/products?page=" + currentPage);
        const viewModel = await response.json();
        if(currentPage <= viewModel.pages){
            currentPage += 1;
            finalPage += 1;
        }
        let contenedor = document.getElementById('products-list-main');
        const div = document.createElement('div');
        div.className = 'card-columns';
        viewModel.products.forEach(product => {
			const div2 = document.createElement('div');
            div2.className = 'card animated fadeIn';
            div2.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p>USD ${product.sale_price}</p>
                    <a href="#" class="btn btn-primary">
                        View
                    </a>
                </div>
                `;
            div.appendChild(div2);
		});
        contenedor.appendChild(div);
        contenedor.appendChild(document.createElement('hr'));
        if(finalPage == viewModel.pages ){
            document.getElementById('load-more-btn').style.display = 'none';
            document.getElementById('no-more-products-to-load').classList.remove('d-none');
        }
	});

});
