function deleteRecepie() {
    let result = confirm("Really Delete?")
    if (result) {
        $.ajax({
            type: "DELETE",
            url: window.location.pathname,
            error: () => console.log("error during ajax DELETE request."),
            success: function() {
                console.log('success @ success:')
                //window.location.replace('./rezepte/food/')
            }
        }).done( () => console.lof('success @ .done()'));
    }
}
// window.location.pathname