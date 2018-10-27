var superHero = ["spiderman", "ironman", "antman", "blackpanther"];
// console.log(uniqueAnimals);

console.log(superHero)

// Function for displaying animal data
function renderButtons() {

  superHeroes = unique(heroes) //temp arr to dedup animals arr

// Arrays animals dedup to uniqueAnimals //WORKING
  function unique(heroes) {//Pass in animals arr
      var result = [];//store dedup arr
      $.each(heroes, function(i, e) {//for each animal index, element
          if ($.inArray(e, result) == -1) result.push(e);//if any element returns -1 push to result arr
      });
      return result;
  }

// Delete the animal buttons prior to adding new animal buttons. Necessary to avoid repeat buttons
  $("#superHero-view").empty();

  for (var i = 0; i < superHeroes.length; i++) {// Looping through the array of uniqueAnimals
    var a = $("<button>");// Then dynamicaly generating buttons for each animal in the array
    a.addClass("heroes");// Add a class of heroes
    a.attr("data-name", superHeroes[i]);// Adding a data-attribute with a value of the animal at index i
    a.text(superHeroes[i]);// Providing the button's text with a value of the animal at index i
    $("#superHero-view").append(a);// Adding the button to the HTML
  }// Close for loop

  //Animal button on click query Giphy API
  $('.hero').click(function() {
              heroData = $(this).data("name")// "name" returns 
              console.log("67 API call name: " + heroData)//WORKING pulling data from .animal "this" button

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroData + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("75: " + JSON.stringify(response.data));
      
      $(".gif-view").empty();

      var response = response.data

    for (var i = 0; i < response.length; i++) {//loop through data for needed responses
      var rating = response[i].rating;//rating
      var stillURL = response[i].images.fixed_height_still.url;//image
      var animateURL = response[i].images.fixed_height.url;//Animate
      var content = $("<div class='content'>");
      var ratingP = $("<p>").text("Rating: " + rating);
      var image = $("<img class='image'>").attr({
        "src" : stillURL,
        "data-still" : stillURL,
        "data-animate" : animateURL
      });
      
      content.append(ratingP, image);// add rating and the image to the page
      // rendering the content to the .gif-view
      $(".gif-view").prepend(content);
    }

    $(".image").on("click", function () {
      var state = $(this).attr("data-type");
      if ($(this).attr("data-type") === "animate") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-type", "still");
      } else {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-type", "animate");
          console.log("THERE")

      }
    });

    });
  });
}// Close function renderButton 



// CHECK #animal-input verify not blank // WORKING
  function checkforblank() { //CHECKS #animal-input field if empty change placeholder text, set border red
      if ($('#hero-input').val() == "") {
        $('#hero-input').attr('placeholder','SEARCH HERE');
        document.getElementById('hero-input').style.borderColor = "red";
      return false;
      } else 
        event.preventDefault()
        var heroVal = $('#hero-input').val();
        // console.log("163: " + animalVal)//WORKING
        heroes.push(heroVal)
        renderButtons()
      }

  console.log("131 initial start: renderButtons")
  renderButtons();// Calling the renderButtons function at least once to display the initial list of animals
  