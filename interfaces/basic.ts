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

/**
 * The SteamID of the account
 */
export type steamid = bigint;
export type key = string;
export enum ESteamOutputFormat {
  JSON = "json",
  // TODO: add other stuff
}

export type rawBool = 1 | 0;

export enum Currency {
  USD = 1,
  GBP, EUR, CHF, RUB, PLN, BRL, JPY, NOK, IDR, MYR, PHP, SGD, THB, VND, KRW,
  TRY, UAH, MXN, CAD, AUD, NZD, CNY, INR, CLP, PEN, COP, ZAR, HKD, TWD, SAR,
  AED, SEK, ARS, ILS, BYN, KZT, KWD, QAR, CRC, UYU, BGN, HRK, CZK, DKK, HUF,
  RON
}