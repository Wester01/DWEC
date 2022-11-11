document.addEventListener("DOMContentLoaded",()=>{
	//const form = document.forms.register;
	//console.log(form.name);
	document.forms.register.addEventListener('submit',(ev)=>{

		ev.preventDefault();

		validarFormulario();

	});
	document.forms.login.addEventListener('submit',(e)=>{
		e.preventDefault();
		validMail(document.getElementById("correo_login").value);
		validPass2();
	});
});

function validarFormulario(){
	const correo = document.getElementById("correo").value,
			  nombre = document.getElementById("nombre"),
			  apellido = document.getElementById("apellido");


		validText(nombre, apellido);

		var pTest = validPass();
		
		if(pTest > 0){
			document.getElementById("err_pass").style.display = "none";
		}
		validMail(correo);

		const sexo = document.getElementById("sexo");
		if(sexo.value === "sample"){
			const label = document.getElementById("label_s");
			label.style = "border: 1.5px solid red";
		}
		const nacimiento = document.getElementById("nacimiento");

		if(nacimiento.value){
			
			var hoy = new Date;
			var fecha_nac = new Date(nacimiento.value);
			if(hoy - fecha_nac < 0){
				const fnac = document.getElementById("fnac");
				fnac.style = "border: 1px solid red;";
			}
		}

		const direccion = document.getElementById("direccion");
		if(!document.getElementById("dir_in").value){ direccion.style = "border: 1px solid red;" }

		const pais = document.getElementById("pais");
		if(!document.getElementById("pais_in").value){ pais.style = "border: 1px solid red;" }


		//regex de visa y master card
		// /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/  //Visa
		// /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/  //Mastercard

		const tarjeta = document.getElementById("tarjeta");
		if(!document.getElementById("pais_in").value){
		 tarjeta.style = "border: 1px solid red;" 
		}else {
			var regVisa = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
			var regMasterCard = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/ ;
			var tarjeta_input = document.getElementById("tar_in").value;

			if(!regVisa.test(tarjeta_input)){
				if(!regMasterCard.test(tarjeta_input)){
					var cardFail = document.getElementById("card_fail");
					cardFail.innerHTML = "Inserte un número de tarjeta válido.";
					cardFail.style = "display: flex; border: 1px solid red;";
				}
			}
		}

		const notificaciones = document.getElementById("notificaciones");
		if(!document.getElementById("notif_check").cheked){ notificaciones.style = "border: 1px solid red;" }

		const suscripcion = document.getElementById("suscripcion");
		if(!document.getElementById("sus_check").checked){ suscripcion.style = "border: 1px solid red;" }



}

function validMail(correo){
		var exMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		
		var fail_1 = document.querySelector("#correoMal");
		if(correo === ""){
			fail_1.innerHTML = "Este campo es obligatorio.";
			fail_1.style = "display: flex; color: red;";
			document.getElementById("correo").focus();

		}else if(!exMail.test(correo)){
			fail_1.innerHTML = "El correo debe seguir el siguiente formato: nombre@dominio.com";
			fail_1.style = "display: flex; color: red;";
			document.getElementById("correo").focus();
		}else{
			return true;
		}
}

function validPass(){
	
	var passTester = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,21}$/,
		form = document.forms.register;

	//los campos pass y con_pass deben ser iguales
	var res = form.pass.value === form.con_pass.value ? 1 : 0;
	
	var pass_exam = passTester.test(form.pass.value) ? 1 : 0;
	
	if(res>0){
		if(pass_exam !== 1){
			err_pass.innerHTML = "La contraseña debe contener mínimo 8 caracteres, una letra minúscula, una mayúscula, un número y un símbolo.";
			err_pass.style = "display: flex; color: red;";
			err_pass.focus();
		}
	}else{
			err_pass.innerHTML = "Las contraseñas deben coincidir";
			err_pass.style = "display: flex; color: red;";
			err_pass.focus();
		}
	return res + pass_exam ? 2 : 0;
}

function validPass2(){
	
	var passTester = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,21}$/,
		form = document.forms.login;

	//los campos pass y con_pass deben ser iguales
	var res = form.pass.value === form.con_pass.value ? 1 : 0;
	
	var pass_exam = passTester.test(form.pass.value) ? 1 : 0;
	
	if(res>0){
		if(pass_exam !== 1){
			err_pass.innerHTML = "La contraseña debe contener mínimo 8 caracteres, una letra minúscula, una mayúscula, un número y un símbolo.";
			err_pass.style = "display: flex; color: red;";
			err_pass.focus();
		}
	}else{
			err_pass.innerHTML = "Las contraseñas deben coincidir";
			err_pass.style = "display: flex; color: red;";
			err_pass.focus();
		}
	return res + pass_exam ? 2 : 0;
}

function validText(nombre, apellido){
	var validTextReg = /^(?=.{1,40}$)[a-zA-ZáéíóúüñÁÉÍÓÚÑ]+(?:[\s][a-zA-ZáéíóúüñÁÉÍÓÚÑ]+)*$/;
	var res = 0;
	var err_pass = document.getElementById("err_pass");
	var no_name = document.getElementById("no_name"),
		no_ape = document.getElementById("no_ape");

	if(nombre.value === "" | !validTextReg.test(nombre.value)){
		no_name.innerHTML = "Debe introducir un nombre válido.";
		no_name.style = "display: flex; color: red;";
		no_name.focus();
	}else{

		no_name.style.display = "none";

	}
	if(apellido.value === "" | !validTextReg.test(apellido.value)){
		no_ape.innerHTML = "Debe introducir un apellido válido.";
		no_ape.style = "display: flex; color: red;";
		no_ape.focus();	
	}else{
		no_ape.style.display = "none";
		
	}
	return res;
}

