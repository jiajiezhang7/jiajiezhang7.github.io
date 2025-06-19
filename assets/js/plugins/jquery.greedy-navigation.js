/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');

var breaks = [];

function updateNav() {
  // Check if we're on a larger screen (desktop)
  if ($(window).width() >= 768) {
    // On larger screens, completely disable greedy navigation
    // Move all hidden items back to visible
    $hlinks.children().appendTo($vlinks);
    
    // Force hide the button and dropdown
    $btn.addClass('hidden').hide();
    $hlinks.addClass('hidden').hide();
    
    // Clear breaks array
    breaks = [];
    
    // Force all visible items to display
    $vlinks.children().show();
    
    // Disable further execution
    return;
  }

  var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

  // The visible list is overflowing the nav
  if($vlinks.width() > availableSpace) {

    // Record the width of the list
    breaks.push($vlinks.width());

    // Move item to the hidden list
    $vlinks.children('*:not(.masthead__menu-item--lg)').last().prependTo($hlinks);

    // Show the dropdown btn
    if($btn.hasClass('hidden')) {
      $btn.removeClass('hidden');
    }

  // The visible list is not overflowing
  } else {

    // There is space for another item in the nav
    if(availableSpace > breaks[breaks.length-1]) {

      // Move the item to the visible list
      $hlinks.children().first().appendTo($vlinks);
      breaks.pop();
    }

    // Hide the dropdown btn if hidden list is empty
    if(breaks.length < 1) {
      $btn.addClass('hidden');
      $hlinks.addClass('hidden');
    }
  }

  // Keep counter updated
  $btn.attr("count", breaks.length);

  // Recur if the visible list is still overflowing the nav
  if($vlinks.width() > availableSpace) {
    updateNav();
  }

}

// Window listeners
$(window).resize(function() {
  updateNav();
});

$btn.on('click', function() {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
});

// Initialize on document ready
$(document).ready(function() {
  // Only run on smaller screens
  if ($(window).width() < 768) {
    // Delay execution to ensure CSS is loaded
    setTimeout(function() {
      updateNav();
    }, 100);
  }
});

// Only run updateNav on smaller screens
if ($(window).width() < 768) {
  updateNav();
}