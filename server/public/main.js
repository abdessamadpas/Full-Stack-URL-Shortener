new Vue({
    el: '#app',
    data: {
      name: '',
      url: '',
      error:'',
      
      isValide : false,
      isUsed : false,
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
       
          
              if (result.isUesd) {
                this.isUsed = true,
                this.error = result.details.map(detail=> detail.message).join('. ')
                console.log("isUsed>>>>>>>>>",this.error);
              } 
              else if (result.isValide) {
                this.isValide = true
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


  