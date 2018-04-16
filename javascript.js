$(document).ready(function()    {

		function pad(number, length) { 
    var str = String(number);
    return (str.length >= length) ? str : ( new Array(length - str.length + 1).join('0') ) + str;
}



	var url = "http://www.whateverorigin.org/get?url=" + encodeURIComponent("https://pastebin.com/raw/yziNg4ch")  + "&callback=?";
	$.getJSON (url, function(response) {

		var parsed = JSON.parse(response.contents);

		console.log(jQuery.type(parsed));
		console.log(parsed);

		var lista = parsed.registrations;
		console.log(lista);
		for (i = 0; i < lista.length; i++) {
			$("<tr></tr>").appendTo("tbody");

			$("<td></td>").appendTo("tr:last").text(lista[i].name);
			$("<td></td>").appendTo("tr:last").text(lista[i].surname);


			if (lista[i].sex === "female") {
				spol = "Ž"
			}
			else {
				spol = "M"
			}

			$("<td></td>").appendTo("tr:last").text(spol);

			
			function pad(number, length) { 
			    var str = String(number);
			    return (str.length >= length) ? str : ( new Array(length - str.length + 1).join('0') ) + str;
			}

		// date formatting
			var datumRodjenja = lista[i].date_of_birth.split(".");
			var formatDatumaRodjenja = datumRodjenja[2] + "-" + pad(datumRodjenja[1], 2) + "-" + pad(datumRodjenja[0], 2)
					
			age(formatDatumaRodjenja);

			var formatiraniRodjendan = pad(datumRodjenja[0], 2) + "." + pad(datumRodjenja[1], 2) + "." + datumRodjenja[2];

			$("<td></td>").appendTo("tr:last").text(dob);
			$("<span></span>").appendTo("td:last").addClass("skriveno").text(formatiraniRodjendan);

			var datumPrijave = lista[i].date_of_registration.split(".");
			var formatiranaPrijava = pad(datumPrijave[0], 2) + "." + pad(datumPrijave[1], 2) + "." + datumPrijave[2];

			$("<td></td>").appendTo("tr:last").text(formatiranaPrijava);
				displayBirthday();
		};

	});

	var newPersons = []; 

	$("#dodaj_novu_osobu").on("submit", function(event) {
 		event.preventDefault();
		ime = $("#ime").val();
		prezime = $("#prezime").val();
		spolUnos = $("#spol").val();

		if (spolUnos === "zenski") {
			spol = "Ž"
		}
		else {
			spol = "M"
		}

		datum_rodjenja = $("#datum_rodjenja").val();
		rodjenje = datum_rodjenja.split('-');
		$datum_rodjenja = rodjenje[2]+'.'+rodjenje[1]+'.'+rodjenje[0]+'.';

		age(datum_rodjenja);
		
		prijava = $("#datum_prijave").val();
		$prijava = prijava.split('-');

		$("<tr></tr>").appendTo("tbody");

		$("<td></td>").appendTo("tr:last").text(ime);
		$("<td></td>").appendTo("tr:last").text(prezime);
		$("<td></td>").appendTo("tr:last").text(spol);
		$("<td></td>").appendTo("tr:last").text(dob);
		$("<span></span>").appendTo("td:last").addClass("skriveno").text($datum_rodjenja);
		$("<td></td>").appendTo("tr:last").text($prijava[2]+'.'+$prijava[1]+'.'+$prijava[0]+'.');

		newPersons.push();

		displayBirthday();
		document.getElementById("dodaj_novu_osobu").reset(); 
	});

	displayBirthday();
	
});

//izvan main funkcije
function age(datum_rodjenja) {
	
	rodjendan = new Date(datum_rodjenja);
	var danas = new Date();
	dob = Math.floor((danas-rodjendan) / (365.25 * 24 * 60 * 60 * 1000));
};

function displayBirthday() {
	$( "tr" ).hover(
	  function() {
	    $( this ).find(".skriveno").show();
	  }, function() {	  	
	    $( this ).find(".skriveno").hide();
	  }
	);
};


