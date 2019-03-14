document.addEventListener("DOMContentLoaded", () => {    

    document.getElementById('actions').addEventListener('input', async function() {
        let buscador = document.getElementById('search');
        let contenedor = document.getElementById('product-item');
        contenedor.innerHTML = "";
        try{
            let response = await fetch('/api/allProducts?search='+buscador.value);
            let products = await response.json();
            const ul = document.createElement('div');
            ul.className = 'list-group';
            products.forEach(product => {
                let li = document.createElement("a");
                li.appendChild(document.createTextNode(product.name));
                li.setAttribute("id", product._id)
                li.className = 'list-group-item list-group-item-action';
                li.href = '#';
                ul.appendChild(li);                
            });
            contenedor.appendChild(ul);
        } catch(e){

        }
        
        
    });

    

});