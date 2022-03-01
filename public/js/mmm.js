

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
let phoneValidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,5})$/, emailValidation = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;


//Event handlers

document.addEventListener("DOMContentLoaded", function() {
   // debugBtn = document.querySelector('#debug-btn'), debugPopup = document.querySelector('#sms-popup');

let hasFilledForm = localStorage.getItem("copycat_hff");

if(!hasFilledForm){
  setTimeout(() => {
     // arr[0].popup.style.display = "block";
     window.location = "#ometria-modal";
  },6000);
}


//Birthday input color
document.querySelector('#date_of_birth').addEventListener("change", e => {
    e.preventDefault();
   let bdayLength = document.querySelector('#date_of_birth').value.length, color = "#000", background="rgb(232, 240, 254)";

   if(bdayLength == 0){
     color = "#888";
     background = "#222121";
   }

   document.querySelector('#date_of_birth').style.color = color;
   document.querySelector('#date_of_birth').style.background = background;

});

//Form validation
document.querySelector('#phone_number').addEventListener("change", e => {
    e.preventDefault();
  let phone = document.querySelector("#phone_number").value, phoneValidationTest = phoneValidation.test(phone);
   hideElem(["#sfp"]);
   if(phone == "" || !phoneValidationTest){
     
    if(phone == ""){
        sfp.innerHTML = "Please fill in your phone number";
        showElem("#sfp");
     } 
     if(!phoneValidationTest){
        sfp.innerHTML = "A valid phone number is required";
        showElem("#sfp");
     } 
   }
});

document.querySelector('#ue').addEventListener("change", e => {
    e.preventDefault();
    let ue = document.querySelector("#ue").value, emailValidationTest = emailValidation.test(ue)
    hideElem(["#sfe"]);
    if(ue == "" || !emailValidationTest){
        if(ue == ""){
            sfe.innerHTML = "Please fill in your email address";
            showElem("#sfe");
        }
        if(!emailValidationTest){
           sfe.innerHTML = "A valid email address is required";
           showElem("#sfe");
        }
       
       }
});

/*
document.querySelector('#subscribe-form-submit').addEventListener("click", e => {
    e.preventDefault();
    
    hideElem(["#sfe","#sfp"]);
    let , phoneValidationTest = phoneValidation.test(phone);
    let debug = {
        ue: ue,
        phone: phone,
        phoneValidation: phoneValidationTest,
        emailValidation: emailValidationTest
    };
    console.log("debug: ",debug);

    let sfe = document.querySelector('#sfe'), sfp = document.querySelector('#sfp');
    
    if((ue == "" || !emailValidationTest) || (phone == "" || !phoneValidationTest)){
    
    
  }
    else{
          localStorage.setItem("copycat_hff","yes");
          document.querySelector('#ometria-tc-subscribe-form').submit();
        
    }
});
*/


});
