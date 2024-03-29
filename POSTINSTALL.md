### Additional setup

Once you've installed this extension, make sure to grant it permission to write to your spreadsheet. Follow these steps:

1. Find the account name for the installed extension in the [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) section. The name will look something like `ext-{extension-instance-id}@{project-id}.iam.gserviceaccount.com`.
2. Open the spreadsheet file you want to share. You must be the owner or have edit access to the spreadsheet.
3. Click the "Share" button.
4. Enter the extension account name found in step 1 and grant it write permission.
5. Click "Send".

### Using this extension

Using the extension is really easy. Send a request to `https://${LOCATION}-${PROJECT_ID}.cloudfunctions.net/ext-${EXT_INSTANCE_ID}-saveRecord` to see them in your spreadsheet immediately.

#### Parameters

If the ALLOWED_FIELDS parameter is set, only the keys of the body request that match the allowed fields will be saved in the spreadsheet. If all fields are allowed, everything sent in the body request will be saved.

#### Example:

```js
const url = `https://${LOCATION}-${PROJECT_ID}.cloudfunctions.net/ext-${EXT_INSTANCE_ID}-saveRecord`;

const response = await fetch(url, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Firebase-AppCheck': appCheckTokenResponse.token, // Required if App Check is enabled. Learn More: https://firebase.google.com/docs/app-check/web/custom-resource
  },
  body: JSON.stringify({
    name: 'John Due',
    phoneNumber: '+123456789',
    email: 'john@due.com',
    age: 23,
    isCustomer: true,
  }),
});

const json = await response.json();
```
### Monitoring

As a best practice, you can [monitor](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) the activity of your installed extension, including checks on its health, usage, and logs.