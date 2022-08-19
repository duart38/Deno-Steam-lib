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
 * Modifies the url provided with an input conforming to the valve [Calling Service interfaces](https://developer.valvesoftware.com/wiki/Steam_Web_API#Calling_Service_interfaces)
 * @see https://developer.valvesoftware.com/wiki/Steam_Web_API#Calling_Service_interfaces
 */
export function addServicesInput(
  url: URL,
  data: Record<string, unknown>,
  paramName = "input_json",
) {
  if (url.searchParams.has(paramName)) {
    const prev = JSON.parse(url.searchParams.get(paramName)!);
    url.searchParams.delete(paramName);
    url.searchParams.append(paramName, JSON.stringify({ ...prev, ...data }));
  } else {
    const t = JSON.stringify(data);
    if (t.length <= 2) return url;
    url.searchParams.append(paramName, t);
  }
  return url;
}
