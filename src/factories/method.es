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


import {extractFormalParameterList} from '../utils';
import {assertFunctionType, assertDecoratingType} from './assertions';


/**
 * Factory for creating decorated methods.
 *
 * This provides the user with the means to create a decorated version of
 * the specified method.
 *
 * The so created method will have the same name and the same signature
 * as the specified method.
 *
 * Please note that this realizes only the ``around`` call scenario
 * by wrapping the call to the decorated method, which must be made by
 * the decorating function, by a call to the decorating function.
 * It is up to the decorating function to handle more specific call
 * scenarios such as ``before`` or ``after``.
 *
 * @param {Function} method - the target method
 * @param {DecoratingMethodType} func - the decorating function
 * @param {Boolean} bound - true whether func is already bound
 * @returns {Function} - the decorated method
 */
export default function decoratedMethodFactory(method, func, bound = false)
{
    assertFunctionType('method', method);

    if (!method.name)
    {
        throw new TypeError('method must be a named function');
    }

    assertDecoratingType('func', func, 'DecoratingMethodType', bound);

    const formalParameterList = extractFormalParameterList(method);

    /*eslint no-new-func:0*/
    const result = new Function(
        ['func', 'method', 'bound'],
        `
        function ${method.name}(${formalParameterList})
        {
            var result;

            var args = Array.prototype.slice.apply(arguments);
            if (bound)
            {
                result = func(this, method, args);
            }
            else
            {
                result = func.apply(this, [method, args]);
            }

            return result;
        };

        return ${method.name};
        `
    )(func, method, bound);

    return result;
}

