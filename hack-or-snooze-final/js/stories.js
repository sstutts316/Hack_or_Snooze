"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when the site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets the list of stories from the server, generates their HTML, and puts them on the page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // Loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// Add new functionality to handle story submission
async function submitStory(evt) {
  console.debug("submitStory", evt);
  evt.preventDefault();

  const title = $("#story-title").val();
  const author = $("#story-author").val();
  const url = $("#story-url").val();

  const newStory = await storyList.addStory(currentUser, {
    title,
    author,
    url,
  });

  // Update the story list with the new story
  const $story = generateStoryMarkup(newStory);
  $allStoriesList.prepend($story);

  $storyForm.trigger("reset");

  // Hide the story submission form
  $storyForm.hide();
}

$storyForm.on("submit", submitStory);

// ... other functions in stories.js ...
