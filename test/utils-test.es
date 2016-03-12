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


import * as utils from '../src/utils';


describe('className()',
function ()
{
    it('must return undefined on invalid target',
    function ()
    {
        should.not.exist(utils.className(null));
        should.not.exist(utils.className(undefined));
    });

    class TestClass
    {}

    const testInstance = new TestClass();

    it('must return name of class',
    function ()
    {
        utils.className(TestClass).should.equal('TestClass');
    });

    it('must return name of class of instance',
    function ()
    {
        utils.className(testInstance).should.equal('TestClass');
    });
});


describe('extractFormalParameters()',
function ()
{
    it('must throw on non function',
    function ()
    {
        function tc1()
        {
            utils.extractFormalParameterList(null);
        }
        tc1.should.throw(TypeError, 'func must be a function');

        function tc2()
        {
            utils.extractFormalParameterList();
        }
        tc2.should.throw(TypeError, 'func must be a function');
    });

    it('must return expected result',
    function ()
    {
        /*eslint no-unused-vars:0*/
        function func(a, b)
        {}
        utils.extractFormalParameterList(func).should.equal('a, b');
    });
});

