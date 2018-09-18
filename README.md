# Word-Of-The-Day-Scraper

Word of the Day using Cheerio, Request and Express.

A simple WOTD application which creates our own API server using Express, Cheerio and Request and retrieves data from WordThink.com (a website that provides a daily work and definition). 

Once we have the data, we create a JSON endpoint to use in our application.

To Install Cheerio, Express and Request use the following commands:

	npm install cheerio
	
	npm install request
	
	npm install express

Run the app.js script use the following command:

	node app.js

In the chrome browser, go to localhost:3000, and you should see the JSON response for the word of the day.

The endpoint in the application is used to display the daily word and definition.
