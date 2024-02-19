# Northcoders News API: Lewis Brown edition

Hello!

Heres some instructions for you to get started.

Not included in the repository are TWO .env files, which will be required in order for any of this backend to run with reference to the correct database. SO, follow the instructions below to get things online. (While its probably a safe assumption to make that you'll know what your doing with regards to code if your here, i'll still run through baby step by baby step, if only for my own personal sense of satisfaction.) 

INSTRUCTIONS TO FOLLOW

1. Go to your terminal (ctrl + J)
2. Create two files, one called .env.test, and another called .env.development. ("touch .env.test" + ENTER , "touch .env.development" + ENTER)
3. within these files, add the line PGDATABASE= , then the name of the PSQL database you will want to refer to.
    - .env.test will want to refer to your test database - a dummy dataset that will be used anytime you want to run your jest testing suite - this database should be called something similar to my_database_test
    - .ev.development will refer to a more complete dataset that will be used when you run your seed file outside of the testing framework - which should give you a more realistic representation of how this backend will run when live. Will probably look like your test database, without the word test - e.g. my_database
4. With that done, you should be good to go. Have fun!
