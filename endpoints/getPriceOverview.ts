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

import { Currency } from "../interfaces/basic.ts";

export type TPriceOverview = {
    success: boolean,
    /**
     * E.g., "0,03€"
     */
    lowest_price: string,
    /**
     * How many sold in the last 24 hours
     */
    volume: string,
    median_price: string
}
export interface IPriceOverviewOptions {
    currency?: Currency,
    /**
     * Country code. E.g., NL
     */
    country?: string,
}

/**
 * Gets the market information of an app's given item
 * @param appId the app (game)
 * @param itemName the full name of the item as shown when in the steam inventory
 * @param options 
 */
export async function getPriceOverview(appId: bigint, itemName: string, options: IPriceOverviewOptions = {}){
    const REQ_URL = new URL("https://steamcommunity.com/market/priceoverview/");
    REQ_URL.searchParams.append("appid", appId.toString())
    REQ_URL.searchParams.append("market_hash_name", itemName)


    REQ_URL.searchParams.append("currency", options.currency?.toString() || Currency.USD.toString())
    REQ_URL.searchParams.append("country", options.country || "US")

    return await (await fetch(REQ_URL)).json() as TPriceOverview
}