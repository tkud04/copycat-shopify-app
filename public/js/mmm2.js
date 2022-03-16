let customers = [
   {id: 40779861917892, title: '30ml', email: 'philparmour97@hotmail.com'},
   {id: 31851519377473, title: '50 ml', email: 'beverleybarr5@gmail.com'},
   {id: 31568776495169, title: '30 ml', email: 'stevenwilson016@gmail.com'},
   {id: 40780027396292, title: '30ml', email: 'stevenwilson016@gmail.com'},
   {id: 13565026467910, title: '50 ml', email: 'dylanglynjones@yahoo.co.uk'},
   {id: 19914165092422, title: '5 ml', email: 'shaniece.needham.sn@gmail.com'},
   {id: 13415904477254, title: '50 ml', email: 'johndring70@gmail.com'},
   {id: 31852203475009, title: '5 ml', email: 'shaniece.needham.sn@gmail.com'},
   {id: 20054546710598, title: 'Default Title', email: 'mrwhales4real@gmail.com'},
   {id: 13565602725958, title: '5 ml', email: 'eliedoummar@hotmail.com'},
   {id: 13564864200774, title: '5 ml', email: 'cavellybeatz@gmail.com'},
   {id: 31568802054209, title: '30 ml', email: 'sinan4985@gmail.com'},
   {id: 13564960440390, title: '100 ml', email: 'kenbehan@hotmail.com'},
   {id: 40779910283460, title: '100ml', email: 'james.king@jacksonsestateagents.com'},
   {id: 31852181422145, title: '30 ml', email: 'smithsharon12@sky.com'},
   {id: 31568837705793, title: '30 ml', email: 'akandetomiwa@gmail.com'},
   {id: 31568805953601, title: '30 ml', email: 'georgebradford96@gmail.com'},
   {id: 31852181454913, title: '5 ml', email: 'kendo1955@hotmail.com'},
   {id: 13564844081222, title: '5 ml', email: 'sarah.jarvis1@btinternet.com'},
   {id: 13564929507398, title: '100 ml', email: 'fred.tandy59@gmail.com'},
   {id: 31568716791873, title: '30 ml', email: 'copycatfragrances@jamesvaughton.com'},
   {id: 13564960374854, title: '5 ml', email: 'jordanreynolds072@gmail.com'},
   {id: 31568851468353, title: '30 ml', email: 'daniel.bushnell@gmail.com'},
   {id: 40779910381764, title: '5ml', email: 'daniel.bushnell@gmail.com'},
   {id: 40779900879044, title: '5ml', email: 'dave@marcorichards.co.uk'},
   {id: 31851519344705, title: '100 ml', email: 'reynoldslynn39@yahoo.com'},
   {id: 13564960407622, title: '50 ml', email: 'frazz231@outlook.com'},
   {id: 13565232578630, title: '5 ml', email: 'nickyb57@btinternet.com'},
   {id: 31568820568129, title: '30 ml', email: 'daniel0186@hotmail.co.uk'},
   {id: 31852203409473, title: '50 ml', email: 'gary.sayes@yahoo.com'},
   {id: 13565252108358, title: '5 ml', email: 'shanen.butler1202@gmail.com'},
   {id: 31852214747201, title: '5 ml', email: 'ekasoziii@gmail.com'},
   {id: 31568773480513, title: '30 ml', email: 'tracey.fell@icloud.com'},
   {id: 13415807221830, title: '5 ml', email: 'clarebennsmith@gmail.com'},
   {id: 31852210716737, title: '30 ml', email: 'conordavis272@gmail.com'},
   {id: 29475737632838, title: '30 ml', email: 'pflem76@gmail.com'},
   {id: 29452905545798, title: '5 ml', email: 'teresa.louise.butcher@gmail.com'},
   {id: 31852311511105, title: '5 ml', email: 'aiden_shaw@live.co.uk'},
   {id: 29452905611334, title: '100 ml', email: 'ollieknight19@gmail.com'},
   {id: 13565184344134, title: '5 ml', email: 'ged_23@icloud.com'},
   {id: 40779947344068, title: '5ml', email: 'davidquiligotti@aol.co.uk'},
   {id: 13415904510022, title: '100 ml', email: 'ciaratierney86@gmail.com'},
   {id: 13415904444486, title: '5 ml', email: 'sarahjmlynch@yahoo.com'},
   {id: 13564996780102, title: '100 ml', email: 'robert.lester.1988@gmail.com'},
   {id: 40779995447492, title: '5ml', email: 'kendo1955@hotmail.com'},
   {id: 13565026500678, title: '100 ml', email: 'soniah1976@live.com'},
   {id: 40780009078980, title: '100ml', email: 'sheolob56@gmail.com'},
   {id: 29434974404678, title: '50 ml', email: 'thamrinjoe@gmail.com'},
   {id: 19914165092422, title: '5 ml', email: 'danieldervin@googlemail.com'},
   {id: 40779861917892, title: '30ml', email: 'zacks08@ymail.com'},
   {id: 31568837705793, title: '30 ml', email: 'charles.drinnan@live.com'},
   {id: 13564960440390, title: '100 ml', email: 'darryl@thekitchenboutique.co.uk'},
   {id: 31568773480513, title: '30 ml', email: 'chipagbon@gmail.com'},
   {id: 13415807287366, title: '100 ml', email: 'rocky@g-rock.co.uk'},
   {id: 13415807287366, title: '100 ml', email: 'farrarthompson68@hotmail.com'},
   {id: 31568773480513, title: '30 ml', email: 'neighbourkira@gmail.com'},
   {id: 31568773480513, title: '30 ml', email: 'amyfeeney0@gmail.com'},
   {id: 13415807287366, title: '100 ml', email: 'lizmorgan40@icloud.com'},
   {id: 31568773480513, title: '30 ml', email: 'sophiehenton94@icloud.com'},
   {id: 13415807287366, title: '100 ml', email: 'srsfitness@live.com'},
   {id: 13415807221830, title: '5 ml', email: 'hakim83@hotmail.co.uk'},
   {id: 31568828072001, title: '30 ml', email: 'peterjjameslomax@gmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'mariegreenhalgh1981@gmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'jadelai8@hotmail.co.uk'},
   {id: 31568773480513, title: '30 ml', email: 'jasmine86c@gmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'mary.roberts1999@gmail.com'},
   {id: 13565252108358, title: '5 ml', email: 'hammedajao.me@gmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'julieanne_hendren@yahoo.co.uk'},
   {id: 31568773480513, title: '30 ml', email: 'janeyjudge14@gmail.com'},
   {id: 29475737632838, title: '30 ml', email: 'markthomas466@btinternet.com'},
   {id: 13415807221830, title: '5 ml', email: 'terri.sargent@hotmail.com'},
   {id: 31568828072001, title: '30 ml', email: 'terri.sargent@hotmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'simonebraund@icloud.com'},
   {id: 13565252108358, title: '5 ml', email: 'mia.rosie@icloud.com'},
   {id: 13415807287366, title: '100 ml', email: 'whoochy@hotmail.com'},
   {id: 13565252108358, title: '5 ml', email: 'pj.lomax@gmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'lukedugbo19@gmail.com'},
   {id: 13565252108358, title: '5 ml', email: 'andrew.shaw@live.co.uk'},
   {id: 31568773480513, title: '30 ml', email: 'moraghdarby@btopenworld.com'},
   {id: 29452905545798, title: '5 ml', email: 'm_sarova@hotmail.com'},
   {id: 31568773480513, title: '30 ml', email: 'will.beuk@gmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'samskuse@aol.co.uk'},
   {id: 13415807254598, title: '50 ml', email: 'cloudnine.kelly@gmail.com'},
   {id: 13415807254598, title: '50 ml', email: 'jemmagofton@gmail.com'},
   {id: 31568807985217, title: '30 ml', email: 'rkaden77@gmail.com'},
   {id: 31568773480513, title: '30 ml', email: 'josh.fairweather@icloud.com'},
   {id: 13415807221830, title: '5 ml', email: 'andrea.75@live.co.uk'},
   {id: 13415807221830, title: '5 ml', email: 'chrisquattro@virginmedia.com'},
   {id: 29475737632838, title: '30 ml', email: 'conordavis272@gmail.com'},
   {id: 31568807985217, title: '30 ml', email: 'daniaitkenhead@gmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'marcina213@gmail.com'},
   {id: 31568828072001, title: '30 ml', email: 'ricardo_hawkes@hotmail.co.uk'},
   {id: 13415807287366, title: '100 ml', email: 'chriswren74@yahoo.co.uk'},
   {id: 29452905578566, title: '50 ml', email: 'aoifescannell@hotmail.com'},
   {id: 30877396959302, title: '30 ml', email: 'kc81@hotmail.co.uk'},
   {id: 13415807287366, title: '100 ml', email: 'naznaz_63@hotmail.com'},
   {id: 31568773480513, title: '30 ml', email: 'sabahbilal33@gmail.com'},
   {id: 31568773480513, title: '30 ml', email: 'leviriaj1@gmail.com'},
   {id: 31852121849921, title: '5 ml', email: 'thwildfire@gmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'jorowlandson73@gmail.com'},
   {id: 31852311511105, title: '5 ml', email: 'rhianna.willis98@yahoo.com'},
   {id: 40774499762372, title: '5ml', email: 'lynn.lpa@outlook.com'},
   {id: 13565252108358, title: '5 ml', email: 'sophiehoward89@hotmail.com'},
   {id: 31852311511105, title: '5 ml', email: 'eliedoummar@hotmail.com'},
   {id: 13415807287366, title: '100 ml', email: 'ugrasmogla@hotmail.com'},
   {id: 31852210716737, title: '30 ml', email: 'sinan4985@gmail.com'},
   {id: 29452905545798, title: '5 ml', email: 'edwardmaddison@gmail.com'},
   {id: 31568773480513, title: '30 ml', email: 'lucy.fmn@hotmail.co.uk'},
   {id: 13415807221830, title: '5 ml', email: 'lucy.fmn@hotmail.co.uk'},
   {id: 31568812441665, title: '30 ml', email: 'flanandvix@aol.com'},
   {id: 13564864200774, title: '5 ml', email: 'kendo1955@hotmail.com'},
   {id: 31852311380033, title: '100 ml', email: 'johnsontola@hotmail.com'},
   {id: 13564996780102, title: '100 ml', email: 'crago@me.com'},
   {id: 13565232644166, title: '100 ml', email: 'samueldfox91@gmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'danieldervin@googlemail.com'},
   {id: 13565252108358, title: '5 ml', email: 'danieldervin@googlemail.com'},
   {id: 13565184344134, title: '5 ml', email: 'danieldervin@googlemail.com'},
   {id: 13564960440390, title: '100 ml', email: 'richard.thomas.cotton@gmail.com'},
   {id: 29434974404678, title: '50 ml', email: 'lee.lm30@gmail.com'},
   {id: 13564960407622, title: '50 ml', email: 'mossey56@gmail.com'},
   {id: 31568716791873, title: '30 ml', email: 'charles.drinnan@live.com'},
   {id: 40779910381764, title: '5ml', email: 'ekasoziii@gmail.com'},
   {id: 31852316983361, title: '100 ml', email: 'b.qh@hotmail.co.uk'},
   {id: 13565252108358, title: '5 ml', email: 'ekasoziii@gmail.com'},
   {id: 13415807221830, title: '5 ml', email: 'kyledavitt@gmail.com'},
   {id: 13565602725958, title: '5 ml', email: 'ekasoziii@gmail.com'},
   {id: 40779995447492, title: '5ml', email: 'ekasoziii@gmail.com'}
  ];
 let counter = 0, updateCounter = 0;

 function bomb(){
    let x = customers[counter];
    console.log("x: ",x);
    fetch(`/ometria-get-customer?email=${encodeURIComponent(x.email)}`)
    .then(response => response.json())
    .then(d => {
        if(d.data){
          
            setTimeout(function(){
                console.log("d.data: ", d.data);
                ++counter; 
                if(counter < customers.length) bomb();
                },1000);      
        }
    });  
 }

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


function bomb(){
    let x = customers[counter];
    console.log("x: ",x);
    fetch(`/ometria-get-customer?email=${encodeURIComponent(x.email)}`)
    .then(response => response.json())
    .then(d => {
        if(d.data){
          
            setTimeout(function(){
                console.log("d.data: ", d.data);
                ++counter; 
                if(counter < customers.length) bomb();
                },1000);      
        }
    });  
 }

function update(){
    let x = pv[updateCounter];
    console.log("x in update(): ", x);
    //Update 
    //Step 1: Fetch the provudct variant data from Shopify
    fetch(`/shopify-product-variants?pv=${x.pv}`)
        .then(response => response.json())
        .then(d => {
            if(d.data){
                let selected = d.data.find(i =>{ 
                    let temp = x.pv.split("_");
                    if(i.id == temp[1]) return i;
                });
    
                if(selected){
                    selected.email = x.email;
                console.log("selected: ",selected);
                
                //Step 2 - Fetch the customer custom fields from Ometria
                fetch(`/ometria-get-customer?email=${encodeURIComponent(selected.email)}`)
                .then(response => response.json())
                .then(d => {
                    if(d.data){
                        console.log("[selected,d.data]: ",[selected,d.data]);
                        let ometriaProperties = d.data.properties;
                        let custom_fields = {}, toBeUpdated = false;

                        switch(selected.title){
                          case "5 ml":
                          case "5ml":
                              if(ometriaProperties.has_bought_5ml){
                                //custom_fields['has_bought_5ml'] = ometriaProperties['has_bought_5ml'] + 1;
                              }
                              else{
                                custom_fields['has_bought_5ml'] = 1;
                                toBeUpdated = true;
                              }
                          break;

                          case "30 ml":
                          case "30ml":
                              if(ometriaProperties.has_bought_30ml){
                                //custom_fields['has_bought_30ml'] = ometriaProperties['has_bought_30ml'] + 1;
                              }
                              else{
                                custom_fields['has_bought_30ml'] = 1;
                                toBeUpdated = true;
                              }
                          break;

                          case "50 ml":
                          case "50ml":
                              if(ometriaProperties.has_bought_50ml){
                               // custom_fields['has_bought_50ml'] = ometriaProperties['has_bought_50ml'] + 1;
                              }
                              else{
                                custom_fields['has_bought_50ml'] = 1;
                                toBeUpdated = true;
                              }
                          break;

                          case "100 ml":
                          case "100ml":
                              if(ometriaProperties.has_bought_100ml){
                               // custom_fields['has_bought_100ml'] = ometriaProperties['has_bought_100ml'] + 1;
                            }
                            else{
                              custom_fields['has_bought_100ml'] = 1;
                              toBeUpdated = true;
                            }
                          break;
                        }

                         let payload = {
                            customer_id: selected.id,
                            customer_email: selected.email,
                            fields: custom_fields
                          };

                          console.log("[payload, toBeUpdated]: ",[payload,toBeUpdated]);

                        //Step 3 - Populate the appropriate custom field and update Ometria
                          
                        if(toBeUpdated){
                            const req = new Request("/update-ometria",{
                              method: 'POST', 
                              headers: {
                                "Content-Type": "application/json"
                              },
                              body: JSON.stringify(payload)
                           });
                             
                             fetch(req)
                             .then(response => response.json())
                             .then(d => {
                                if(d.data){
                                  console.log("Response from updating contatc: ",response);
                                  hideElem("#update-form-loading");
                                  //if(response.status == "ok"){}

                                  setTimeout(function(){
                                    //console.log("d.data: ", d.data);
                                    ++updateCounter; 
                                    if(updateCounter < pv.length) update();
                                    },1000); 
                                }
                                });
                        }
                        else{
                            setTimeout(function(){
                                //console.log("d.data: ", d.data);
                                ++updateCounter; 
                                if(updateCounter < pv.length) update();
                                },1000); 
                        }
                    }
                })
                
               }

              
            
            }
            
        });
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
            showElem("#update-form-loading");
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
            hideElem("#update-form-loading");
            if(response.status == "ok"){
                hideElem("#update-form-loading");
                $("#update-form-status").html(response.message);
                showElem("#update-form-status");
                setTimeout(() => {
                    hideElem("#update-form-status");
                    $('#ometria-id').val(""); $('#ometria-email').val("");
                },1000);
            }
        }
    });

    document.querySelector('#updater').addEventListener('click', e => {
        e.preventDefault();
        bomb();
                  
    });

    document.querySelector('#updater2').addEventListener('click', e => {
        e.preventDefault();
        bomb2();
                  
    });

    /*
    document.querySelector('#filler').addEventListener('click', e => {
        e.preventDefault();
        let ret = ``;
        for(let i of customers){
           ret += `has_bought_${}=`;
        }
        document.querySelector('#ometria-fields').value = ret;
                  
    });
    */
});