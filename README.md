# ICP Portfolio

A portfolio manager dapp built on the internet computer blockchain

![](./src/assets/Screenshot%20from%202024-02-13%2012-28-50.png)

## Background:

Assets( tokens and nfts ) on the Internet computer are held by Principal ids. There are various ways on how you can get and manage a principal id. one of which is the Internet Identity. However, with the current configurations of the Internet Idntity, a new principal id is generated very time you log into a new application even when using the same anchor. As the number of the applications being logged into increases, it becomes a little bit difficult to track all the different identities for each of the applications later on th assets in those principal ids.

With our application, we provide an easier way to track and manage the different principal ids from differeent applications as well as the assets from all the principal ids.

When you log into a new application, all you have to do is to register the new principal id with our application, and we will track all the assets that are held by that principal id. With this, you can keep track of which assets are held by which id.

We also provide a way to get notified whenever there is an activity such as token transfer on any of your principal id(account).
With this application, we hope to revolutionalize how accounts and assets are managed on the internet computer.

### How the application works.

- User selects one of the available methods to login.

![](./src/assets/Screenshot%20from%202024-02-13%2011-36-28.png)

- User is dircted to the dashboard where all the tokens held by their principal id

![](./src/assets/Screenshot%20from%202024-02-13%2011-30-56.png)

- Click on any of the tokens to see more information about the token and the how much each of your individual id holds in that token

![](./src/assets/Screenshot%20from%202024-02-13%2013-15-48.png)

To add a new principal id, navigate to the profile page. You can also set the email address to receive notifications on wherenever there is an activity on any of your registered accounts(principal ids)

![](./src/assets/Screenshot%20from%202024-02-13%2011-37-14.png)

Click on the `Send` button on the left sidebar to send tokens held by your principal id

![](./src/assets/Screenshot%20from%202024-02-13%2011-31-24.png)

To recieve tokens, click on the `Receive` button on the sidebar to scan the qr code or copy the relevant address

![](./src/assets/Screenshot%20from%202024-02-13%2011-31-40.png)

### Upcoming features.

- Automated swapping and the Dollar Cost Average(DCA) features.

- Adding support for NFTS, users should be able to see all the nfts held by their different accounts.
- We are experimenting with an NFT launch pad for the bitfinity network, that will be available once it is completed.

### How to run the project locally

- Clone the github repo

```

```

- Install the dependecies

```
npm install
```

- run the deploycanisters.sh file inside the scripts folder to deploy the canisters

```
./scripts/deploycanisters.sh
```

- start the server

```
npm start
```

Project should be accessible on the localhost:3000

### Licence
