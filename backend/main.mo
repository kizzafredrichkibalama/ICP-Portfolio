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

import MgtCanisterTypes "./INTERFACES/mgt_canister.types";
import Types "./Types";
import Oracle "INTERFACES/price_oracle.types";
import IndexLedgerTypes "INTERFACES/indexLedger.types";
import icpIndexTypes  "INTERFACES/icpIndex.types";
import monitorCanister "canister:monitorCanister";
import usersCanister "canister:userCanister";


actor class PWMANAGER() = this {

  type ICPAddress = Types.ICPAddress;
  type User = Types.User;

  //variables to facilitate the monitoring the ledger canisters
  private stable var CkStartBlock : Nat = 0;
  private stable var latestCKTxnIndex : Nat = 0;

  let ic : MgtCanisterTypes.IC = actor ("aaaaa-aa");

  //add icp secondary address
  public shared ({ caller }) func addICPAddress(_nickName : Text, addr : Text) : async Result.Result<ICPAddress, Text> {
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



  

 
  
  //store user information
  public shared ({ caller }) func storeUserInfo(email : Text) : async Result.Result<(), Text> {
    let results = await usersCanister.storeuseremail(caller, email);
    switch (results) {
      case (#ok()) { return #ok() };
      case (#err(value)) { return #err(value) };
    };
  };



  //get user's info, contains the user email, password,deviceCode eth address
  public func getUserAcc(user : Principal) : async Result.Result<User, Text> {
    switch (await usersCanister.useracc(user)) {
      case (#ok(user)) { return #ok(user) };
      case (#err(error)) { return #err(error) };
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

};
