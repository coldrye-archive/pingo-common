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


import {decoratedMethodFactory} from '../../src/factories';
import {extractFormalParameterList} from '../../src/utils';


describe('decoratedMethodFactory()',
function ()
{
    it('must throw on invalid method',
    function ()
    {
        /*eslint no-unused-vars:0*/
        function func(self, method, args)
        {}

        function tc1()
        {
            decoratedMethodFactory(null, func);
        }
        tc1.should.throw(TypeError, 'method must be a function');

        function tc2()
        {
            decoratedMethodFactory(undefined, func);
        }
        tc2.should.throw(TypeError, 'method must be a function');

        function tc3()
        {
            decoratedMethodFactory(function () {}, func);
        }
        tc3.should.throw(TypeError, 'method must be a named function');
    });

    it('must throw on invalid func',
    function ()
    {
        function tc1()
        {
            decoratedMethodFactory(function method() {});
        }
        tc1.should.throw(
            TypeError, 'func must be of type UnboundDecoratingFunctionType'
        );

        function tc2()
        {
            decoratedMethodFactory(
                function method() {},
                function func(self, method, args) {}
            );
        }
        tc2.should.throw(
            TypeError, 'func must be of type UnboundDecoratingFunctionType'
        );
    });

    it('must establish same name',
    function ()
    {
        function method()
        {}

        function func(self, method, args)
        {}

        const decorated = decoratedMethodFactory(method, func, true);
        decorated.name.should.equal(method.name);
    });

    it('must establish same formal parameter list',
    function ()
    {
        function method(a, b)
        {}

        function func(self, method, args)
        {}

        const decorated = decoratedMethodFactory(method, func, true);
        const methodfpl = extractFormalParameterList(method);
        const decoratedfpl = extractFormalParameterList(decorated);
        decoratedfpl.should.equal(methodfpl);
    });

    it('when integrating using a non bound func',
    function ()
    {
        const tracker = {called:false};
        function target(a, b)
        {
            tracker.called = true;
            a.should.equal(1);
            b.should.equal(2);
        }

        function func(method, args)
        {
            method.should.equal(target);
            args.should.deep.equal([1,2]);
            /*eslint no-invalid-this:0*/
            method.apply(this, args);
        }

        const decorated = decoratedMethodFactory(target, func);
        decorated(1, 2);
        tracker.called.should.be.ok;
    });

    it('when integrating using a bound func',
    function ()
    {
        const tracker = {called:false};
        function target(a, b)
        {
            tracker.called = true;
            a.should.equal(1);
            b.should.equal(2);
        }

        function func(self, method, args)
        {
            method.should.deep.equal(target);
            args.should.deep.equal([1,2]);
            /*eslint no-invalid-this:0*/
            method.apply(this, args);
        }

        const decorated = decoratedMethodFactory(target, func, true);
        decorated(1, 2);
        tracker.called.should.be.ok;
    });
});

