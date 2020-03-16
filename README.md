# Cluster CMS

Cluster CMS is a lightweight contact management solution with built-in Gmail integration. 

# Background and Overview

Cluster is designed to be a lightweight alternative to traditional CMS software. Cluster does one thing, and does it well: it gives you a central focal point where you can focus on what matters — engaging with your client. By integrating with Gmail's API, we take the logistical responsibility of organizing your emails off your hands, ensuring that you never lose another important email in the stack! 

# Functionality and MVP

- User authentication using OAuth2
- Contacts CRUD
- Gmail integration
- __BONUS:__ Tasks CRUD for Contacts

# Technologies and Technical Challenges

Cluster will be built using Express and MongoDB for server and database solutions, respectively, and React for the front-end. We will be using Node's runtime to tie it all together. This stack is commonly referred to as MERN. We will also be using Google's Gmail API.

# Group Members and Work Breakdown

- User Auth Backend
  - User Model + Validations
  - Auth Routes
  - Redux flow for Auth
- User Auth Frontend
  - Signup Page
  - Signin Page

- Splash Page (frontend)

- Contacts Backend
  - Contacts Model + Validations
  - Redux flow for contacts

- Contacts Frontend
  - "index" page -- collection of all contacts for user
  - "show" page -- central focal point for the app. collection of emails related to contact

- Gmail Integration
  - backend -- API implementation
  - frontend -- "emails" tab in contact "show" page


# Design Inspo

### Contacts Index Page

![Contacts Index Page](https://i.imgur.com/bten4VE.png "Contacts Index Page")

### Contacts Show Page

![Contacts Show Page](https://i.imgur.com/mXtnUT9.png "Contacts Show Page")

### Contacts Email Pane

![Contacts Email Pane](https://i.imgur.com/q349wel.png "Contacts Email Pane")
