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
 * @typedef {(Function|Object)} TargetType
 */


/**
 * The descriptor provided by the babel runtime.
 *
 * @typedef {(MethodDescriptorType|AccessorPropertyDescriptorType|InitializedPropertyDescriptorType|PropertyDataDescriptorType)} DescriptorType
 */


/**
 * The descriptor for properties with getters and setters, aka accessors.
 *
 * @typedef {Object} AccessorPropertyDescriptorType
 * @property {Boolean} customizable
 * @property {Boolean} enumerable
 * @property {Function} get
 * @property {Function} set
 */


/**
 * The descriptor for initialized properties as provided by the babel runtime.
 *
 * @typedef {Object} InitializedPropertyDescriptorType
 * @property {Boolean} customizable
 * @property {Boolean} enumerable
 * @property {Boolean} writable
 * @property {Function} initializer
 */


/**
 * The standard data descriptor.
 *
 * @typedef {Object} DataDescriptorType
 * @property {Boolean} customizable
 * @property {Boolean} enumerable
 * @property {Boolean} writable
 * @property {*} value
 */


/**
 * The data descriptor for properties.
 *
 * @typedef {Object} PropertyDataDescriptorType
 * @property {Boolean} customizable
 * @property {Boolean} enumerable
 * @property {Boolean} writable
 * @property {String|Number|Object} value
 */


/**
 * The method descriptor provided by the babel runtime.
 *
 * @typedef {Object} MethodDescriptorType
 * @property {Boolean} customizable
 * @property {Boolean} enumerable
 * @property {Boolean} writable
 * @property {Function} value - the method
 */

