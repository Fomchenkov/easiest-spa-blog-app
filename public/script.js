const app = Vue.createApp({
    data() {
        return {
            data_html: '',
        }
    },
    methods: {
        parseData: function() {
            const xhttp = new XMLHttpRequest()
            let this_parent = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const response = JSON.parse(xhttp.responseText)
                    let html = ''
                    response.forEach(element => {
                        html += `<div id="element_${element['id']}"><p>Titile: ${element['title']}</p><p>Content: ${element['content']}</p></div><br>`
                    })
                    if (html.length == 0) {
                        html = 'No elements exist'
                    }
                    this_parent.data_html = html
                }
            }
            xhttp.open("GET", "post", true)
            xhttp.send()
        },
        deleteAllData: function() {
            const xhttp = new XMLHttpRequest()
            let this_parent = this;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    this_parent.parseData()
                }
            }
            xhttp.open("GET", "post_delete", true)
            xhttp.send()
        },
        addRandomPost: function() {
            let form_data = 'title=' + encodeURIComponent('AUCOMATICALLY Title') +
            '&content=' + encodeURIComponent('AUCOMATICALLY Content');
            let this_parent = this;
            const xhttp = new XMLHttpRequest()
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    this_parent.parseData()
                }
            }
            xhttp.open("POST", "post", true)
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            xhttp.send(form_data)
        },
    },
    created() {
        this.parseData()
        console.log('Created')
    },
})

app.component('todo-item', {
    props: ['todo'],
    template: `<li>{{ todo.text }}</li>`
})

app.mount('#app')
