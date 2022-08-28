new Vue({
    el: '#app', 
    data:{
        name: '', 
        url: '',
    },
    methods:{
        createPuny(){
            const body = {
                name:this.name,
                    url : this .url
            }
            fetch('/api/puny/',{
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'content-type':'application/json'
                }
            }).then(response =>{
                console.log(response);
                return response.json()
            }).then( result => {
                console.log(result);
            })

      
    }
    }
   
  })