console.log("LOGIN signup");

let loginBtn 		= document.getElementById('loginBtn');
let signinBtn 		= document.getElementById('signinBtn');
let loginModal 		= document.getElementById('loginModal');
let loginClose 		= document.getElementById("loginClose");
let passwordBtn 	= document.getElementById("passwordBtn");
let signupUpBtn 	= document.getElementById("signupUpBtn");
let loginUpBtn 		= document.getElementById("loginUpBtn");
let loginDwnBtn 	= document.getElementById("loginDwnBtn");

$(function(){
  	let code = $('#submitCode').val();
	if(code !== "false" && code !== undefined){
		loginModal.style.display = "block";
		$('#signupSection').css('display','block');	
		$('#loginSection, #forgotSection').css('display','none');
		$('#signupCode').val(code);
		$('#submitCode').remove();
	};
});

loginBtn.onclick = function (){
	loginModal.style.display = "block";
	$('#loginSection').css('display','block');	
	$('#signupSection, #forgotSection').css('display','none');	
};

signinBtn.onclick = function (){
	loginModal.style.display = "block";
	$('#signupSection').css('display','block');	
	$('#loginSection, #forgotSection').css('display','none');
};

loginClose.onclick = function (){
	loginModal.style.display = "none";
};

passwordBtn.onclick  = function (){
	hideUp('#loginSection');
	showUp('#forgotSection');
}

loginUpBtn.onclick  = function (){
	hideDown('#forgotSection');
	showDown('#loginSection');
}

signupUpBtn.onclick  = function (){
	hideDown('#loginSection');
	showDown('#signupSection');
}

loginDwnBtn.onclick  = function (){
	hideUp('#signupSection');
	showUp('#loginSection');
}

const hideUp = (div) => {
	$(div).slideUp(500);
}

const hideDown = (div) => { 
	console.log(div);
    let height = $(div).height();    
    $(div).css({
        overflow: "hidden",
        marginTop: 0,
        height: height
    }).animate({
        marginTop: height,
        height: 0
    }, 500, function () {
        $(this).css({
            display: "none",
            overflow: "",
            height: "",
            marginTop: ""
        });
    });
}

const showUp = (div) => {
	div = $( div + ":not(:visible)");    
    let height = div.css({
        display: "block"
    }).height();    
    div.css({
        overflow: "hidden",
        marginTop: height,
        height: 0
    }).animate({
        marginTop: 0,
        height: height
    }, 500, function () {
        $(this).css({
            display: "",
            overflow: "",
            height: "",
            marginTop: ""
        });
    });
}

const showDown = (div) => {
	$(div).slideDown(500);
}
