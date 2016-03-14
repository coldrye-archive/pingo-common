// vim: expandtab:ts=4:sw=4
/*
 * Copyright 2016 Carsten Klein
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import {buildDecoratingTypeErrorMessage} from './utils';


/**
 * @private
 */
export function assertFunctionType(name, func)
{
    if (typeof func != 'function')
    {
        throw new TypeError(
            `${name} must be a function and not "${typeof func}"`
        );
    }
}


/**
 * @private
 */
export function assertDecoratingType(name, func, type, bound)
{
    const expectedLength = bound ? 3 : 2;

    if (typeof func != 'function' || func.length != expectedLength)
    {
        throw new TypeError(buildDecoratingTypeErrorMessage(
            name, func, type, bound
        ));
    }
}

