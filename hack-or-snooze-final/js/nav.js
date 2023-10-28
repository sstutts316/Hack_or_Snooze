"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

const $storyForm = $("#story-form");

const $navSubmitButton = $("#nav-submit"); // Replace "#nav-submit" with the actual ID or selector of your button/link

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// Function to show the story submission form
function showStoryForm() {
  $storyForm.show();
}

// Attach this function to an event (e.g., a button click)
$navSubmitButton.on("click", showStoryForm); // Replace $navSubmitButton with your button selector
