const parseData = (event) => {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp.responseText)
            let html = ''
            response.forEach(element => {
                html += `<div id="element_${element['id']}"><p>Titile: ${element['title']}</p><p>Content: ${element['content']}</p></div><br>`
            })
            if (html.length == 0) {
                html = 'No elements exist'
            }
            document.getElementById("main").innerHTML = html
        }
    }
    xhttp.open("GET", "post", true)
    xhttp.send()
}

const deleteAllData = (event) => {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Success destroyed')
        }
    }
    xhttp.open("GET", "post_delete", true)
    xhttp.send()
}

const addRandomPost = (event) => {
    let form_data = 'title=' + encodeURIComponent('AUCOMATICALLY Title') +
    '&content=' + encodeURIComponent('AUCOMATICALLY Content');

    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Post added success')
        }
    }
    xhttp.open("POST", "post", true)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhttp.send(form_data)
}

const loadHandlers = (event) => {
    const reloadButton = document.getElementById('reloadPage')
    const deleteAllDataButton = document.getElementById('deleteAllData')
    const addRandomPostButton = document.getElementById('addRandomPost')
    reloadButton.addEventListener('click', parseData)
    deleteAllDataButton.addEventListener('click', deleteAllData)
    addRandomPostButton.addEventListener('click', addRandomPost)
}

document.addEventListener("DOMContentLoaded", loadHandlers)
