$(document).ready(function(){
	$('.premiar').on('click' , 'button' , async function (e) {
		e.stopPropagation();
		e.preventDefault();
        let updateUrl = '/admin/fidelity/' + $(this).parent().data('userid');
        let etiqueta = $(this).parent().parent().find('.followrs').find('.number');
        const response  = await fetch(updateUrl);
        const viewModel = await response.json();
        etiqueta.text(viewModel.fidelity);
	});	
});