Use this extension to quickly create endpoints for your forms and save them in a [Google Spreadsheet](https://www.google.com/sheets/about). This extension will use official [Google APIs](https://developers.google.com/sheets/api/quickstart/nodejs) to save your data in the Google Spreadsheet.

### Things you will need:

- Firebase [Cloud Functions](https://console.firebase.google.com/project/_/functions) and must be enabled in your project's console. The extension will need these to function properly.

- A Google Spreadsheet file. If you don't have one, you can [Create a new one](https://docs.google.com/spreadsheets/create).

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