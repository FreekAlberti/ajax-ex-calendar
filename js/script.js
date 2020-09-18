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

  // handlebars1

  var source1 = $("#entry-template1").html();
  var template1 = Handlebars.compile(source1);

  var context1 = {
    "mese" : moment(dataInizio).format("MMMM")
  };

  var html1 = template1(context1);

  $("#headerCalendario").append(html1);

  // handlebars2

  var source2 = $("#entry-template2").html();
  var template2 = Handlebars.compile(source2);

  for (var i = 1; i <= giorniMese; i++) {
    var giorno = i;
    if (giorno <= 9) {
      giorno = "0" + giorno;
    }
    var data = moment(dataInizio).format("YYYY") + "-" + moment(dataInizio).format("MM") + "-" + giorno;
    var context2 = {
      "giorno" : giorno,
      "mese" : moment(dataInizio).format("MMMM"),
      "data" : data
    };

    var html2 = template2(context2);

    $("#calendario").append(html2);
  }

});
