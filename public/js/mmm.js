function showElem(selector){
    let el = document.querySelector(selector);
    if(el){
        el.style.display = 'block';
    }
}

function hideElem(selector){
    let el = document.querySelector(selector);
    if(el){
        el.style.display = 'none';
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

async function submitForm(url,fd){
	const req = new Request(url,{method: 'POST', body: fd});
    const r = await fetch(req);
    let res = r.json();
    console.log("res: ",res);
}

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js 



//Event handlers

document.addEventListener("DOMContentLoaded", function() {
    let subscribeBtn = document.querySelector('#subscribe-btn'), subscribePopup = document.querySelector('#subscribe-popup'), subscribeClose = document.querySelector('#subscribe-close-btn'),
    birthdayBtn = document.querySelector('#birthday-btn'), birthdayPopup = document.querySelector('#birthday-popup'), birthdayClose = document.querySelector('#birthday-close-btn'),
    smsBtn = document.querySelector('#sms-btn'), smsPopup = document.querySelector('#sms-popup'), smsClose = document.querySelector('#sms-close-btn');

let arr = [
    {btn: subscribeBtn, popup: subscribePopup, close: subscribeClose},
    {btn: birthdayBtn, popup: birthdayPopup, close: birthdayClose},
    {btn: smsBtn, popup: smsPopup, close: smsClose}
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
document.querySelector('#ometria-tc-subscribe-form').addEventListener("submit", e => {
    e.preventDefault();
    let ue = document.querySelector("#subscribe-email").value, uu = "https://api.ometria.com/forms/signup";
    hideElem("#subscribe-form-error");
    
    if(ue == ""){
     showElem("#subscribe-form-error");
    }
    else{
       //Populate the form data
       let fd = new FormData();
       fd.append("__form_id","914da260f9b6543487067473b43d6b03");
       fd.append("email","");
       fd.append("__email","");
       fd.append("@account","f7af012b9a5822ff");
       fd.append("@return_url","");
       fd.append("@subscription_status","SUBSCRIBED");
       fd.append("properties.sign_up_source","Subscription Form");
       fd.append("ue",ue);

       submitForm(uu,fd);
    }
});

  });
