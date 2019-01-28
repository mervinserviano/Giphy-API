$(document).ready(function() {

    var monsters = ["Dracula", "Frankenstein", "Mummy", "Swamp Thing", "Werewolf", 
                    "Bigfoot", "Godzilla", "Zombie", "Succubus", "King Kong", 
                    "Minotaur", "Medusa", "Cyclops", "Centaur", "Gargoyle",
                    "Ghost", "Headless Horseman", "Demon", "Wendigo", "Yeti"
                    ];


 // function to make buttons and add + to page
 function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".monster-button", function() {
    $("#monsters").empty();
    $(".monster-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=Ow3AeGmYMB2pMI6i5PYFJuAl8klKbzJq&limit=10";
    // Ow3AeGmYMB2pMI6i5PYFJuAl8klKbzJq

    


    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var monsterDiv = $("<div class=\"monster-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var monsterImage = $("<img>");
          monsterImage.attr("src", still);
          monsterImage.attr("data-still", still);
          monsterImage.attr("data-animate", animated);
          monsterImage.attr("data-state", "still");
          monsterImage.addClass("monster-image");

          monsterDiv.append(p);
          monsterDiv.append(monsterImage);

          $("#monsters").append(monsterDiv);
        }
      });
  });

  $(document).on("click", ".monster-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-monster").on("click", function(event) {
    event.preventDefault();
    var newMonster = $("input").eq(0).val();

        // if (topics.includes(newMonster)) {
        // $("#add-monster").val("");
        // alert('Monster already exists, choose a new one!')}

        if (newMonster.length > 2) {
            monsters.push(newMonster);
          }
    
    populateButtons(monsters, "monster-button", "#monster-buttons");

  });

  populateButtons(monsters, "monster-button", "#monster-buttons");
});
