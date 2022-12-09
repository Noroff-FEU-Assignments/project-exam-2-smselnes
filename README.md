# Description

Medi@holic - Social Media Platform developed by Ståle Marius Selnes (project exam).

The website can be visited [here](https://smselnes-mediaholic.netlify.app/)

Its built on [Noroff API](https://noroff-api-docs.netlify.app/) + [These Endpoints](https://nf-api.onrender.com/docs/static/index.html).

## Goal

Medi@holic is created for creative minds that wants to share, socialize, interact and inspire/be inspired.

Registered members can create posts with media, content and tags and posts can be commented and reacted on with emojis.

It is also possible to follow and unfollow other members.

Future implementations will come as the API expands further.

## Brief

An existing Social Media company has approached you to create a brand new front end for their application. While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end social media application.

## Technologies

- React 18.2.0
- React-bootstrap
- Sass
- Yup
- Moment
- Axios
- React-icons
- Google fonts
- GitHub
- Postman

## Design application

- Adobe XD (prototype + styleguide)

## Planning

- Trello
- Notion (gantt chart)
- OneNote (for personal notes and logging)

## Hosting

- Netlify

## Setup

- This repository can be cloned or downloaded.
- Navigate to the correct folder in the terminal.
- Run "npm install"
- Run "npm run start".
- The application will open on port 3000, or you will be asked to open on another port if not available.

## Access

Login: username with a valid **stud.noroff.no** or **noroff.no** email

Register: Register a new user with a valid **stud.noroff.no** / **noroff.no** email.
the username cannot use any punctuation except underscore. Password must be minimum 8 characters.

### Test flow

_known issues - there has been a problem with a status code: 429 - too many requests during development. If that happens, take a step or two back and try again._

    - Register a new user or log in if you have one.
    	- Users must end with a stud.noroff.no or noroff.no email.
    - When logged in, you will be redirected to the dashboard page.
    	- go to posts. Scroll down and test "more posts" button.
    - Find a post to explore.
      - Find the comment section and leave a comment.
      - Try to post a reaction.
      - Click on the author of the post, below the heading on the page. This will redirect you to the author's profile page.
    - Try to follow the user.
    - Try to unfollow the user.
    - Try to follow again.
    - Click through the tabs on this profile page and find the "posts" tab.
      - Try to open one of the posts. This redirects you to a post details page.
        - From here, click on Dashboard in the navigation.
    - Go to profiles.
      - Scroll down and find "more profiles" and click it.
      - Scroll further down and find the up arrow. Click it. This redirects you to the top of the page.
      - Find a profile to explore.
        - From here, click My Profile in the navigation.
    - Scroll down to "create new post" and create one.
      - This post should now be available for editing.
      - Try edit the post.
      - After editing, try to delete the post.
      - Try to change banner.
      - Try to change the avatar.
      - Find the following / followers section.
        - Open the dropdown and click on one of the following / followers profiles.
          - From this profile page, click on the logo in navigation, which will take you back to the landingpage.
            - Click logout in the navigation.
            - Are you back to where you started?

Thanks for testing. Feedback and suggestions is highly appreciated.

## Summary

My final exam at Noroff is **Medi@holic**. It has been challenging, yet very interesting to work with. Its been quite a journey over the past 7 weeks. It started off with analyzing the brief well and get into the planning process. I've used Trello actively throughout the weeks to sort tasks and make priorities to my kanban board.

Most of the project has gone well. I've had a few stops where I needed to destructure the code or do some serious debugging to get past the blockers. But I've learnt a lot more in those fields through this project.

As always, the design part is difficult. I did not know the API from before, and I felt a need to get to know it before start developing, so after registering a new user in Postman, I played around to do some fetching just to understand the JSON returned. Then I could go back to the prototype to easier understand the flow of the application. This also gave me a good start on the developing process.

I've done "in-house" user testing with people not connected to the community, and I've done external user-testing with fellow students. As often before, these tests give both expected and unexpected feedback which is valuable.

All in all I'm happy with the result. There's room for improvements here and there, but all the requirements asked for are completed.

### inspiration / helpful / acknowledgements

- Helpful React lessons: [PedroTech youtube](https://www.youtube.com/@PedroTechnologies)
- Helpful fellow students. I have discussed and shared solutions with three great people during this project. All three of them have been great classmates throughout my entire Front-End studies.
  - maikenlindstad
  - Jimbozz
  - KThomiss
