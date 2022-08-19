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

import { addServicesInput } from "../components/CallingServiceInterface.ts";
import { ESteamOutputFormat, key, steamid } from "../interfaces/basic.ts";

export type TOwnedGames = {
  response: {
    /**
     *  the total number of games the user owns (including free games they've played, if include_played_free_games was passed)
     */
    game_count: bigint;
    /**
     * A games array, with the following contents.
     * > note that if "include_appinfo" was not passed in the request, only appid, playtime_2weeks, and playtime_forever will be returned)
     */
    games: Array<
      {
        /**
         * Unique identifier for the game
         */
        appid: bigint;
        /**
         * The name of the game
         */
        name: string;
        /**
         * The total number of minutes played in the last 2 weeks
         */
        playtime_2weeks: bigint;
        /**
         * The total number of minutes played "on record", since Steam began tracking total playtime in early 2009.
         */
        playtime_forever: bigint;
        /**
         * The filenames of an image for the game. To construct the URL to the image, use this format: http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg
         * > Example of URL construction -> http://media.steampowered.com/steamcommunity/public/images/apps/440/07385eb55b5ba974aebbe74d3c99626bda7920b8.jpg
         */
        img_icon_url: string;
        /**
         * indicates there is a stats page with achievements or other game stats available for this game. The uniform URL for accessing this data is http://steamcommunity.com/profiles/{steamid}/stats/{appid}. For example, Robin's TF2 stats can be found at: http://steamcommunity.com/profiles/76561197960435530/stats/440. You may notice that clicking this link will actually redirect to a vanity URL like /id/robinwalker/stats/TF2
         */
        has_community_visible_stats: boolean;
        playtime_windows_forever: bigint;
        playtime_mac_forever: bigint;
        playtime_linux_forever: bigint;
        rtime_last_played: bigint;
      }
    >;
  };
};

interface IGetOwnedGamesOptions {
  key: key;
  includeAppInfo?: boolean;
  format?: ESteamOutputFormat;
  includePlayedFreeGames?: boolean;
  appIdsFilter?: number[];
}
export async function getOwnedGames(
  steamId: steamid,
  options: IGetOwnedGamesOptions,
): Promise<TOwnedGames> {
  const REQ_URL = new URL(
    "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/",
  );
  REQ_URL.searchParams.append("key", options.key);
  REQ_URL.searchParams.append(
    "format",
    options.format || ESteamOutputFormat.JSON,
  );

  // Service interface (cannot be passed as URL params)
  addServicesInput(REQ_URL, {
    appids_filter: options.appIdsFilter,
    steamid: steamId.toString(),
    include_appinfo: options.includeAppInfo,
    include_played_free_games: options.includePlayedFreeGames,
  });
  return await (await fetch(REQ_URL)).json() as TOwnedGames;
}
