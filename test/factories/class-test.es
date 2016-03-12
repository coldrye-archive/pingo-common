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


import {decoratedClassFactory} from '../../src/factories';
import {extractFormalParameterList} from '../../src/utils';


describe('decoratedClassFactory()',
function ()
{
    class Target
    {
        constructor()
        {}
    }

    /*eslint no-unused-vars:0*/
    function boundCtor(self, base, args)
    {}

    /*eslint no-unused-vars:0*/
    function unboundCtor(base, args)
    {}

    it('must throw on invalid target',
    function ()
    {
        function tc1()
        {
            decoratedClassFactory(null, boundCtor);
        }
        tc1.should.throw(TypeError, 'target must be a function');

        function tc2()
        {
            decoratedClassFactory(undefined, unboundCtor);
        }
        tc2.should.throw(TypeError, 'target must be a function');

        function tc3()
        {
            decoratedClassFactory(function () {}, boundCtor);
        }
        tc3.should.throw(TypeError, 'target must be a named function');
    });

    it('must throw on invalid ctor',
    function ()
    {
        function tc1()
        {
            decoratedClassFactory(Target, null);
        }
        tc1.should.throw(TypeError, 'ctor must be a function');

        function tc2()
        {
            decoratedClassFactory(Target, undefined);
        }
        tc2.should.throw(TypeError, 'ctor must be a function');

        function tc3()
        {
            decoratedClassFactory(Target, function () {});
        }
        tc3.should.throw(
            TypeError, 'ctor must be of type UnboundDecoratingCtorType'
        );

        function tc4()
        {
            decoratedClassFactory(Target, unboundCtor, true);
        }
        tc4.should.throw(
            TypeError, 'ctor must be of type BoundDecoratingCtorType'
        );

        function tc5()
        {
            decoratedClassFactory(Target, boundCtor);
        }
        tc5.should.throw(
            TypeError, 'ctor must be of type UnboundDecoratingCtorType'
        );
    });

    describe('when integrating using a bound ctor',
    function ()
    {
        const tracker = {ctor:false, decoctor:false};

        class Target
        {
            constructor(a, b)
            {
                a.should.equal(1);
                b.should.equal(2);
                tracker.ctor = true;
            }
        }

        function decoratingctor(self, base, args)
        {
            /*eslint no-invalid-this:0*/
            should.not.exist(this);
            self.should.be.instanceOf(Target);
            base.should.equal(Target);
            base.apply(self, args);
            tracker.decoctor = true;
        }

        const decorated = decoratedClassFactory(Target, decoratingctor, true);

        it('Target must be a prototype of decorated',
        function ()
        {
            Target.isPrototypeOf(decorated).should.be.ok;
        });

        it('the original formal parameter list must be retained',
        function ()
        {
            const targetfpl = extractFormalParameterList(Target);
            const decoratedfpl = extractFormalParameterList(decorated);
            decoratedfpl.should.equal(targetfpl);
        });

        const instance = new decorated(1, 2);

        it('the decorating ctor must be called on new decorated()',
        function ()
        {
            tracker.decoctor.should.be.ok;
        });

        it('the target ctor must be called',
        function ()
        {
            tracker.ctor.should.be.ok;
        });

        it('instance must be instance of Target',
        function ()
        {
            instance.should.be.instanceOf(Target);
        });
    });

    describe('when integrating using an unbound ctor',
    function ()
    {
        const tracker = {ctor:false, decoctor:false};

        class Target
        {
            constructor(a, b)
            {
                a.should.equal(1);
                b.should.equal(2);
                tracker.ctor = true;
            }
        }

        function decoratingctor(base, args)
        {
            /*eslint no-invalid-this:0*/
            this.should.be.instanceOf(Target);
            base.should.equal(Target);
            /*eslint no-invalid-this:0*/
            base.apply(this, args);
            tracker.decoctor = true;
        }

        const decorated = decoratedClassFactory(Target, decoratingctor);

        it('Target must be a prototype of decorated',
        function ()
        {
            Target.isPrototypeOf(decorated).should.be.ok;
        });

        it('the original formal parameter list must be retained',
        function ()
        {
            const targetfpl = extractFormalParameterList(Target);
            const decoratedfpl = extractFormalParameterList(decorated);
            decoratedfpl.should.equal(targetfpl);
        });

        const instance = new decorated(1, 2);

        it('the decorating ctor must be called on new decorated()',
        function ()
        {
            tracker.decoctor.should.be.ok;
        });

        it('the target ctor must be called',
        function ()
        {
            tracker.ctor.should.be.ok;
        });

        it('instance must be instance of Target',
        function ()
        {
            instance.should.be.instanceOf(Target);
        });
    });
});

