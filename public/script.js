const app = Vue.createApp({
    data() {
        return {
            data_html: '',
            posts: []
        }
    },
    methods: {
        parseData: function() {
            const xhttp = new XMLHttpRequest()
            let this_parent = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const response = JSON.parse(xhttp.responseText)
                    this_parent.posts = []
                    response.forEach(element => {
                        this_parent.posts.push({id: element['id'], title: element['title'], content: element['content']})
                    })
                    this_parent.data_html = ''
                    if (this_parent.posts.length == 0) {
                        this_parent.data_html = 'No elements exist'
                    }
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

app.component('blog-post', {
    props: ['id', 'title', 'content'],
    template: `<div  v-bind="{ id: 'element_' + id }"><p>{{ title }}</p><p>{{ content }}</p></div><br>`
})  

app.mount('#app')
