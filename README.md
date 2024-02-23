# Northcoders News API - Lewis Brown edition

Hello!

API LINK: https://nc-news-app-0v2z.onrender.com/api

If this looks like a HUGE wall of text, you might want to install some sort of JSON formatter for your web browser - this is the one I use for chrome and it works just fine:

https://chromewebstore.google.com/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en

# PROJECT SUMMARY

This is a web app that allows you to make various different requests to various different sets data. Fun!

The api link at the very top should show you (if its still online when you're reading this) what requests are currently available to the database - make that your startpoint for finding a fun endpoint.

I have my databases hosted on a service called elephantSQL: https://www.elephantsql.com/
I have my API hosted through the Render service: https://render.com/

Both of these services are free so check em out if you're looking to make somthing similar.

# DO IT YOURSELF!

Want to play around with the nitty gritty of what each endpoint does yourself? Spotted a horrendous error that I should be completely and irrefutably ashamed of?

Heres some instructions for you to get started with the project.

# INSTALL INSTRUCTIONS:

Now, since you are here, I am going to assume you know how to clone a repository, not simply just because you are in fact, on gitHub, but because you've somehow found your way onto a student project which truly serves no real world functionality, it only serves to show my prowess as a budding software engineer. I digress. Clone the repo to a folder of your choice, open with VC and you'll almost be ready to kick shit up.

SO...

Not included in the repository are TWO .env files, which will be required in order for any of this backend to run with reference to the correct database. heres what to do:

1. Go to your terminal (ctrl + J)
2. Create two files, one called .env.test, and another called .env.development. ("touch .env.test" + ENTER , "touch .env.development" + ENTER)
3. within these files, add the line PGDATABASE= , then the name of the PSQL database you will want to refer to.
    - .env.test will want to refer to your test database - a dummy dataset that will be used anytime you want to run your jest testing suite - this database should be called something similar to my_database_test
    - .ev.development will refer to a more complete dataset that will be used when you run your seed file outside of the testing framework - which should give you a more realistic representation of how this backend will run when live. Will probably look like your test database, without the word test - e.g. my_database
4. With that done, run the command NPM install to install all of the projects required dependencies and you should (theoretically) be ready to rumble!

# GETTING STARTED

Once you've done everything above, you're almost ready to go! I lied when i said you'd be ready to rumble, sorry. Perhaps you could engage in a minor quiver for the moment, in anticipation of the rumble to come. Anyway.

You'll need to seed your database before getting started making queries, which is as simple as this:

1. run this script: NPM setup-dbs (CTRL + J to open the terminal) 

This will 'drop' (delete) the database tables if you've run this script previously, so if you've ran this before and then played around with the data, running this again will delete your database and recreate them from scratch. Useful to know. If you're just getting setup though, run this once before you do anything, then your golden.

2. run this script: NPM test

This will run ALL the test files within this repository (utils.test.js and app.test.js) using jest - a dependency which should be installed if you ran NPM install like I told you to earlier (I think). If you see a bunch of stuff happen in the terminal, followed by notifications about a load of things passing, you can rest easy knowing you have done everything I've held you hand through, and I can guide you no longer. Go now child, be free.

Running tests via jest in this way will use a test database that is dropped and recreated everytime the tests are ran, so you can see the functionality of each individual endpoint and how they run each time, but the data will not persist. Running endpoint requests outside of this testing framework should use a different set of developmental data which will persist, so be careful with that. However, if your dev data gets too FUBAR, just run NPM setup-dbs again and you'll be set back to default dev data (and are free to mess it up again).

# SQL-QUERY_TESTER

Also included in this repository is a file called 'sql-query-tester', where you'll find a bunch of PSQL commands laziliy left commented out, with a few left standing as a testament to a time gone by. I recommend commenting out everything in this file before you get started (highlight text to comment out, hold CTRL and press /). You can use this file to test PSQL commands before potentially implementing them to an endpoint. Remarkable!

To use this file:

1. After commenting everything out (or wiping the file clean), at the top of the file, enter \c nc_news_test (this may already be there, in which case, leave it (yeah)) - this will connect to the test database when you run the file.*

2. type SELECT * FROM articles; (or whichever sql command you want to test)

3. Run the sql-query-tester with this command: psql -f sql-query-tester > __________.txt in the blank space, enter a suitable name that reflects the query you're testing, and if the query is successful, you should see a new txt file appear in the repo with that name, open it up to see your query results.

* You could also connect to the development database to test commands BUT, I highly recommend using the test database because if you proper mess it up, you can then reset the database much easier by simply running the test script (NPM T), instead of having to setup db again. You do you though, live your truth.

# REQUIREMENTS

You'll need the latest versions of Node.js and Postgres in order for this thing to run properly, at the time of this projects last update. At present (23/02/2024) these are:

Node.js  v21.4.0
Postgres v14.10
