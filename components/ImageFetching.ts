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
 * Converts an image hash to it's url which can then be used to fetch the image.
 * @param appId The id of the game. if this is not a game icon then this field will be ignored (i.e., set it to whatever you like)
 * @param isGameIcon Indicates if the asset being fetched is directly associated with the game or if it's something like a trading card etc.
 */
export function convertToImageUri(appId: bigint, imageHash: string, isGameIcon = true){
    if(appId === 753n) isGameIcon = false;
    if(isGameIcon){
        return `http://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${imageHash}`;
    }else{
        return `https://community.cloudflare.steamstatic.com/economy/image/${imageHash}`
    }
}