//["freecodecamp", "OgamingSC2", "cretetion", "ESL_SC2", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
$(document).ready(function() {
  ////////////////////////////////////
  ////URLs and ARRAY FOR STREAMERs////
  ////////////////////////////////////
  var sUrl = "https://wind-bow.glitch.me/twitch-api/streams/";
  var cUrl = "https://wind-bow.glitch.me/twitch-api/channels/";
  var streamers = [
    "freecodecamp", //0
    "OgamingSC2", //1
    "cretetion", //2
    "ESL_SC2", //3
    "storbeck", //4
    "habathcx", //5
    "RobotCaleb", //6
    "noobs2ninjas" //7
  ]; //END streamers array

  streamers.forEach(function(currentVal, indexOfCurrentVal) {
    $.ajax({
      //ajax1
      url: sUrl + currentVal,
      type: "GET",
      dataType: "json"
    }) //ajax1
      .done(function(json) {
        //.done1

        if (json.stream == null) {
          //streamer is OFFLINE, use different url

          $.ajax({
            //ajax2
            url: cUrl + currentVal,
            type: "GET",
            dataType: "json"
          }) //ajax2
            .done(function(json2) {
              //.done2
              if (json2.logo == null) {
                //add logo is there is none
                json2.logo =
                  "https://res.cloudinary.com/dtwopb4fp/image/upload/v1499992398/Glitch_474x356_qslj51.png";
              }
              $("#filler").append(
                "<section>" +
                "<div class='streamers-div'>" +
                "<div class='logo-div'>" +
                "<a target='_blank' href=" +
                json2.url +
                ">" +
                "<img src='" +
                json2.logo +
                "' alt='logo' class='logo'>" +
                "</a>" +
                "</div>" + //logo-div
                "<div class='streamer-info-div'>" +
                "<h2>" +
                json2.display_name +
                "</h2>" +
                "<p class='offline'>OFFLINE</p>" +
                "<h3>followers: " +
                json2.followers +
                "</h3>" +
                "<a href='" +
                json2.url +
                "' target='_blank>" +
                "<i class='fa fa-external-link' aria-hidden='true'></i>" +
                "</a>" +
                "</div>" + //streamer-info-div
                "</div>" + //streamers-div
                  "</section>"
              ); //.append
              $(".offline").css("color", "red");
            }); //.done2
        } else {
          //if json.stream==null
          //streamer is ONLINE
          if (json.stream.channel.logo == null) {
            //add logo is there is none
            json.stream.channel.logo =
              "https://res.cloudinary.com/dtwopb4fp/image/upload/v1499992398/Glitch_474x356_qslj51.png";
          }
          $("#filler").append(
            "<section>" +
            "<div class='streamers-div'>" +
            "<div class='logo-div'>" + //LOOK ON THE NEXT LINE
            "<a target='_blank' href=" +
            json.stream.channel.url +
            ">" +
            "<img src='" +
            json.stream.channel.logo +
            "' alt='logo' class='logo'>" +
            "</a>" +
            "</div>" + //logo-div
            "<div class='streamer-info-div'>" +
            "<h2>" +
            json.stream.channel.display_name +
            "</h2>" +
            "<p class='online'>ONLINE</p>" +
            "<h3>followers: " +
            json.stream.channel.followers +
            "</h3>" +
            "<p class='game'>" +
            json.stream.game +
            "</p>" +
            "</div>" + //streamer-info-div
            "</div>" + //streamers-div
              "</section>"
          ); //.append
          $(".online").css("color", "green");
        } //else
      }); //.done1
  }); //.forEach

  ///////////////////////
  ////////BUTTONS////////
  ///////////////////////

  $("#online").on("click", function() {
    $(".offline")
      .parent()
      .parent()
      .hide();
    $(".online")
      .parent()
      .parent()
      .show();
  }); //online button

  $("#offline").on("click", function() {
    $(".online")
      .parent()
      .parent()
      .hide();
   $(".offline")
      .parent()
      .parent()
      .show();
  }); //offline button

  $("#all").on("click", function() {
    $(".online")
      .parent()
      .parent()
      .show();
    $(".offline")
      .parent()
      .parent()
      .show();
  });
}); //document ready
//IMPORTANT LINKS: https://wind-bow.glitch.me/, https://dev.twitch.tv/docs/v5/reference/streams/#get-stream-by-user
