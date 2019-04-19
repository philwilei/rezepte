function deleteRecepie() {
    let result = confirm("Really Delete?")
    if (result) {
        $.ajax({
            type: "DELETE",
            url: window.location.pathname,
            error: () => console.log("error during ajax DELETE request.")
        });
    }
}
// window.location.pathname