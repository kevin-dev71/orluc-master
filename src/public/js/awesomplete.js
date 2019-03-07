document.addEventListener("DOMContentLoaded", async () => {
    let tagsinput = document.getElementById('tagsinput');

    let awesomplete = new Awesomplete(tagsinput , {
        list: [] ,
        
        filter: function(text, input) {
            return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
        },
    
        item: function(text, input) {
            return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
        },
    
        replace: function(text) {
            var before = this.input.value.match(/^.+,\s*|/)[0];
            this.input.value = before + text + ", ";
        }
    });

    const response  = await fetch("/api/tags");
    const viewModel = await response.json();
    console.log(viewModel);

    awesomplete._list = viewModel;
    awesomplete.evaluate();
});

