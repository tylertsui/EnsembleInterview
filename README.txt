Summary:

This app reads data from the star wars api and displays it in an organized manner for the user to consume. 
The home page also includes a search bar that filters through existing films to show the most relevant to
the user's query.

Tech Stack:

This app uses React, React-Dom, React-Router, React-Router-Dom, Axios, Parcel and Bootstrap libraries along 
with some Javascript, HTML and CSS. It is hosted through heroku.

Questions:

- Assuming the Star Wars API was slow, what are some optimizations that could be implemented to improve the 
user experience?

Currently, the app takes advantage of useEffect to render most of the page before loading the api data. This 
improves user experience as the user does not need to wait until the api loads before everything is displayed.
As of the current version of the app, it does not cache any of the fetched data. If a data cache could be 
implemented to store some of the api call results, it could save time by simply accessing the recorded data
inside the cache instead of constantly making calls to the api.

- Any improvements you would make to your application?

Introduce a cache to store recent api calls to improve efficiency of app. 
Improve user interface to better display information.

Notes:

While the app performs concurrent api calls (a method to increase speed of a slow api), I have found that, 
if the call volume is high enough, it will cause major issues with the SWAPI. It is for this reason I have
added a link to access a page with all featured characters of a film in lieu of just displaying those characters 
within the FilmDetails page.