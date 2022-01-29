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

async function submitForm2(url,fd){
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
    console.log("res: ",res);
    return "ok";
}

function handleOmetriaResponse(r){
    console.log("response from ometria: ",r);
}

 function submitForm(formID){
    ometria.ajaxFormSubmit(formID,handleOmetriaResponse);
}

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js 



//Event handlers

document.addEventListener("DOMContentLoaded", function() {
    let subscribeBtn = document.querySelector('#subscribe-btn'), subscribePopup = document.querySelector('#popup-container'), subscribeClose = document.querySelector('#subscribe-close-btn'),
    birthdayBtn = document.querySelector('#birthday-btn'), birthdayPopup = document.querySelector('#birthday-popup'), birthdayClose = document.querySelector('#birthday-close-btn'),
    smsBtn = document.querySelector('#sms-btn'), smsPopup = document.querySelector('#sms-popup'), smsClose = document.querySelector('#sms-close-btn');

  hideElem(['#birthday-popup','#sms-popup']);

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
document.querySelector('#subscribe-form-submit').addEventListener("click", (e) => {
    e.preventDefault();
    let ue = document.querySelector("#subscribe-email").value;
    hideElem("#sfe");
    
    if(ue == ""){
     showElem("#sfe");
    }
    else{
        console.log(`Email: ${ue}. Submitting form..`);

        let fd = {
            "__form_id": "914da260f9b6543487067473b43d6b03",
            "email": ue,
            "__email": ue,
            "@account": "f7af012b9a5822ff",
            "@subscription_status": "SUBSCRIBED",
            "properties.sign_up_source": "Subscription Form"
        };

        submitForm2("https://api.ometria.com/forms/signup/ajax",fd);
        //submitForm("#ometria-tc-subscribe-form");
       /*
       if(rr == "ok"){
           hideElem(['#subscribe-popup', '#sms-popup']);
           showElem(['#birthday-popup']);
       }
       */

    }
});

  });
