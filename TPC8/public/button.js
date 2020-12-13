function fauxplus(){
    var select = $('<input class="w3-input w3-border w3-light-grey" type="file" name="myFile">')
    $("#inputs").append(select)
}

function fauxminus(){
    var a =$("#inputs").children()
    if(a.length > 1)
        a[a.length - 1].remove()
    else
        alert("Mínimo 1 ficheiro")
}
