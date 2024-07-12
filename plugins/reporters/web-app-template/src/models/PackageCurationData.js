/*
 * Copyright (C) 2024 The ORT Project Authors (see <https://github.com/oss-review-toolkit/ort/blob/main/NOTICE>)
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

import RemoteArtifact from './RemoteArtifact';
import VcsInfo from './VcsInfo';

class PackageCurationData {
    #comment;

    #purl;

    #cpe;

    #authors;

    #concludedLicense;

    #description;

    #homepageUrl;

    #binaryArtifact = new RemoteArtifact();

    #sourceArtifact = new RemoteArtifact();

    #vcs = new VcsInfo();

    #isMetadataOnly;

    #isModified;

    #declaredLicenseMapping;

    #sourceCodeOrigins;

    constructor(obj) {
        if (obj instanceof Object) {
            if (obj.comment) {
                this.#comment = obj.comment;
            }

            if (obj.purl) {
                this.#purl = obj.purl;
            }

            if (obj.cpe) {
                this.#cpe = obj.cpe;
            }

            if (obj.authors) {
                this.#authors = obj.authors;
            }

            if (obj.concludedLicense) {
                this.#concludedLicense = obj.concludedLicense;
            }

            if (obj.description) {
                this.#description = obj.description;
            }

            if (obj.homepage_url || obj.homepageUrl) {
                this.#homepageUrl = obj.homepage_url || obj.homepageUrl;
            }

            if (obj.binary_artifact || obj.binaryArtifact) {
                this.#binaryArtifact = obj.binary_artifact || obj.binaryArtifact;
            }

            if (obj.source_artifact || obj.sourceArtifact) {
                this.#sourceArtifact = obj.source_artifact || obj.sourceArtifact;
            }

            if (obj.vcs) {
                this.#vcs = obj.vcs;
            }

            if (obj.is_metadata_only || obj.isMetadataOnly) {
                this.#isMetadataOnly = obj.is_metadata_only || obj.isMetadataOnly;
            }

            if (obj.is_modified || obj.isModified) {
                this.#isModified = obj.is_modified || obj.isModified;
            }
        }
    }

    get comment() {
        return this.#comment;
    }

    get purl() {
        return this.#purl;
    }

    get cpe() {
        return this.#cpe;
    }

    get authors() {
        return this.#authors;
    }

    get concludedLicense() {
        return this.#concludedLicense;
    }

    get description() {
        return this.#description;
    }

    get homepageUrl() {
        return this.#homepageUrl;
    }

    get binaryArtifact() {
        return this.#binaryArtifact;
    }

    get sourceArtifact() {
        return this.#sourceArtifact;
    }

    get vcs() {
        return this.#vcs;
    }

    get isMetadataOnly() {
        return this.#isMetadataOnly;
    }

    get isModified() {
        return this.#isModified;
    }

    get declaredLicenseMapping() {
        return this.#declaredLicenseMapping;
    }

    get sourceCodeOrigins() {
        return this.#sourceCodeOrigins;
    }
}

export default PackageCurationData;
