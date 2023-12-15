import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import TrieMap "mo:base/TrieMap";
import List "mo:base/List";
import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import { recurringTimer; cancelTimer } "mo:base/Timer";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Nat64 "mo:base/Nat64";
import Nat "mo:base/Nat";
import Buffer "mo:base/Buffer";

import EthereumAddress "mo:evm-txs/Address";
import EthereumTransaction "mo:evm-txs/Transaction";
import EthereumContext "mo:evm-txs/Context";
import EthereumAU "mo:evm-txs/utils/ArrayUtils";
import EthTypes "./ECDSA/Types";
import IcEcdsaApi "./ECDSA/IcEcdsaApi";

import BTCUtils "./BTC/src/Utils";
import BTCTypes "./BTC/src/Types";
import BTCWallet "./BTC/src/BitcoinWallet";
import BTCAPI "./BTC/src/BitcoinApi";

import MgtCanisterTypes "./INTERFACES/mgt_canister.types";
import Types "./Types";
import Oracle "INTERFACES/price_oracle.types";
import IndexLedgerTypes "INTERFACES/indexLedger.types";
import icpIndexTypes  "INTERFACES/icpIndex.types";
import monitorCanister "canister:monitorCanister";
import usersCanister "canister:userCanister";


actor class PWMANAGER(
  eth_network : IcEcdsaApi.Network,
  btc_network : BTCTypes.Network,
) = this {

  let eth_keyName : Text = switch eth_network {
    case (#Localhost) "dfx_test_key";
    case _ "test_key_1";
  };

  let btc_keyName : Text = switch btc_network {
    case (#Regtest) "dfx_test_key";
    case _ "test_key_1";
  };

  let BTCNetwork : BTCTypes.Network = btc_network;
  //Defi Aggregator cainster for fetching icp token data

  type EthAddress = Types.EthAddress;
  type ICPAddress = Types.ICPAddress;
  type User = Types.User;

  //variables to facilitate the monitoring the ledger canisters
  private stable var CkStartBlock : Nat = 0;
  private stable var latestCKTxnIndex : Nat = 0;

  let icEcdsaApi = IcEcdsaApi.IcEcdsaApi();
  let ecCtx = EthereumContext.allocECMultContext(null);
  let ic : MgtCanisterTypes.IC = actor ("aaaaa-aa");

  //add icp secondary address
  public shared ({ caller }) func addICPAddress(_nickName : Text, addr : Text) : async Result.Result<EthAddress, Text> {
    let results = await usersCanister.addicpaddress(caller, _nickName : Text, addr : Text);

    switch (results) {
      case (#ok(value)) {
        return #ok(value);
      };
      case (#err(value)) {
        return #err("Error in adding new icp address");
      };
    };
  };

  //delete a secondary address from the list
  public shared ({ caller }) func deleteICPAdress(addr : Text) : async Result.Result<Text, Text> {
    let results = await usersCanister.deleteicpadress(caller, addr);
    switch (results) {
      case (#ok(value)) {
        return #ok(value);
      };
      case (#err(value)) {
        return #err(value);
      };
    };
  };

  //get all user icp secondary addresses
  public func getAllUserICPAddresses(user : Principal) : async Result.Result<[ICPAddress], Text> {
    let results = await usersCanister.getallusericpaddresses(user);
    switch (results) {
      case (#ok(value)) {
        return #ok(value);
      };
      case (#err(value)) {
        return #err(value);
      };
    };
  };

  // get user balance for the icp tokens
  public func get_user_icrc_balance(user:Principal) : async Result.Result<[(Text, [monitorCanister.BalanceResponse])],Text>{
    switch(await monitorCanister.get_icrc_token_balances(user)) {
      case(#ok(value)) {return #ok(value)  };
      case(#err(error)) {return #err(error) };
    };
  };



  //get principal id transactions from different ledger canisters
  public func get_user_ids_transactions(user:Principal,token:Text): async Result.Result<[(Text,monitorCanister.GetTransactions)],Text> {
switch(await monitorCanister.getAddressTransactions(user,token)) {
  case(#ok(results)) { return #ok(results); };
  case(#err(error)) { return #err(error); };
};
  };


  //get all icp transactions for the principal id
  public func get_icp_transactions(user:Principal) : async Result.Result<[(Text,monitorCanister.GetAccountIdentifierTransactionsResponse)],Text>{
      switch(await monitorCanister.geticptransactions(user)) {
        case(#ok(results)) {return #ok(results)  };
        case(#err(error)) { return #err(error) };
      };
  };

  //add new seondary ethereum address
  public shared ({ caller }) func addEthAddress(_nickName : Text, addr : Text) : async Result.Result<EthAddress, Text> {
    let results = await usersCanister.addethaddress(caller, _nickName, addr);
    switch (results) {
      case (#ok(value)) {
        return #ok(value);
      };
      case (#err(value)) {
        return #err("Error in adding new eth address");
      };
    };

  };

  //delete a secondary address from the list
  public shared ({ caller }) func deleteEthAdress(addr : Text) : async Result.Result<Text, Text> {
    let results = await usersCanister.deleteethadress(caller, addr);
    switch (results) {
      case (#ok(value)) {
        return #ok(value);
      };
      case (#err(value)) {
        return #err(value);
      };
    };
  };

  //function create an ethereum address
  public shared ({ caller }) func createEthAddress() : async Result.Result<EthTypes.CreateAddressResponse, Text> {

    let derivationPath = [Principal.toBlob(caller)];
    let results = await usersCanister.useracc(caller);
    switch (results) {
      case (#ok(user)) {
        if (not (Text.equal(user.address, ""))) return #err("address already created for the user");
      };
      case (#err(value))();
    };

    switch (await* EthereumAddress.create(eth_keyName, derivationPath, icEcdsaApi)) {
      case (#err(msg)) {
        return #err(msg);
      };
      case (#ok(res)) {

        //store the new address
        let results = await usersCanister.storePubKey(caller, res.0, res.1);

        switch (results) {
          case (#ok()) {
            return #ok({
              address = res.0;
            });

          };
          case (#err(value)) {

            return #err(value);
          };
        };
      };
    };
  };

  //store user information
  public shared ({ caller }) func storeUserInfo(email : Text) : async Result.Result<(), Text> {
    let results = await usersCanister.storeuseremail(caller, email);
    switch (results) {
      case (#ok()) { return #ok() };
      case (#err(value)) { return #err(value) };
    };
  };

  //get all user addresses
  public func getAllUserEthAddresses(user : Principal) : async Result.Result<[EthAddress], Text> {
    switch (await usersCanister.allethddresses(user)) {
      case (#ok(value)) { return #ok(value) };
      case (#err(error)) { return #err(error) };
    };
  };


  //get user's info, contains the user email, password,deviceCode eth address
  public func getUserAcc(user : Principal) : async Result.Result<User, Text> {
    switch (await usersCanister.useracc(user)) {
      case (#ok(user)) { return #ok(user) };
      case (#err(error)) { return #err(error) };
    };
  };

  //sign a message to send to the blockchain
  public shared ({ caller }) func signRawEvnTxn(
    hex_raw_tx : [Nat8],
    chain_id : Nat64,
  ) : async Result.Result<EthTypes.SignTransactionResponse, Text> {

    let derivationPath = [Principal.toBlob(caller)];
    let user = switch (await usersCanister.useracc(caller)) {
      case (#err(error)) { return #err(error) };
      case (#ok(user)) { user };
    };
    switch (
      await* EthereumTransaction.signRawTx(
        hex_raw_tx,
        chain_id,
        eth_keyName,
        derivationPath,
        user.publicKey,
        ecCtx,
        icEcdsaApi,
      )
    ) {
      case (#err(msg)) {
        return #err(msg);
      };
      case (#ok(tx)) {
        return #ok({
          tx = tx.1;
          tx_text = "0x" # EthereumAU.toText(tx.1);
        });
      };
    };
  };

  // function to send a raw eth txn using http outcalls to the blockchain.
  public shared ({ caller }) func sendEthTxnToNetwork(txnHash : Text) : async Result.Result<Text, Text> {

    //get a way to hide the api keys of the url
    let url = "https://eth-goerli.g.alchemy.com/v2/toSRwL_kkA0J0B8bR-ukdv8GwkP3NBgS";
    let idempotency_key : Text = "UUID-123456789";
    let request_headers = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Idempotency-Key"; value = idempotency_key },
    ];

    let request_body_json : Text = "{ \"jsonrpc\":\"2.0\",\"method\":\"eth_sendRawTransaction\",\"params\":" # "[\"" #txnHash # "\"]," # "\"id\":1}";
    let request_body_as_Blob : Blob = Text.encodeUtf8(request_body_json);
    let request_body_as_nat8 : [Nat8] = Blob.toArray(request_body_as_Blob);

    let http_request : MgtCanisterTypes.HttpRequestArgs = {
      url = url;
      max_response_bytes = null;
      headers = request_headers;
      body = ?request_body_as_nat8;
      method = #post;
      transform = ?{
        function = transform;
        context = [];
      };
    };
    //need to calculate the real number if cycles to send over
    Cycles.add(220_131_200_000);

    try {

      let http_response : MgtCanisterTypes.HttpResponsePayload = await ic.http_request(http_request);
      let response_body : Blob = Blob.fromArray(http_response.body);
      let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "No value returned" };
        case (?y) { y };
      };

      return #ok(decoded_text);

    } catch (error) {
      return #err(Error.message(error));
    };

  };

//get the token price data from the DeFi aggregator canister
  public func getLatestData() : async [Oracle.LatestTokenRow] {
    let results = await monitorCanister.getTokenPrices();
    return results;
  };

//get the extended data from the DeFi aggregator canister
  public func getLatestDataExtended() : async [monitorCanister.TokenExtended] {
    let results = await monitorCanister.getTokenData();
    return results;
  };

  //get the price for a specific token at a specific interval


  //function to remove the headers from the http response
  public query func transform({
    context : [Nat8];
    response : MgtCanisterTypes.HttpResponsePayload;
  }) : async MgtCanisterTypes.HttpResponsePayload {
    {
      response with headers = []; // not intersted in the headers
    };
  };

  ///get bitcoin address of the user
  /// Returns the P2PKH address of this canister at a specific derivation path.
  public shared ({ caller }) func get_p2pkh_address() : async BTCTypes.BitcoinAddress {
    let derivationPath = [Blob.toArray(Principal.toBlob(caller))];
    await BTCWallet.get_p2pkh_address(BTCNetwork, btc_keyName, derivationPath);
  };

  //get the bitcoin balance of the user
  /// Returns the balance of the given Bitcoin address.
  public func get_balance(address : BTCTypes.BitcoinAddress) : async BTCTypes.Satoshi {
    await BTCAPI.get_balance(BTCNetwork, address);
  };

  /// Sends the given amount of bitcoin from this canister to the given address.
  /// Returns the transaction ID.
  public shared ({ caller }) func sendBTC(request : BTCTypes.SendRequest) : async Text {
    let derivationPath = [Blob.toArray(Principal.toBlob(caller))];
    BTCUtils.bytesToText(await BTCWallet.send(BTCNetwork, derivationPath, btc_keyName, request.destination_address, request.amount_in_satoshi));
  };
};
