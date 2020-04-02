let fullBoxes = 0;

$(function(){
	$('#entrySec').css('display','none');
});

$('#tfa1,#tfa2,#tfa3,#tfa4,#tfa5,#tfa6').keyup(function(e){
	if($(this).val().length==$(this).attr('maxlength')){
		$(this).parent().next().find('.codeIn').focus();
		++fullBoxes;
	} else if ($(this).val().length == 0){
		$(this).parent().prev().find('.codeIn').focus();
		--fullBoxes;
	}
});

$('#tfa1,#tfa2,#tfa3,#tfa4,#tfa5,#tfa6').on('keyup paste focusout  change',function(e){
	let token = $('#tfa1').val() + $('#tfa2').val() +	$('#tfa3').val() +
				$('#tfa4').val() + $('#tfa5').val() +	$('#tfa6').val();
	if(token.length === 6){
		$('#2faSubBtn').prop('disabled', false);
	} else {
		$('#2faSubBtn').prop('disabled', true);		
	}
});

$("#2faSms, #2faWapp, #2faEmail").on('click', function(e){
	e.preventDefault();
	e.stopPropagation();
	let formData = {
		"method": $(this).val(),
		};
		$.ajax({
		url : "/2fa/send",    
		processData: true,
		data : JSON.stringify(formData),
		type : "POST",
		contentType : "application/json"
	}).done( function(result){
		let text;
		if (Number(result) > 1 ){
			text = "You have " + result + " attempts left";
		} else {
			text = "This is your last attempt, make it good or you'll be locked out of the account";
		}
		$('#codeAttempts').text(text);
		$('#requestSec').slideUp(500);
		let div = $( "#entrySec:not(:visible)");    
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
	})
	.fail(function(err){
			
	});
});

$("#2faSubBtn").on('click', function(e){
	e.preventDefault();
	e.stopPropagation();
	let formData = {
		"token": $('#tfa1').val() +
				$('#tfa2').val() +
				$('#tfa3').val() +
				$('#tfa4').val() +
				$('#tfa5').val() +
				$('#tfa6').val(),
		};
		$.ajax({
		url : "/2fa/checkcode",    
		processData: true,
		data : JSON.stringify(formData),
		type : "POST",
		contentType : "application/json"
	}).done( function(result){
		let status = result.status;
		if (status === "expired"){
			console.log(result.msg);			
		} else if (status === "success"){
			alert(result.msg);
			window.location.replace(result.redirect);
		} else if (status === "deactive"){
			console.log(result.msg);
			window.location.replace(result.redirect);			
		} else if (status === "failure"){
			console.log(result.msg);
			clearFunc();
			if (Number(result) > 1 ){
				text = "You have " + result + " attempts left";
			} else {
				text = "This is your last attempt, make it good or you'll be locked out of the account";
			}
			$('#codeAttempts').text(text).addClass('redB');
		}	
	})
	.fail(function(err){
			
	});
});

$("#2faClearBtn").on('click', function(e){
	clearFunc();
});

const clearFunc = () => {
	$('#tfa1, #tfa2, #tfa3, #tfa4, #tfa5, #tfa6').val("");
	$('#tfa1').focus();
	fullBoxes = 0;
	$('#2faSubBtn').prop('disabled', true);
}



