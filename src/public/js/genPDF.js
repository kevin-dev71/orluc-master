function genPDF() {
    html2canvas(document.body , {
       onrendered: function(canvas){
           var img = canvas.toDataUrl("image/png");
           var doc = new jsPDF();
           doc.addImage(img, 'JPEG', 20, 20);
           doc.save('test.pdf');
       } 
    });
}

function printPDF(quality = 1) {
    const filename  = 'ThisIsYourPDFFilename.pdf';

    html2canvas(document.querySelector('#printeable'), {scale: quality})
            .then(canvas => {
                let pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
                pdf.save(filename);
            });
}