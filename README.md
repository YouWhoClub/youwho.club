# youwho
---------
transfer money by minting nfts , explore most active users , interact to be an active user , advertise your nft collections on different blockchains , chat and hangout with colleagues , friends , traders and more ...


## 🛍️ Marketplace Thirdweb Interaction 

> there is a platform fee that must be talked about to charge users with.

in order to have a fully functional NFT markeplace, you should use the thirdweb APIs in front-end side to call the contract methods like mint, buy, sell, offer, auction, bid.
as you know the backend side is already setup with these functioanlities and as we know you should call the contract method first then if it was ok, call the backend APIs subsequently, so following is the flow for this process:

```
backend <-----api call-----> react <------api call-------> thirdweb
```

also for further reading about the thirdweb API calls and setup the contracts inside the project refer to https://thirdweb.com/thirdweb.eth/MarketplaceV3 and https://thirdweb.com/thirdweb.eth/TokenERC721 links, right down below you can see **Functions** tab and the others like **Code** to get you started with writing code inside react.

```bash
ClientID => b1a7526dc1f49ef220674af1da3051d2
Market Contract Address => 0x6bD06CCe2884Ffd5060e211142F6D4EEfCd14296
NFT Contract Address => 0xFBF8392fF5E5F2924f0e7Af9121adE9254711cC6
```
### 🍟 Features we care about in Marketplace

- minting
- selling
- making offer
- start auction
- adding bid
- listing
- fetching on chain data about an NFT

## 🖼️ NFT Transfer Backend Interaction

> there is a postman collection the will be mailed you on every update, so check your unread mails with title **youwho postman collection**
> note that you have to use the **web3** lib to build a wallet in frontend from the **cid** and **signer** fields inside the response of the `/cid/build` API to allow users to sign any in-app operation like deposit and withdraw process with their private key (do R&D about this subject!)

📌 following are the APIs that must be invoked

- login api ✅
- wallet api ✅
- deposit api ✅ ----- exchange API must be given
- withdraw api ✅ ---- exchange API must be given
- get all user deposits ✅
- get all user withdraw ✅
- get recipient unclaimed deposits ✅
- heck token api ✅
- wallet api to edit user info ✅

🚧 following are the APIs that must be given or is under active development
- exchange API must be given ⏳
- verify mail ⏳
