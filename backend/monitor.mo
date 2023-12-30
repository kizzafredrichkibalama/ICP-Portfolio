import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Timer "mo:base/Timer";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Types "Types";
import { recurringTimer; cancelTimer } "mo:base/Timer";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Time "mo:base/Time";

import IcpLedgerTypes "INTERFACES/icpLedger.types";
import UniversalTypes "INTERFACES/universal.types";
import MgtCanisterTypes "INTERFACES/mgt_canister.types";
import Oracle "INTERFACES/price_oracle.types";
import IndexLedgerTypes "INTERFACES/indexLedger.types";
import usersCanister "canister:userCanister";
import icpIndexTypes "INTERFACES/icpIndex.types";
import Hex "Utils/Hex";
import IcpIndexTypes "INTERFACES/icpIndex.types";
actor class Can() = this {

  type EthAddress = Types.EthAddress;
  type ICPAddress = Types.ICPAddress;
  type User = Types.User;

  //how the response should look like
  type BalanceResponse = {
    canister_id : Text;
    token_name : ?Text;
    token_symbol : ?Text;
    token_decimals : ?Nat8;
    token_fee : ?Nat;
    balance : Nat;
  };

  public type GetTransactions = IndexLedgerTypes.GetTransactions;
public type GetAccountIdentifierTransactionsResponse = icpIndexTypes.GetAccountIdentifierTransactionsResponse;
  public type TokenExtended = Oracle.LatestExtendedToken;
  // access will be added after the mvp testing is done and only the main canister should be abblowed to access theses functions
  //ledger canister ids
  // let LedgerIDs : [Text] = [
  //   "br5f7-7uaaa-aaaaa-qaaca-cai", //ckledger local
  //   "bd3sg-teaaa-aaaaa-qaaba-cai", //chatledger local
  //   "be2us-64aaa-aaaaa-qaabq-cai" //icpledger  local
  // ];

  let LedgerIDs : [Text] = [
    "mxzaz-hqaaa-aaaar-qaada-cai", //ckledger ic
    "2ouva-viaaa-aaaaq-aaamq-cai", //chatledger ic
    "ryjl3-tyaaa-aaaaa-aaaba-cai" //icpledger  ic
  ];

  //price feed canister
  let PriceFeed : Oracle.PriceActor = actor ("u45jl-liaaa-aaaam-abppa-cai");

  //ic ledgers
  private stable var CKBTCLedger : UniversalTypes.Actor = actor ("mxzaz-hqaaa-aaaar-qaada-cai");
  private stable var CHATLedger : UniversalTypes.Actor = actor ("2ouva-viaaa-aaaaq-aaamq-cai");
  private stable var ICPLedger : IcpLedgerTypes.Actor = actor ("ryjl3-tyaaa-aaaaa-aaaba-cai");
    private stable var ICPIndex : icpIndexTypes.Actor = actor ("by6od-j4aaa-aaaaa-qaadq-cai");

//local ledgers
  //   private stable var CKBTCLedger : UniversalTypes.Actor = actor ("be2us-64aaa-aaaaa-qaabq-cai");
  // private stable var CHATLedger : UniversalTypes.Actor = actor ("bd3sg-teaaa-aaaaa-qaaba-cai");
  // private stable var ICPLedger : IcpLedgerTypes.Actor = actor ("be2us-64aaa-aaaaa-qaabq-cai");
  //   private stable var ICPIndex : icpIndexTypes.Actor = actor ("by6od-j4aaa-aaaaa-qaadq-cai");


  let ic : MgtCanisterTypes.IC = actor ("aaaaa-aa");

  //stop the timer id
  public func stopTimer(id : Nat) : async () {
    cancelTimer(id)
  };

  //start monitoring the ledger canisters
  //variables to facilitate the monitoring the ledger canisters
  private stable var CkStartBlock : Nat = 0;
  private stable var latestCKTxnIndex : Nat = 0;
  private stable var CHATStartBlock : Nat = 0;
  private stable var latestCHATTxnIndex : Nat = 0;

  //start monitoring the Cledger
  public func startCKMonitor(block : Nat) : async Result.Result<Nat, Text> {
    CkStartBlock := block;
    let timer = recurringTimer(#seconds(5), monitorCKLedger);
    return #ok(timer);
  };

  //monitor the ckbtc kedger for new transactions
  private func monitorCKLedger() : async () {

    let tokenName : Text = "ckBTC";
    var start : Nat = CkStartBlock;
    let ledgerCanister = CKBTCLedger;
    if (latestCKTxnIndex > 0) {
      start := latestCKTxnIndex + 1;
    };
    await helperMonitor(start, tokenName, ledgerCanister);
  };

  //start monitoring the Chatledger
  public func startCHATMonitor(block : Nat) : async Result.Result<Nat, Text> {
    CHATStartBlock := block;
    let timer = recurringTimer(#seconds(5), monitorCHATLedger);
    return #ok(timer);
  };

  //monitor the ckbtc kedger for new transactions
  private func monitorCHATLedger() : async () {
    let tokenName : Text = "CHAT";
    var start : Nat = CHATStartBlock;
    if (latestCHATTxnIndex > 0) {
      start := latestCHATTxnIndex + 1;
    };
    await helperMonitor(start, tokenName, CHATLedger);
  };

  private func helperMonitor(start : Nat, tokenName : Text, ledgerCanister : UniversalTypes.Actor) : async () {
    Debug.print("fetching new transactions");
    var response = await ledgerCanister.get_transactions({
      start = start;
      length = 1;
    });
    if (Array.size(response.transactions) > 0) {
      await setTxnIndex(tokenName, start);
      Debug.print("Latest transaction :" #debug_show (start));

      if (response.transactions[0].kind == "transfer") {
        let t = response.transactions[0];
        switch (t.transfer) {
          case (?transfer) {
            let to = transfer.to.owner;
            Debug.print("Feching user details");

            switch (await usersCanister.useracc(to)) {
              case (#ok(subscriber)) {

                if (subscriber.email != "") {
                  Debug.print("Sending an email to the user");
                  await sendEmailNotification(subscriber, t, tokenName, to);
                };
              };
              case (#err(value)) {};
            };
          };
          case null {
            // No action required if transfer is null
          };
        };
      };
    };
  };

  private func setTxnIndex(tokenName : Text, start : Nat) : async () {
    switch (tokenName) {
      case ("ckBTC") { latestCKTxnIndex := start; return };
      case ("CHAT") { latestCHATTxnIndex := start; return };
      case (_) {};
    };
  };

  //send the email to the recipient
  //should include a link referencing the transaction to the sns dashboard
  private func sendEmailNotification(subscriber : User, transaction : UniversalTypes.Transaction, tokenName : Text, owner : Principal) : async () {
    Debug.print("preparing to send the email");
    var amount = "0";
    var from = "";
    switch (transaction.transfer) {
      case (?transfer) {
        amount := Nat.toText(transfer.amount);
        from := Principal.toText(transfer.from.owner);
      };
      case null {};
    };

    let url = "https://ic-netlify-functions.netlify.app/.netlify/functions/sendEmployeeEmail";

    let idempotency_key : Text = generateUUID();
    let request_headers = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Idempotency-Key"; value = idempotency_key }

    ];

    let requestBodyJson : Text = "{ \"idempotencyKey\": \"" # idempotency_key # "\", \"email\": \"" # subscriber.email # "\", \"token\": \"" # tokenName # "\", \"amount\": \"" # amount # "\", \"payer\": \"" # from # "\",\"owner\": \"" # Principal.toText(owner) # "\"}";
    let requestBodyAsBlob : Blob = Text.encodeUtf8(requestBodyJson);
    let requestBodyAsNat8 : [Nat8] = Blob.toArray(requestBodyAsBlob);

    let http_request : MgtCanisterTypes.HttpRequestArgs = {
      url = url;
      max_response_bytes = null; //optional for request
      headers = request_headers;
      body = ?requestBodyAsNat8;
      method = #post;
      transform = null; //optional for request
    };

    Cycles.add(220_131_200_000); //minimum cycles needed to pass the CI tests. Cycles needed will vary on many things size of http response, subnetc, etc...).
    Debug.print(" sending the email");
    let http_response : MgtCanisterTypes.HttpResponsePayload = await ic.http_request(http_request);

    let response_body : Blob = Blob.fromArray(http_response.body);
    let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
      case (null) { "No value returned" };
      case (?y) { y };
    };
  };

  func generateUUID() : Text {
    "UUID-123456789";
  };

  private func _getAllIIcpIds(user : Principal) : async [usersCanister.ICPAddress] {

    let results = await usersCanister.getallusericpaddresses(user);
    var tempArray : [usersCanister.ICPAddress] = switch (results) {
      case (#ok(result)) {
        result;
      };
      case (#err(error)) { [] };
    };

    return (tempArray);

  };

 

  private func setIndexLedger(tokenName : Text) : Text {
    switch (tokenName) {
      case ("ckBTC") { return "b77ix-eeaaa-aaaaa-qaada-cai" }; //local index ledger canister ids
      case ("CHAT") { return "avqkn-guaaa-aaaaa-qaaea-cai" };
      case (_) { "" }; //need to add more canisters and handle the error for a no id specified
    };
  };

};
