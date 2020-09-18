// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà
// a dicembre 2018 (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.


$(document).ready(function() {

  var dataInizio = "2018-01-01";
  var giorniMese = moment(dataInizio).daysInMonth();

  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      method: "GET",
      success: function (data, stato) {
        console.log(data.response);
      },
      error: function (richiesta, stato, errori) {
      console.log(errori);
      }
    }
  );

  // handlebars
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  for (var i = 1; i <= giorniMese; i++) {
    var context = {
      "giorno" : i,
      "mese" : "Gennaio"
    };

    var html = template(context);

    $("#calendario").append(html);
  }

});
