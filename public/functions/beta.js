console.log("Function File Connected");

const weatherForm = document.querySelector('form');
const loc = document.querySelector('input');
const p1 = document.querySelector('#one');
const p2 = document.querySelector('#two');

weatherForm.addEventListener('submit', (e) =>{
	e.preventDefault();
	$.ajax({
		url : "/weather?loc=" + loc.value,    
		processData: true,
		type : "GET",
		contentType : "application/json"
	}).done( function(result){
		console.log(result);
		loc.value = "";
		p1.textContent = "";
		p2.textContent = "";
		if (!result.error){
			p1.textContent = result.dispTxt;
			p2.textContent = 'The temperature is currently ' + result.temp + ' degrees c, the weather is currently ' + result.summary + ' with a ' + result.rain + '% chance of rain';
		} else {
			p1.textContent = result.error;
		}
	})
	.fail(function(err){
		
	}).catch(e => {
    console.log(e);
});
})
