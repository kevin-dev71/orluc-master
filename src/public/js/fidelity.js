$(document).ready(function(){
	$('.premiar').on('click' , async function (e) {
		e.stopPropagation();
		e.preventDefault();
        
        let etiqueta = $(this).parent().parent().find('.puntos');

        if(Number(etiqueta.text()) < 10){
            let updateUrl = '/admin/fidelity/' + $(this).data('userid');
            const response  = await fetch(updateUrl);
            const viewModel = await response.json();
            etiqueta.text(viewModel.fidelity);
        } else {
            alert('Debes hacer Redeem');
        }
        
    });
    
    $('.redeem').on('click' , async function (e) {
		e.stopPropagation();
        e.preventDefault();
        let etiqueta = $(this).parent().parent().find('.puntos');
        if(etiqueta.text() < '10'){            
            alert('Aun no tiene 10 puntos');
        }
        else{
            let updateUrl = '/admin/redeem/' + $(this).data('userid');        
            const response  = await fetch(updateUrl);
            const viewModel = await response.json();
            etiqueta.text(viewModel.fidelity);            
            etiqueta = $(this).parent().parent().find('.redeem_puntos');
            etiqueta.text(viewModel.canjes);
        }
	});
});