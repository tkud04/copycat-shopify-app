function showElem(selector){
    let names = [];

    if(Array.isArray(selector)){
        names = selector;
      }
      else{
          names.push(selector);
      }

      for(let i = 0; i < names.length; i++){
        let el = document.querySelector(names[i]);
        if(el){
          el.style.display = 'block';
        }
    }
}

function hideElem(selector){
    let names = [];

    if(Array.isArray(selector)){
        names = selector;
      }
      else{
          names.push(selector);
      }

      for(let i = 0; i < names.length; i++){
          let el = document.querySelector(names[i]);
        if(el){
          el.style.display = 'none';
        }
    }
}

$(document).ready(() => {
    //Custom fields update
    hideElem([
         '#update-form-status','#update-form-loading',
         '#ometria-id-error','#ometria-email-error','#ometria-fields-error'
        ]);

    $('#update-form').submit(async e => {
        e.preventDefault();
        hideElem([
            '#ometria-id-error','#ometria-email-error','#ometria-fields-error'
           ]);
        console.log("Submitting..");
        let o_id = $('#ometria-id').val(), o_email = $('#ometria-email').val(), o_fields = $('#ometria-fields').val(), custom_fields = {};

        if(o_id == "" || o_email == "" || o_fields == ""){
           if(o_id == "") showElem("#ometria-id-error");
           if(o_email == "") showElem("#ometria-email-error");
           if(o_fields == "") showElem("#ometria-fields-error");
        }
        else{
            let cf = o_fields.split("\n");
            
            for(let field of cf){
              let temp = field.split("=");
              custom_fields[temp[0]] = temp[1];
            }
            //console.log("Custom fields: ",custom_fields);
            const req = new Request("/update-ometria",{
                method: 'POST', 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customer_id: o_id,
                    customer_email: o_email,
                    fields: custom_fields
                })
            });
            const send = await fetch(req);
            const response = await send.json();
            console.log("Response: ",response);
        }
    });
});