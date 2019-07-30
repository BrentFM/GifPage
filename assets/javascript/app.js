var cars = [
    "BMW",
    "McLaren",
    "Lamborghini",
    "koenigsegg",
  ];
  
  var button;
  var newcar = "";

  var addbtn = function() {
    $("#buttonArea").empty();
    for (i = 0; i < cars.length; i++) {
      button = $("<button type=" + "button" + ">" + cars[i] + "</button>")
        .addClass("btn btn-primary")
        .attr("data", cars[i]);
      $("#buttonArea").append(button);
    }
  };
  
  $("#buttonArea").on("click", ".btn", function() {
    var car = $(this).attr("data");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=4lpBj46W897zqeRAKy32Er6Z87mIONgC&limit=10";

    // AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var carDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var carImage = $("<img>");

                carImage.attr("src", results[i].images.fixed_height_still.url);
                carImage.attr("data-still", results[i].images.fixed_height_still.url);
                carImage.attr("data-animate", results[i].images.fixed_height.url)
                carImage.attr("data-state", "still")
                carImage.addClass("gif");

                carDiv.append(p);
                carDiv.append(carImage);
                $("#gifBox").prepend(carDiv);

            }
        });
      });

                $("#gifBox").on("click", ".gif", function (event) {
                    event.preventDefault();

                    // gets the current state of the clicked gif 
                    var state = $(this).attr("data-state");

                    // according to the current state gifs toggle between animate and still 
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }


            })

            $(".submit").on("click", function(event) {
                event.preventDefault();
                // sets inputted value to newcar
                newcar = $("#car-input").val();
                // new car is added to the cars array
                cars.push(newcar);
                console.log(cars);
                // call the function that creates the new button
                addbtn();
                $("input:text").text(function(){$(this).val("")});
              });
              addbtn();
              
