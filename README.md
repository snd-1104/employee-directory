- This application is an employee directory where one can see the employees list, search for an employee, and filter employees by department or title.
- Also, it has forms for creating, updating or deleting an employee.
- There is also a view details page for each employee.


- To run the application: 
  - Download the files, then in the terminal, run the command (npm install) to install the npm directory
  - In another terminal, run the command (npx json-server --watch data/db.json --port 8000) to be able to access the db file.
  - In the first terminal, run the command (npm start)
  
  
- The file (data > db.json) is created using the API tool from https://www.mockaroo.com/ with customized fields
- I used jSon server as a local database server, and used the command: npx json-server --watch data/db.json --port 8000 to add watch to modifications on the data file
- For client-side routing, I used react-router-dom v6
- I had to use an abort controller to cleanup and avoid having an error when data is not yet loaded into the DOM at the time another component is called 
- To get the ID of the selected blog in View and Edit, I used a hook
- I used the useHistory to navigate through the browser's history
- I added a notFound page to be displayed whenever we don't match the URL with the listed routes
