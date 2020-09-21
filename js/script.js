// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà
// a dicembre 2018 (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.


$(document).ready(function() {
  var dataInizio = moment("2018-01-01");
  chiamataAjax(dataInizio);

  $(".prev").click(function() {
    if (dataInizio.format("M") == 01) {
      alert("Anno corrente terminato");
    } else {
      $(".day").remove();
      dataInizio = dataInizio.subtract(1, "M");
      chiamataAjax(dataInizio);
    }
  });

  $(".next").click(function() {
    if (dataInizio.format("M") == 12) {
      alert("Anno corrente terminato");
    } else {
      $(".day").remove();
      dataInizio = dataInizio.add(1, "M");
      chiamataAjax(dataInizio);
    }
  });
});

// FUNCTION

function printCalendar(dataInizio, giorniMese, holiday) {
  $("h1").text(dataInizio.format("MMMM YYYY"));
  $("h1").attr("data-mese", dataInizio.format("MM"));
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 1; i <= giorniMese; i++) {
    var giorno = i;
    if (giorno <= 9) {
      giorno = "0" + giorno;
    }
    var data = moment(dataInizio).format("YYYY") + "-" + moment(dataInizio).format("MM") + "-" + giorno;
    var context = {
      "giorno" : giorno,
      "mese" : moment(dataInizio).format("MMMM"),
      "data" : data
    };
    var html = template(context);
    $("#calendario").append(html);
  }
  for (var i = 0; i < holiday.length; i++) {
    var festivitaData = holiday[i].date;
    var festivitaNome = holiday[i].name;
    $(".day[data-data=" + festivitaData + "]").addClass("holiday");
    $(".day[data-data=" + festivitaData + "] .holidayStyle").text(festivitaNome);
  }
  $("span").each(function() {
    if ($(this).text() == "") {
      $(this).remove();
    };
  });

}

function chiamataAjax(dataInizio) {
  var giorniMese = moment(dataInizio).daysInMonth();
  var month = dataInizio.format("M") - 1;
  $.ajax(
    {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year": 2018,
        "month": month
      },
      "method": "GET",
      "success": function (data, stato) {
        printCalendar(dataInizio, giorniMese, data.response);
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
}
