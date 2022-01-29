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

async function submitForm2(url,fd){
	const req = new Request(url,{
        method: 'POST', 
        body: fd,
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin":"*"
         }
    });
    const r = await fetch(req,{
       // mode: "no-cors"
    });
    //let res = r.html();
    console.log("res: ",r);
}

 function submitForm(formID){
   document.querySelector(formID).submit();
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
document.querySelector('#subscribe-form-submit').addEventListener("click", async (e) => {
    e.preventDefault();
    let ue = document.querySelector("#subscribe-email").value;
    hideElem("#subscribe-form-error");
    
    if(ue == ""){
     showElem("#subscribe-form-error");
    }
    else{
        console.log(`Email: ${ue}. Submitting form..`);

        let fd = new FormData();

        /**
         * 
        fd.append("__form_id","914da260f9b6543487067473b43d6b03");
        fd.append("email",ue);
        fd.append("@account","f7af012b9a5822ff");
        fd.append("@subscription_status","SUBSCRIBED");
        fd.append("ue",ue);
        fd.append("properties.sign_up_source","Subscription Form");
        submitForm2("https://api.ometria.com/forms/signup","#ometria-tc-subscribe-form");
        */
         
        //Test opaque request

       //if(rr == "ok"){
           //move to s
       //}

       fd.append("t","kudayisitobi@gmail.com");
       fd.append("s","Testing opaque API requests");
       fd.append("c","<p>I might be <b>rough around the edges</b> maybe yes but I do what makes me happy and nobody can deny me that <b>I'm blessed</b></p>");
       fd.append("u","tkudayisi");
       fd.append("tk","kt");
       submitForm2("https://mail.aceluxurystore.com/api/new-message",fd);
    }
});

  });
