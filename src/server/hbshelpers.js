const helpers = {};

helpers.trimString  = (text , startstring, endstring) => {
    return text.substring(startstring , endstring);
};

helpers.paginationRow  = (pages , current) => {

    let nav = `
    <nav class="mx-auto">
        <ul class="pagination">
    `;
    // if pages exist
    if(pages > 0 ){
        // FIRST ITEM
        if(current == 1){
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
        let i = (Number(current) > 5 ? Number(current) - 4 : 1);
        if(i !== 1) {
            nav += `
            <li class="page-item disabled">
                <a class="page-link" href="#">...</a>
            </li>
            `;
        }
        for(; i <= (Number(current) + 4) && i <= pages; i++) {
            if(i == current){
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
        if(current == pages) {
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

module.exports = helpers;