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


/**
 * Returns the class name of the specified target that is either a
 * class (function) or an instance object.
 *
 * @protected
 * @param {TargetType} target - the target object or function
 * @returns {string} - the target's class name
 */
export function className(target)
{
    let result = undefined;

    if (typeof target == 'function')
    {
        result = target.name;
    }
    else if (target && target.constructor)
    {
        result = target.constructor.name;
    }

    return result;
}

