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

import { Descriptions } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Descriptions;

// Generates the HTML for packages curations.
// FIXME @aphronio to implemented UI for displaying all curated packages.
const CuratedPackages = ({ packages }) => {
    console.log('Map{<packageId> -> <PackageCurationData>} of curated packages:', packages);
    return (
        <Descriptions
            className="ort-package-details"
            column={1}
            size="small"
        >
            <Item>
                FIXME
            </Item>
        </Descriptions>
    );
};

CuratedPackages.propTypes = {
    packages: PropTypes.object.isRequired
};

export default CuratedPackages;