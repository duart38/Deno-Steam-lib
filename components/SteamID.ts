/*
 *   Copyright (c) 2022 Duart Snel
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

export enum EUniverse {
  /**
   *  also -> Unspecified
   */
  individual,
  Public,
  Beta,
  Internal,
  Dev,
  RC
}

export enum ESteamAccountType {
  Invalid,
  Individual,
  Multiseat,
  GameServer,
  AnonGameServer,
  Pending,
  ContentServer,
  Clan,
  Chat,
  P2P_SuperSeeder,
  AnonUser
}

export class SteamID {
  public accountUniverse: EUniverse;
  public accountType: ESteamAccountType;
  public accountInstance: number;
  public accountNumber: number;

  public computerRepresentation: string;
  public textualRepresentation: string;

  private Y: number;

  /**
   * https://developer.valvesoftware.com/wiki/SteamID
   **/
  constructor(id: bigint){
    const parsed = SteamID._parse(id)
    this.accountUniverse = parsed.acc_universe;
    this.accountType = parsed.acc_type;
    this.accountInstance = parsed.acc_instance;
    this.accountNumber = parsed.acc_number;
    
    this.computerRepresentation = parsed.bin;
    this.textualRepresentation = parsed.acc_type === ESteamAccountType.Invalid 
      ? "UNKNOWN" 
      : `STEAM_${parsed.acc_universe}:${parsed.Y}:${parsed.acc_number}`;
    
    this.Y = parsed.Y;
  }

  private static _parse(id: bigint){
    const bin = this._bin(id);
    console.log(bin.length)
    const Y = bin.at(-1); // least significant bit

    const acc_number = bin.slice(-32, -1); // next 31 bits from LSB
    const acc_instance = bin.slice(-52, -32); // 20 bits, prev cursor
    const acc_type = bin.slice(-56, -52); // next 4 bits
    const acc_universe = bin.slice(-64, -56); // next 8 bits

    return {
      bin,
      acc_universe: parseInt(acc_universe, 2),
      acc_type: parseInt(acc_type, 2),
      acc_instance: parseInt(acc_instance, 2),
      acc_number: parseInt(acc_number, 2),
      Y: parseInt(Y!, 2)
    }
    
  }

  private static _bin(id: bigint){
    return id.toString(2);
  }

  static getAccountUniverse(steamId: bigint){
    return new SteamID(steamId).accountUniverse;
  }

  static getAccountNumber(steamId: bigint){
    return new SteamID(steamId).accountNumber;
  }

  static getAccountType(steamId: bigint){
    return new SteamID(steamId).accountType;
  }

  static getAccountInstance(steamId: bigint){
    return new SteamID(steamId).accountInstance;
  }

}
