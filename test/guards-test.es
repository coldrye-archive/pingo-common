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


import {inspect} from 'util';

import * as guards from '../src/guards';


const accessorPropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get: function () {},
    /*eslint no-unused-vars:0*/
    set: function (v) {}
};


const accessorPropertyDescriptor2 = {
    configurable: true,
    enumerable: true,
    /*eslint no-unused-vars:0*/
    set: function (v) {}
};


const initializedPropertyDescriptor = {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer : function () {}
};


const propertyDataDescriptor = {
    configurable: true,
    enumerable: true,
    writable: true,
    value : 5
};


const methodDescriptor = {
    configurable: true,
    enumerable: true,
    writable: true,
    value : function () {}
};


describe('isDescriptor()',
function ()
{
    const testcases = [
        {descriptor: null, result: false},
        {descriptor: undefined, result: false},
        {descriptor: {}, result: false},
        {descriptor: initializedPropertyDescriptor, result: true},
        {descriptor: propertyDataDescriptor, result: true},
        {descriptor: accessorPropertyDescriptor, result: true},
        {descriptor: accessorPropertyDescriptor2, result: true},
        {descriptor: methodDescriptor, result: true}
    ];

    for (const tc of testcases)
    {
        const descr = inspect(tc.descriptor).replace(/\n/g, ' ');
        it(`must return ${tc.result} for descriptor ${descr}`,
        function ()
        {
            guards.isDescriptor(tc.descriptor).should.equal(tc.result);
        });
    }
});


describe('isDataDescriptor()',
function ()
{
    const testcases = [
        {descriptor: null, result: false},
        {descriptor: undefined, result: false},
        {descriptor: {}, result: false},
        {descriptor: initializedPropertyDescriptor, result: false},
        {descriptor: propertyDataDescriptor, result: true},
        {descriptor: accessorPropertyDescriptor, result: false},
        {descriptor: accessorPropertyDescriptor2, result: false},
        {descriptor: methodDescriptor, result: true}
    ];

    for (const tc of testcases)
    {
        const descr = inspect(tc.descriptor).replace(/\n/g, ' ');
        it(`must return ${tc.result} for descriptor ${descr}`,
        function ()
        {
            guards.isDataDescriptor(tc.descriptor).should.equal(tc.result);
        });
    }
});


describe('isInitializedPropertyDescriptor()',
function ()
{
    const testcases = [
        {descriptor: null, result: false},
        {descriptor: undefined, result: false},
        {descriptor: {}, result: false},
        {descriptor: initializedPropertyDescriptor, result: true},
        {descriptor: propertyDataDescriptor, result: false},
        {descriptor: accessorPropertyDescriptor, result: false},
        {descriptor: accessorPropertyDescriptor2, result: false},
        {descriptor: methodDescriptor, result: false}
    ];

    for (const tc of testcases)
    {
        const descr = inspect(tc.descriptor).replace(/\n/g, ' ');
        it(`must return ${tc.result} for descriptor ${descr}`,
        function ()
        {
            guards.isInitializedPropertyDescriptor(
                tc.descriptor
            ).should.equal(tc.result);
        });
    }
});


describe('isPropertyDataDescriptor()',
function ()
{
    const testcases = [
        {descriptor: null, result: false},
        {descriptor: undefined, result: false},
        {descriptor: {}, result: false},
        {descriptor: initializedPropertyDescriptor, result: false},
        {descriptor: propertyDataDescriptor, result: true},
        {descriptor: accessorPropertyDescriptor, result: false},
        {descriptor: accessorPropertyDescriptor2, result: false},
        {descriptor: methodDescriptor, result: false}
    ];

    for (const tc of testcases)
    {
        const descr = inspect(tc.descriptor).replace(/\n/g, ' ');
        it(`must return ${tc.result} for descriptor ${descr}`,
        function ()
        {
            guards.isPropertyDataDescriptor(
                tc.descriptor
            ).should.equal(tc.result);
        });
    }
});


describe('isAccessorPropertyDescriptor()',
function ()
{
    const testcases = [
        {descriptor: null, result: false},
        {descriptor: undefined, result: false},
        {descriptor: {}, result: false},
        {descriptor: initializedPropertyDescriptor, result: false},
        {descriptor: propertyDataDescriptor, result: false},
        {descriptor: accessorPropertyDescriptor, result: true},
        {descriptor: accessorPropertyDescriptor2, result: true},
        {descriptor: methodDescriptor, result: false}
    ];

    for (const tc of testcases)
    {
        const descr = inspect(tc.descriptor).replace(/\n/g, ' ');
        it(`must return ${tc.result} for descriptor ${descr}`,
        function ()
        {
            guards.isAccessorPropertyDescriptor(
                tc.descriptor
            ).should.equal(tc.result);
        });
    }
});


describe('isMethodDescriptor()',
function ()
{
    const testcases = [
        {descriptor: null, result: false},
        {descriptor: undefined, result: false},
        {descriptor: {}, result: false},
        {descriptor: initializedPropertyDescriptor, result: false},
        {descriptor: propertyDataDescriptor, result: false},
        {descriptor: accessorPropertyDescriptor, result: false},
        {descriptor: accessorPropertyDescriptor2, result: false},
        {descriptor: methodDescriptor, result: true}
    ];

    for (const tc of testcases)
    {
        const descr = inspect(tc.descriptor).replace(/\n/g, ' ');
        it(`must return ${tc.result} for descriptor ${descr}`,
        function ()
        {
            guards.isMethodDescriptor(tc.descriptor).should.equal(tc.result);
        });
    }
});

