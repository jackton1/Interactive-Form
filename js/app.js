var addInputField = function(location, value){
  //In the Job role section reveal a text field when the other section is selected from
  //the job role drop down menu
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

$('#title').bind("change click", function(){
  var jobRole = $(this);
  var value = jobRole[0].value;
  addInputField(jobRole, value);
});


//Set focus to the first Text field on load
$(function(){
  $('#name').focus();
  //Hide the color div onload
  $('#colors-js-puns').css("display","none");
});

var showColor = function(length){
  var i;
  for(i = 0 ; i < length ; i++){
    //Show all the colors
    $('#color option:nth-of-type('+i+')').css("display","block");
  }
}

var hideColor = function(min, max){
  var i;
  $('#color option').value = 
  for(i = min ; i < max ; i++){
    //Show only the color related to the option selected
    $('#color option:nth-of-type('+i+')').css("display","none");
  }
}

//Hide the color label and the select menu until the user selects a color
$('#design').on("change", function(){
  var optionValue = $(this).val();
  var colorOptions = $('#color option');
  var length = colorOptions.length;

  switch(optionValue){
    case "Select Theme":
         $('#colors-js-puns').css("display","none");
         break;
    case "js puns":
          $('#colors-js-puns').css("display","block");
          //If the user selects Theme-JS Puns then the color menu should only display
          //"Corn flower Blue", "Dark Slate Grey" and "Gold". first 3 colors.
          min = 3;
          max = colorOptions.length;
          showColor(length);
          hideColor(min, max);
          break;
    case "heart js":
          //If the user select "Theme - 1  JS" then the color menu should only display "Tomato",
          //"Steel Blue" and "Dim Grey"
          $('#colors-js-puns').css("display","block");
          var min = 0;
          var max = 4;
          showColor(length);
          hideColor(min, max);
         break;
    default:
         $('#colors-js-puns').css("display","none");
    }
});





/*Register for Activities section of the form.
Some events are at the same time as others.
If the user selects a workshop, don't allow selection of a workshop at the same date and time
 -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
As a user selects activities to register for, a running total is listed below the list of checkboxes.
 For example, if the user selects "Main conference" then Total: $200 should appear.
  If they add 1 workshop the total should change to Total: $300.
Payment Info section of the form. Display payment sections based on chosen payment option
The"Credit Card" payment option should be selected by default and result in the display of the #credit-card div,
and hide the "Paypal" and "Bitcoin information.
When a user selects the "PayPal" payment option, display the Paypal information,
and hide the credit card information and the "Bitcoin" information.
When a user selects the "Bitcoin" payment option, display the Bitcoin information,
and hide the credit card information.
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
You can monitor any errors by looking at the Developer Tools console in your browser.
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
