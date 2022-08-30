new Vue({
    el: '#app',
    data: {
      name: '',
      url: '',
      error:'',
      
      isError : false,
      isVisible : false
    },
    methods: {
      createPuny() {
        const body = {
          name: this.name,
          url: this.url
        };
  
        fetch('/api/puny', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json'
          }
        }).then(response => {
          return response.json();
        }).then(result => {
       
          
               if (result.isError) {
                this.isError = true
                this.error = result.details.map(detail=> detail.message).join('. ')
                console.log("isValide>>>>>>>>>",this.error);
              }else{
                this.isVisible = true
              }
          }

                     
         
        )
      },


      close(){
        this.isUsed= false

      }
    }
  });


  