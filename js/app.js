//In the Job role section reveal a text field when the other section is selected from
//the job role drop down menu
var addInputField = function(location, value){
  //Add a text input field
    //Use the id of the "other-title" for the field
    //Add a placeholder text of "Your Title" for the field
    var $input_field =  $('<input>').attr({id:"other-title", type:"text", placeholder:"Specify Job Role"});
    if (value === "other"){
      location.after($input_field);
      $('#other-title').focus();
    }
    else{
      $("#other-title").remove();
    }
}

//Bind the change and click function to the
$('#title').bind("change click", function(){
  var jobRole = $(this);
  var value = jobRole[0].value;
  addInputField(jobRole, value);
});

var hideColor = function(length){
  var i;
  for(i = 0 ; i < length ; i++){
    //Hide all colors
    $('#color option:eq('+ i +')').prop('disabled', true);
  }

  // $('#color option').each(function(){
  //   $('#color option').each(function(){
  //     if($(this).is(":disabled")){
  //        $(this).detach();
  //     }
  //     else{
  //       $(this).appendTo($('#color'));
  //     }
  //   });
  // })

}

var showColor = function(min, max){
  var i;
  $('#colors-js-puns').css("display","block");
  //Set the option val to the min option
  $("#color").val($('#color option:eq('+min+')').val());
  for(i = min ; i < max ; i++){
    //Show only the color related to the option selected
    $('#color option:eq('+i+')').prop('disabled', false);
  }
}



//Hide the color label and the select menu until the user selects a Design Theme
$('#design').on("change keyup", function(){
  var optionValue = this.value;
  var colorOptions = $('#color option');
  //Store the length all available colors
  var length = colorOptions.length;

  switch(optionValue){
    case "Select Theme":
         $('#colors-js-puns').css("display","none");
         break;
    case "js puns":
          //If the user selects Theme-JS Puns then the color menu should only display
          //"Corn flower Blue", "Dark Slate Grey" and "Gold". first 3 colors.
          min = 0;
          max = 3;
          hideColor(length);
          showColor(min, max);
          break;
    case "heart js":
          //If the user select "Theme - 1  JS" then the color menu should only display "Tomato",
          //"Steel Blue" and "Dim Grey last 3 colors"
          var min = 3;
          var max = colorOptions.length;
          hideColor(length);
          showColor(min, max);
         break;
    default:
         $('#colors-js-puns').css("display","none");
    }
});


var disable = function(labels, array, checkbox){
  //Get the total labels for all events
  console.log(labels);
  for(i = 0; i < array.length; i++){
    if(array[i] != checkbox){
      labels[array[i]].className = "disabled";
      labels[array[i]].children[0].disabled = true;
    }
  }
}


var eventInformation = function(location){
  //Store the Event Day and Time
   var daysAndTime = [];
   for (var i = 0; i < location.length;  i++){
     var eventData = location[i].textContent.split(/[\s,$]+/);
     var event_day = eventData[eventData.length - 3];
     var event_time = eventData[eventData.length - 2];
     daysAndTime.push(event_day + ' ' + event_time);
   }
   return daysAndTime;
}

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}


/*Register for Activities section of the form.
Some events are at the same time as others.
If the user selects a workshop, don't allow selection of a workshop at the same date and time
-- you should disable the checkbox and visually indicate that the workshop in the competing time slot
isn't available.
When a user unchecks an activity, make sure that competing activities (if there are any)
are no longer disabled.*/
//When the user chooses any of the activities calculate the total
var events = $('.activities label');
events.each(function() {

  var $sibling = $(this).find('input[type="checkbox"]')
  var allEvents = eventInformation(events);
  $sibling.change(function(){
      //Store the final price of the selected Activities
      var price = 0;
      var location = $sibling.parent();
      //Check if the checkbox is checked
       $.each(events, function() {
          $( this ).removeClass("disabled");
          $(this).children()[0].disabled = false;
        });
      if($sibling[0].checked){
          //Get the select Event information
          var selectedEvent =  eventInformation(location);
          //Checkt the index of the checkbox label
          var checkedIndex = events.index(location);
          //Get all occurences of the Event in the allEvents array
          var indexes = getAllIndexes(allEvents, selectedEvent[0]);
          //If they are more than 1
          if(indexes.length > 1){
            //Diabled the second conflicting event
            disable(events, indexes, checkedIndex);
          }
      }
      //Append the Total to the activities fieldset
      var $total = $('<p id="total">Total: $'+ price +'</p>');
      //Check if the element doesn't exist in the DOM before appending
      if(!$('#total').get(0)){
        $('.activities').append($total);
      }
      else{
        //else Update the value
        $('#total')[0].innerText = 'Total: $' + price;
        //Check if the total is 0 remove the paragraph tag
        if(price == 0){
          $('#total').remove();
        }
      }
  })
});


//On change of the payment method
$('#payment').on("change keyup", function(){
  //Get the payment value selected
    var payMethod = this.value;
     $(this).siblings().hide();
    //Check if any of the payment methods where chosen
    switch (payMethod) {
      case "credit card":
           $("#credit-card").show();
        break;
      case "paypal":
          $('#payment').siblings()[3].style.display = "block";
        break;
      case "bitcoin":
         $('#payment').siblings()[4].style.display = "block";
       break;
      default:
          $(this).siblings().hide();
    }
});


$(function(){
  //Set focus to the first Text field on load
  $('#name').focus();
  //Hide the color div onload
  $('#colors-js-puns').css("display","none");
  //Hide all payment methods on load
  $('#payment').siblings().hide();
  $('.selectize-input input[type = "text"]').prop("readonly" ,true);
  $('.selectize-input input[type = "text"]').css("cursor", "pointer");
});






/*


Form validation. Display error messages and don't let the user submit the form
if any of these validation errors exist:
Name field can't be empty
Email field must be a validly formatted e-mail address
(you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
You'll need to use a regular expression to get this requirement.
 See the list of Resources for links to learn about regular expressions.
At least one activity must be checked from the list under "Register for Actitivities."
Payment option must be selected.
If "Credit card" is the selected payment option, make sure the user supplied a credit card number,
 a zip code, and a 3 number CVV value.
Make sure your program is free of syntax errors.

Use jsHint (see Resources links) to check your code for syntax and formatting problems.

Make sure you add code comments to explain how your programming works.

When JavaScript is switched off or unavailable all information required to be filled out should be visible.

For example, the “Your job role” text field should already be available if someone selects “Other”.
 cross browser compatibility.
 Making sure that it looks and functions correctly in multiple (at least three) browsers is an
important part of being a top-notch developer.
Some browser options:
Google Chrome
Mozilla Firefox
Internet Explorer/Edge
Safari
*/

$('#exp-month').selectize();
$('#exp-year').selectize();

// var $select  = $('#exp-month').selectize({
//      onMouseOver: function(event) {
//        //console.log(event.target.text());
//         var input = 'selectize-input input:eq(0)',
//               wrapper = 'selectize-input:eq(0)';
//         $('.' + input).attr('readonly', true);
//         $('.' + input + ', .' + wrapper).css('cursor', 'pointer');
//      },
//      dropdownParent: null,
//      maxItems: 1,
//      valueField: 'id',
//      labelField: 'title',
//      onDropdownOpen: function () {
//           $(".selectize-dropdown").hide().slideToggle();
//       },
//       onDropdownClose: function () {
//           $(".selectize-dropdown").show().slideToggle();
//       }
// });
