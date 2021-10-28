////////////// Start ///////////////

1) Clone files to your local environment.
2) Open terminal and go to client folder.
3) Install node_modules  :  npm intall
4) Start app : npm start

/////////////// ISSUES ///////////////

* Holidays for each country is shown for 2020 year.
* Not all selected languages will translate holiday names, because holidays API doesn't provide available language list.
* Coutries API have some issues, for example North Macedonia crashes, when you try to open.

//////////// Asignment /////////////
### Problem

I often travel and want to have quick access to the list of holidays from different countries. Ideally, I would like to be able to select a country from the list and be shown a calendar with all holidays for that country. It would be great to be able to have a choice to only display official (public) holidays, as businesses often won't work during those days. One neat feature would be to be able to select a language, in which holiday names are displayed so I can ask the locals about them.


### Solution

Using attached resources and other resources found online create a React application with two pages:

- Country List Page (Main/Home Page) - with a list of countries

- Country Holidays Page - shows all holidays for a selected country in a calendar widget


For countries page:

- Show search input that allows to filter displayed countries by name

- For each country show: a flag, full name and alpha-3 code

- Clicking on the country should redirect to the holidays page


For holidays page:

- Show country name with a flag

- Show all holidays in a calendar widget

- Display public and non-public holidays with different colors

- Show checkbox for showing only public holidays in the calendar

- (nice-to-have **) Display holiday names in currently selected language

- (nice-to-have ***) After clicking a holiday in the calendar show a modal or pop-up (tooltip) showing "Working day" if businesses are open on that day or date for the first working day after that holiday.


For entire app:

- (nice-to-have **) Allow for language selection (selector and information about current language should be accessible from all pages)

- (nice-to-have **) Make the application responsive. Should work on mobile resolutions too.

- (nice-to-have ***) Prepare application for lack of server connection (app should still show something if the API is down)

- (nice-to-have ***) Detect default language from the browser

- (nice-to-have ***) User should be able to get to a link (e.g. /holidays/pl) and be redirected to the holidays page for Polish holidays

- (nice-to-have ***) The app should keep data and not send requests, e.g. for countries' data when the user goes back to the main (list) page

- (nice-to-have ***) User selected language should be saved and not lost on page reload


### Resources

- Holidays API (getfestivo.com)

- Countries API (restcountries.com)

