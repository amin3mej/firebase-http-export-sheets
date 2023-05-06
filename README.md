# Save Forms to Google Sheets

**Author**: Amin Djawadi (**[https://github.com/amin3mej](https://github.com/amin3mej)**)

**Description**: Easily save the data from landing pages or contact forms directly into a Google Spreadsheet.

**Details**:  Use this extension to quickly create endpoints for your forms and save them in a [Google Spreadsheet](https://www.google.com/sheets/about). This extension will use official [Google APIs](https://developers.google.com/sheets/api/quickstart/nodejs) to save your data in the Google Spreadsheet.

When calling the saveRecord api, this extension:

- Based on the request body, add a new row to the designated spreadsheet
- If necessary, modify the header column to include additional column(s)
 
#### Additional setup

Once you've installed this extension, make sure to grant it permission to write to your spreadsheet. Follow these steps:

1. Find the account name for the installed extension in the [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) section. The name will look something like `ext-{extension-instance-id}@{project-id}.iam.gserviceaccount.com`.
2. Open the spreadsheet file you want to share. You must be the owner or have edit access to the spreadsheet.
3. Click the "Share" button.
4. Enter the extension account name found in step 1 and grant it write permission.
5. Click "Send".

#### Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).
- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s no-cost tier:
- Cloud Functions (Node.js 10+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))

**Configuration Parameters:**

- Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your Storage bucket. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

- Google Spreadsheet ID: This parameter is for the ID of the spreadsheet where the data should be placed. You can extract Spreadsheet ID from its URL. For example, the Spreadsheet ID in the URL https://docs.google.com/spreadsheets/d/abc1234567/edit#gid=0 is "abc1234567".

- Google Spreadsheet Sheet Name: This parameter refers to the name of the sheet within the specified spreadsheet. By default, the sheet is named Sheet1.

- Allowed Fields: By separating names with commas (,), you can indicate a list of allowed names to process. If this field is set, any fields not allowed will be ignored. An asterisk (*) will allow all fields.

- Firebase App Check: [Firebase App check](https://firebase.google.com/docs/app-check) helps protect your API resources from abuse by preventing unauthorized clients from accessing your backend resources. You can enable this parameter to enable App check.

**Cloud Functions:**

- **saveRecord:** Receive your data through a http post request and save that in the Spreadsheet

**APIs Used**:

- sheets.googleapis.com (Reason: Needed to put in the new data)
