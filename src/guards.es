// vim: expandtab:ts=4:sw=4
/*
 * Copyright 2015-2016 Carsten Klein
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
 * Returns true whether the specified descriptor is an initialized property
 * descriptor. (``isDescriptor && descriptor.initializer isa function``)
 *
 * @param {InitializedPropertyDescriptorType} descriptor - the descriptor
 * @returns {Boolean} - true whether descriptor is an instance property descriptor
 */
export function isInitializedPropertyDescriptor(descriptor)
{
    return isDescriptor(descriptor)
           && typeof descriptor.initializer == 'function';
}


/**
 * Returns true whether the specified descriptor is an accessor property
 * descriptor. (``isDescriptor && (descriptor.get isa function || descriptor.set isa function)``)
 *
 * @param {AccessorPropertyDescriptorType} descriptor - the descriptor
 * @returns {Boolean} - true whether descriptor is an accessor property descriptor
 */
export function isAccessorPropertyDescriptor(descriptor)
{
    return isDescriptor(descriptor)
           && (typeof descriptor.get == 'function'
           || typeof descriptor.set == 'function');
}


/**
 * Returns true whether the specified descriptor is a data descriptor.
 * (``!isDescriptor && 'writable' in descriptor && 'value' in descriptor``)
 *
 * @param {DataDescriptorType} descriptor - the descriptor
 * @returns {Boolean} - true whether descriptor is a data descriptor
 */
export function isDataDescriptor(descriptor)
{
    return isDescriptor(descriptor)
           && 'writable' in descriptor
           && 'value' in descriptor;
}


/**
 * Returns true whether the specified descriptor is a property data
 * descriptor. (``!isDataDescriptor && descriptor.value isnota function``)
 *
 * @param {PropertyDataDescriptorType} descriptor - the descriptor
 * @returns {Boolean} - true whether descriptor is a property data descriptor
 */
export function isPropertyDataDescriptor(descriptor)
{
    return isDataDescriptor(descriptor)
           && typeof descriptor.value != 'function';
}


/**
 * Returns true whether the specified descriptor is a method descriptor.
 * (``isDataDescriptor && descriptor.value isa function``)
 *
 * @param {MethodDescriptorType} descriptor - the descriptor
 * @returns {Boolean} - true whether descriptor is a method descriptor
 */
export function isMethodDescriptor(descriptor)
{
    return isDataDescriptor(descriptor)
           && typeof descriptor.value == 'function';
}


/**
 * Returns true whether the specified descriptor is a descriptor.
 *
 * @param {DescriptorType} descriptor - the descriptor
 * @returns {Boolean} - true whether descriptor is a valid descriptor
 */
export function isDescriptor(descriptor)
{
    return descriptor !== null
           && typeof descriptor == 'object'
           && 'configurable' in descriptor
           && 'enumerable' in descriptor
           && ('writable' in descriptor
           && ('value' in descriptor || 'initializer' in descriptor)
           || ('get' in descriptor || 'set' in descriptor));
}

