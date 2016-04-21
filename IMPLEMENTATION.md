# Implementation

*This was written as a guide for team members using WebStorm to develop the application.*


## Setup
* Fork the project from the [GitHub repository] (https://github.com/acidr31gn/Student_Appointment_Scheduler).

* Open an empty project in WebStorm.

* Open the **VCS** menu and select **Checkout from Version Control** --> **GitHub**.
* The *Git Repository URL:* field should contain the URL of **your** fork of the project (*not the URL of the original project*). You can find this URL near the top of your project on your GitHub page where it says **HTTPS**.
* *Parent Directory:* is the location on your computer where you will save the project.
* *Directory Name:* is whatever you want to name your local save of the project.
* WebStorm may ask you for your GitHub name and login credentials if you have not entered them already.

* Once you have the project on your computer, read the README file and follow that process. *NOTE: WebStorm will probably ask you to install a plugin to view the file correctly. I recommend you download it so the README renders correctly.*

* After you have gone through the README, if `npm install` ran correctly, you will see a **node_modules** directory in your program.



## Running the Program
* To run the application, open the **Run** menu and select **Run**. The first time you run the application, a pop-up box will appear with the option **Edit Configurations**. Select this option.

* Select the drop down menu for *Node interpreter:* and selection the location of Node.js on your computer. It should be: `/usr/local/bin/node` for Mac, or `C:\Program Files\nodejs` for Windows.

* Change the *JavaScript file:* field to `app.js`.
* Click **Run**.
* Once you have set this up, you can just click **Run** or the *play* button to run the application from now on.


## Viewing the Webpages
* With the application running, open a browser window and go to `localhost:3000`.

* This should render the home page. To navigate to other pages look at the routes defined under `GET Routes` in `app.js` and add them to the end of `localhost:3000`. 

* For example: to go to the advisor page, navigate to `localhost:3000/advisor`


## Personal Test Pages
* I have set up a test HTML page and JavaScript file for each of us. Feel free to use this to test anything you wish, as anything in these modules will not affect the rest of the application.

* To get to your test page on the server, navigate to 
`localhost:3000/test/your initials`. 
For example, my test page is `localhost:3000/test/js`.

* I have set up each of our HTML files with a link to AngularJS. Feel free to remove it or add others.


## Other Notes
* The folders `Counselor_Side` and `Student_Side` are not currently being used. I have moved all the necessary files from those folders to the `views` and `public` folders. They are still there in case we need to reference them for anything.

* Ignore the `node_modules` folder. This contains all your node modules for the app, but you will not need to change any code in these files.

* All the HTML pages are set up in the `views` folder.

* Any JavaScript files needed for the HTML pages are set up in the `public/javascript` folder. You will notice that the script tag that links to these folders in the HTML pages actually says `/assets/javascript/...`. This is due to the line in `app.js` that says 
```
app.use('/assets', express.static(__dirname + '/public'));
```
Anytime you need a JavaScript file in your HTML, use the `/assets/javascript/...` route for your script source.

* The `public/stylesheets` is the same as the JavaScript files, but holds CSS files. Use `/assets/stylesheets/...` for your CSS source.

* The `models` folder holds the schema for the database.

* The `config` folder holds the connection URL and credentials for the database connection.


