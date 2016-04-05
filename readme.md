## Knex Libary App

For this application you will be building a small library application. We'll start with one resource "authors" and build onto it.

### Part 1 

A user of your application should be able to see all the authors, create a new author, update an author and delete an author. This should all be done using Knex and with RESTful routing. Use the express router to clean up your routes.

### Part 2

Continue to build off of your library app from the previous lesson and add an additional resource - Books. Every book should have an author and one author can have many books. 

You will need to create an additional migration and ensure you have a column for the author_id of every book in your books table. Continue to keep your routes restful and remember that your books routes should be nested inside of your authors routes.

Additionally, as a user I want to be able to see more information about the author.  For the author's index page, show all of the books each author has written. Also, in the author's show page, show all of the books the author has written as well.

### Part 3

Your users love the app! But they want to be able to assign "categories" to books. Some examples are "non fiction", "historical", "science", but many books can be in many different categories. Add the additional tables necessary for categories. Users should be able to see all categories and add, update and remove categories as well.

Like part 2, make sure that the `/authors` page shows all of the categories for each book and include the author as well.  Authors without books should be visibe on this page.  Also, author's books that do not have categories should also be visible here.

### Part 4 - BONUS

Add search functionality to your application! Users should be able to search for authors, books and categories.
