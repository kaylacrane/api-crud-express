# RESTful API made using ExpressJS

Contact list api that allows the following actions:

- Add one contact (POST with contact details in body)
- Get one contact (GET with contact id in url parameters)
- Get all contacts in list (GET via contact in url parameters)
- Modify one contact (PUT with contact id in url parameters)
- Delete one contact (DELETE with contact id in url parameters)
- Delete one contact (DELETE with contact id in body)
- Delete all contacts in list (DELETE with "clear" in url parameters)

## Details

- Contact details are validated using Express-Validator
- MongoDB is used to save contact data
- Screenshot of each method tested by Postman
