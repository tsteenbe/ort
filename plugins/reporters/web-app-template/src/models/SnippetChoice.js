/*
 * Copyright (C) 2026 The ORT Project Copyright Holders <https://github.com/oss-review-toolkit/ort/blob/main/NOTICE>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 * License-Filename: LICENSE
 */

import TextLocation from './TextLocation';

class Choice {
    #comment;

    #purl;

    #reason;

    constructor(obj) {
        if (obj instanceof Object) {
            if (obj.comment) {
                this.#comment = obj.comment;
            }

            if (obj.purl) {
                this.#purl = obj.purl;
            }

            if (obj.reason) {
                this.#reason = obj.reason;
            }
        }
    }

    get comment() {
        return this.#comment;
    }

    get purl() {
        return this.#purl;
    }

    get reason() {
        return this.#reason;
    }
}

class Given {
    #sourceLocation;

    constructor(obj) {
        if (obj instanceof Object) {
            if (obj.sourceLocation) {
                this.sourceLocation = new TextLocation(obj.sourceLocation);
            }
        }
    }

    get sourceLocation() {
        return this.#sourceLocation;
    }
}

class SnippetChoice {
    #choice;

    #given;

    constructor(obj) {
        if (obj instanceof Object) {
            if (obj.choice) {
                this.#choice = new Choice(obj.choice);
            }

            if (obj.given) {
                this.#given = new Given(obj.given);
            }
        }
    }

    get choice() {
        return this.#choice;
    }

    get given() {
        return this.#given;
    }
}

export default SnippetChoice;
