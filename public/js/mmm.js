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

function hideOnClickOutside(selector) {
    let element = document.querySelector(selector);
    const outsideClickListener = event => {
        if (event.target.closest(selector) === null) { // or use: event.target.closest(selector) === null
          element.style.display = 'none';
          removeClickListener();
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
    }

    document.addEventListener('click', outsideClickListener);
}

function _urlEncode(dt){
    const fd = Object.entries(dt).map(
        ([k,v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    ).join("&");
    return fd;
}

async function submitForm(url,fd){
	const req = new Request(url,{
        method: 'POST', 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: _urlEncode(fd)
    });
    const r = await fetch(req,{
       // mode: "no-cors"
    });
    let res = await r.json();
   return res;
}


const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js 



//Event handlers

document.addEventListener("DOMContentLoaded", function() {
    let subscribeBtn = document.querySelector('#subscribe-btn'), subscribePopup = document.querySelector('#popup-container'), subscribeClose = document.querySelector('.closebtn'),
    birthdayBtn = document.querySelector('#birthday-btn'), birthdayPopup = document.querySelector('#birthday-popup'), birthdayClose = document.querySelector('#birthday-close-btn'),
    smsBtn = document.querySelector('#sms-btn'), smsPopup = document.querySelector('#sms-popup'), smsClose = document.querySelector('#sms-close-btn');

  hideElem([
      '#birthday-popup','#sms-popup','#forms-complete-popup',
      '#subscribe-loading','#birthday-loading','#sms-loading']);

let arr = [
    {btn: subscribeBtn, popup: subscribePopup, close: subscribeClose}
];


for(let a of arr){
    a.btn.addEventListener("click",e => {
        e.preventDefault();
        a.popup.classList.add('open');
       });

    a.close.addEventListener("click",e => {
        e.preventDefault();
        a.popup.classList.remove('open');
    });
}


//Form buttons
document.querySelector('#subscribe-form-submit').addEventListener("click",async (e) => {
    e.preventDefault();
    let ue = document.querySelector("#subscribe-email").value;
    hideElem("#sfe");
    
    if(ue == ""){
     showElem("#sfe");
    }
    else{
        localStorage.setItem("ue",ue);
        console.log(`Email: ${localStorage.getItem("ue")}. Submitting form..`);
        showElem("#subscribe-loading");

        let fd = {
            "__form_id": "914da260f9b6543487067473b43d6b03",
            "email": ue,
            "__email": ue,
            "ue": ue,
            "@account": "f7af012b9a5822ff",
            "@subscription_status": "SUBSCRIBED",
            "properties.sign_up_source": "Subscription Form"
        };

        let rr = await submitForm("https://api.ometria.com/forms/signup/ajax",fd);
        
        if(rr.ok){
           hideElem(['#subscribe-popup', '#sms-popup']);
           showElem(['#birthday-popup']);
       }
       else{
           alert("An error occured, please check the logs for details");
           console.log("Errors: ",rr.errors)
       }

    }
});

document.querySelector('#birthday-form-submit').addEventListener("click",async (e) => {
    e.preventDefault();
    let ue = localStorage.getItem("ue"), dob = document.querySelector("#birthday-dob").value;
    hideElem("#bde");
    
    if(ue == "" || dob == ""){
     showElem("#bde");
    }
    else{
        console.log(`DOB: ${dob}. Submitting form..`);
        showElem('#birthday-loading');

        let fd = {
            "__form_id": "e451ea9cc5bedc9ac5d5f8e80b51fcc5",
            "email": ue,
            "__email": ue,
            "ue": ue,
            "date_of_birth": dob,
            "@account": "f7af012b9a5822ff",
            "@subscription_status": "SUBSCRIBED",
            "properties.sign_up_source": "Birthday Form"
        };
        
        let rr = await submitForm("https://api.ometria.com/forms/signup/ajax",fd);
        
        if(rr.ok){
           hideElem(['#subscribe-popup', '#birthday-popup']);
           showElem(['#sms-popup']);
       }
       else{
           alert("An error occured, please check the logs for details");
           console.log("Errors: ",rr.errors)
       }

    }
});


document.querySelector('#sms-form-submit').addEventListener("click",async (e) => {
    e.preventDefault();
    let ue = localStorage.getItem("ue"), phone = document.querySelector("#sms-phone").value;
    hideElem("#tce");
    
    if(ue == "" || phone == ""){
     showElem("#tce");
    }
    else{
        console.log(`Phone number: ${phone}. Submitting form..`);
        showElem('#sms-loading');

        let fd = {
            "__form_id": "fc1b7571419c68be1aa983757e981218",
            "email": ue,
            "ue": ue,
            "__email": ue,
            "phone_number": phone,
            "@account": "f7af012b9a5822ff",
            "@subscription_status": "SUBSCRIBED",
            "properties.sign_up_source": "Birthday Form"
        };
        
        let rr = await submitForm("https://api.ometria.com/forms/signup/ajax",fd);
        
        if(rr.ok){
           hideElem(['#subscribe-popup', '#birthday-popup', '#sms-popup']);
           showElem(['#forms-complete-popup']);
       }
       else{
           alert("An error occured, please check the logs for details");
           console.log("Errors: ",rr.errors)
       }

    }
});

document.querySelector('#forms-complete-submit').addEventListener("click",async (e) => {
    e.preventDefault();
    subscribePopup.classList.remove('open');
});

});
