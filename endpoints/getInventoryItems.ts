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

import { rawBool, steamid } from "../interfaces/basic.ts";

export interface IGetInventoryItems {
    contextId?: number,
    language?: string,
    /**
     * The maximum number of items you would like to retrieve. Max is 5000
     */
    count?: number,
    /**
     * Used for pagination. The ID of the asset to start fetching from.
     */
    startId?: bigint
}

export type TInventoryItems = {
    total_inventory_count: number,
    success: rawBool,
    rwgrsn: number,
    assets: Array<
        {
            appid: bigint,
            contextid: string,
            assetid: string,
            classid: string,
            instanceid: string,
            amount: string
        }
    >,
    descriptions: Array<
       {
        appid: bigint,
        classid: string,
        instanceid: string,
        currency: number,
        background_color: string,
        icon_url: string,
        icon_url_large: string,
        descriptions: Array<{value: string, color?: string, type?: string}>,
        tradable: rawBool,
        actions: Array<{link: string, name: string}>,
        name: string,
        name_color: string,
        type: string,
        market_name: string,
        market_hash_name: string,
        commodity: number,
        market_tradable_restriction: number,
        market_marketable_restriction: number,
        marketable: rawBool,
        tags: Array<{
            category: string,
            internal_name: string,
            localized_category_name: string,
            localized_tag_name: string,
            color?: string
        }>
       }
    >
}

export async function getInventoryItems(userId: steamid, appId: bigint, options: IGetInventoryItems = {}){
    const REQ_URL = new URL(`https://steamcommunity.com/inventory/${userId}/${appId}/${options.contextId || 2}`);
    options.language && REQ_URL.searchParams.append("l", options.language);
    options.count && REQ_URL.searchParams.append("count", options.count.toString());
    options.startId && REQ_URL.searchParams.append("start_assetid", options.startId.toString());

    return await (await fetch(REQ_URL)).json() as TInventoryItems;
}

export async function getAllInventoryItems(userId: steamid, options: IGetInventoryItems = {}){
    return await getInventoryItems(userId, 753n, {...options, contextId: 6})
}