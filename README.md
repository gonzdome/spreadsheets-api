# spreadsheets-api
Create spreadsheets passing a JSON payload and download as a zip file.

# POST /spreadsheet/generate
Route Create Spreadsheet:
	Can create both xlsx or csv files. Returns the desired type, you can send both types and receive two sheets files.
	The XLSX file has the multiple sheets functionality, but in this API only one is created with the file name.
	The field fileName is optional, without this param, the name will be random using date to create a unique name.
  When fileName is passed, in order to create new spreadsheets you'll have to change the value.
  At the response body, a URL will be provided to download the file (`http://localhost:3000/spreadsheet/download`), just ctrl+left_click it in POSTMAN.


```
{     
      "fileName": "new-test",
      "types": ["csv", "xlsx"],
      "data": [
        {
            "name": "John",
            "document": "46522115301"
        },
        {
            "name": "Alfred",
            "document": "46522115302"
        },
          {
            "name": "Clarice",
            "document": "46522115302"
        }
    ]
}
```

# GET /spreadsheet/download
Route to Download the Spreadsheets:
  This route will search for the files in `./temp` folder and prepare an array of objects with the following structure: 

```
  const fileObjects = [
  { path: "..." , name: "..." }, 
  { path: "..." , name: "..." }
  ]
```
  Then, the fileObjects are used by the lib `express-zip` to zip and download on navigator the zipped files. 
