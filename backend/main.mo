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
import Types "./Types";


import IcpLedgerTypes "INTERFACES/icpLedger.types";
import UniversalTypes "INTERFACES/universal.types";
import MgtCanisterTypes "INTERFACES/mgt_canister.types";
import Oracle "INTERFACES/price_oracle.types";
import IndexLedgerTypes "INTERFACES/indexLedger.types";
import icpIndexTypes "INTERFACES/icpIndex.types";
import Hex "Utils/Hex";
import IcpIndexTypes "INTERFACES/icpIndex.types";





actor class PWMANAGER() = this {

  type ICPAddress = Types.ICPAddress;
  type User = Types.User;

  private var users = HashMap.HashMap<Principal, User>(10, Principal.equal, Principal.hash);
  private var icpAddresses = TrieMap.TrieMap<Principal, List.List<ICPAddress>>(Principal.equal, Principal.hash);
  private stable var usersArray : [(Principal, User)] = [];
  private stable var icpAddressesArray : [(Principal, [ICPAddress])] = [];




  //add icp secondary address
  public shared ({ caller }) func addICPAddress(_nickName : Text, addr : Text) : async Result.Result<ICPAddress, Text> {
    switch (icpAddresses.get(caller)) {
      case (null) {
        let newAddr = {
          address = addr;
          nickName = _nickName;
        };
        var list = List.nil<ICPAddress>();
        list := List.push<ICPAddress>(newAddr, list);
        icpAddresses.put(caller, list);
        return #ok(newAddr);
      };
      case (?value) {
        var list = value;
        let newAddr = {
          address = addr;
          nickName = _nickName;
        };
        list := List.push<ICPAddress>(newAddr, list);
        icpAddresses.put(caller, list);
        return #ok(newAddr);
      };
    };

    
  };

  //delete a secondary address from the list
  public shared ({ caller }) func deleteICPAdress(addr : Text) : async Result.Result<Text, Text> {
    switch (icpAddresses.get(caller)) {
      case null return #err("No addresses found");
      case (?value) {
        let newList = List.filter<ICPAddress>(value, func val { val.address != addr });
        icpAddresses.put(caller, newList);
        return #ok("Address deleted successfully");
      };
    };
  };

  //get all user icp addresses
  public func getAllUserICPAddresses(user : Principal) : async Result.Result<[ICPAddress], Text> {
     switch (icpAddresses.get(user)) {
      case (null) {

        return #ok([{
          address = Principal.toText(user);
          nickName = "Primary";
        }]);
      };
      case (?list) {
        var tempList = list;
        tempList := List.push<ICPAddress>(
          {
            address = Principal.toText(user);
            nickName = "Primary";
          },
          tempList,
        );
        return #ok(List.toArray<ICPAddress>(tempList));
      };
    };
  };


  //subscribe to notifications
  public func subscribeToNotifications(caller:Principal,email : Text) : async Result.Result<(), Text> {
      try {
      switch (users.get(caller)) {
        case (null) {
          users.put(
            caller,
            {
              firebase = "";
              email = email;
            },
          );
          return #ok();
        };
        case (?user) {
          users.put(
            caller,
            {
              firebase = user.firebase;
              email = email;
            },
          );
          return #ok();
        };
      };
    } catch (error) {
      return #err(Error.message(error));
    };
  };

//get user subscriber information
  public func getUserAcc(user : Principal) : async Result.Result<User, Text> {
    switch (users.get(user)) {
      case null return #err("No user information found");
      case (?account) { return #ok(account) };
    };
  };


















};
