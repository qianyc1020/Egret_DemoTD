/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    /**
     * @class egret.URLVariables
     * @classdesc
     * 使用 URLVariables 类可以在应用程序和服务器之间传输变量。
     * 将 URLVariables 对象与 URLLoader 类的方法、URLRequest 类的 data 属性一起使用。
     * @extends egret.HashObject
     */
    var URLVariables = (function (_super) {
        __extends(URLVariables, _super);
        /**
         * @method egret.URLVariables#constructor
         * @param source {String} 包含名称/值对的 URL 编码的字符串。
         */
        function URLVariables(source) {
            if (source === void 0) { source = null; }
            _super.call(this);
            /**
             * 此 URLVariables 储存的键值对数据对象。
             * @member egret.URLVariables#variables
             */
            this.variables = null;
            if (source !== null) {
                this.decode(source);
            }
        }
        /**
         * 将变量字符串转换为此 URLVariables.variables 对象的属性。
         * @method egret.URLVariables#decode
         * @param source {string}
         */
        URLVariables.prototype.decode = function (source) {
            if (!this.variables) {
                this.variables = {};
            }
            source = source.split("+").join(" ");
            var tokens, re = /[?&]?([^=]+)=([^&]*)/g;
            while (tokens = re.exec(source)) {
                var key = decodeURIComponent(tokens[1]), val = decodeURIComponent(tokens[2]);
                //没有重复键值，直接赋值
                if ((key in this.variables) == false) {
                    this.variables[key] = val;
                    continue;
                }
                //有重复键值，如果已经存在数组，直接push到数组，否则创建一个新数组
                var value = this.variables[key];
                if (value instanceof Array) {
                    value.push(val);
                }
                else {
                    this.variables[key] = [value, val];
                }
            }
        };
        /**
         * 以 MIME 内容编码格式 application/x-www-form-urlencoded 返回包含所有可枚举变量的字符串。
         * @method egret.URLVariables#toString
         */
        URLVariables.prototype.toString = function () {
            if (!this.variables) {
                return "";
            }
            var variables = this.variables;
            var stringArray = [];
            for (var key in variables) {
                stringArray.push(this.encodeValue(key, variables[key]));
            }
            return stringArray.join("&");
        };
        URLVariables.prototype.encodeValue = function (key, value) {
            if (value instanceof Array) {
                return this.encodeArray(key, value);
            }
            else {
                return encodeURIComponent(key) + "=" + encodeURIComponent(value);
            }
        };
        URLVariables.prototype.encodeArray = function (key, value) {
            if (!key)
                return "";
            if (value.length == 0) {
                return encodeURIComponent(key) + "=";
            }
            return value.map(function (v) { return encodeURIComponent(key) + "=" + encodeURIComponent(v); }).join("&");
        };
        return URLVariables;
    })(egret.HashObject);
    egret.URLVariables = URLVariables;
    URLVariables.prototype.__class__ = "egret.URLVariables";
})(egret || (egret = {}));
