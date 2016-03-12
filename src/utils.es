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
 * @returns {String} - the target's class name or undefined
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


const REGEXP_FORMAL_PARAMETER_LIST = /^function [^(]*[(]([^)]*)[)]/;


/**
 * Extracts the formal parameter list from the specified function ``func``
 * which is then to be included in a dynamically generated method or
 * constructor.
 *
 * This is provided so that decorators asserting the number of formal
 * parameters present will work as expected.
 *
 * Provided always, of course, that all decorators make use of this,
 * otherwise, the user will have to apply decorators in a specific order.
 *
 * @param {Function} func - the function
 * @throws {TypeError} - in case that func is not a function
 * @returns {String} - the formal parameter list
 */
export function extractFormalParameterList(func)
{
    if (typeof func != 'function')
    {
        throw new TypeError(`func must be a function and not "${typeof func}"`);
    }

    const match = REGEXP_FORMAL_PARAMETER_LIST.exec(func.toString());

    return match[1];
}

