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
    debugBtn = document.querySelector('#debug-btn'), debugPopup = document.querySelector('#sms-popup');

 //Copycat forms
  hideElem([
      '#birthday-popup','#sms-popup','#forms-complete-popup',
      '#subscribe-loading','#birthday-loading','#sms-loading']);


let arr = [
    {btn: subscribeBtn, popup: subscribePopup, close: subscribeClose},
];


for(let a of arr){
    a.btn.addEventListener("click",e => {
        e.preventDefault();
        a.popup.classList.add('open');
       });

   /* a.close.addEventListener("click",e => {
        e.preventDefault();
        a.popup.classList.remove('open');
    }); */
}


//Form buttons
document.querySelector('#subscribe-form-submit').addEventListener("click", e => {
    e.preventDefault();
    let ue = document.querySelector("#subscribe-email").value, phone = document.querySelector("#subscribe-phone").value;
    let phoneValidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, phoneValidationTest2 = /^((\+44)|(0)) ?\d{4} ?\d{6}$/, emailValidation = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    hideElem(["#sfe","#sfp"]);
    let emailValidationTest = emailValidation.test(ue), phoneValidationTest = phoneValidation2.test(phone);
    let debug = {
        ue: ue,
        phone: phone,
        phoneValidation: phoneValidationTest2,
        emailValidation: emailValidationTest
    };
    console.log("debug: ",debug);

    let sfe = document.querySelector('#sfe'), sfp = document.querySelector('#sfp');
    
    if((ue == "" || !emailValidationTest) || (phone == "" || !phoneValidationTest)){
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
    if(phone == "" || !phoneValidationTest2){
        if(phone == ""){
            sfp.innerHTML = "Please fill in your phone number";
            showElem("#sfp");
         } 
         if(!phoneValidationTest2){
            sfp.innerHTML = "A valid UK phone number is required";
            showElem("#sfp");
         } 
    }
  }
    else{
          document.querySelector('#ometria-tc-subscribe-form').submit();
        
    }
});



});
