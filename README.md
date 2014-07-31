Proof of concept for passing a backbone collection from router function to the browser

To run example do:

	npm install
	bower install
	node server


Nice, now that you have it running. What does it do?

#### Step 1

On `/controllers/pipper.js` you request the root of the application, on your router function, there is a Items Collection created, that you pass to the injectCollectionToView function.

#### Step 2

Then on your layout you have

	{{ injectedData|hydrate }}

That adds to your view the collection with all the data that you had on your server.

#### Step 3

## Magic
