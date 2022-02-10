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
    hideElem(["#sfe","#sfp"]);
    console.log("[ue, phone]: ",[ue, phone]);

    if(ue == "" || phone == ""){
     if(ue == "") showElem("#sfe");
     if(phone == "") showElem("#sfp");
    }
    else{
        document.querySelector('#ometria-tc-subscribe-form').submit();
    }
});



});
