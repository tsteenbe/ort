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


import React from 'react';
import { Collapse, Descriptions, Typography, Space } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Descriptions;
const { Text } = Typography;

const PackageCurations = ({ curations }) => {

    if (!curations || curations.length === 0) {
        return <Text>No curations available for this package.</Text>;
    }

    const hasNonEmptyValues = (obj, seen = new WeakSet()) => {
        if (obj === null) return false;

        if (typeof obj === 'object'){

            if (seen.has(obj)) return false; // Prevent circular reference loops
            seen.add(obj);
            
            if (Array.isArray(obj)) {
                return obj.length > 0 && obj.some(item => hasNonEmptyValues(item, seen));
            }
            
            return Object.values(obj).some(value => hasNonEmptyValues(value, seen));
        }

        return obj !== undefined && obj !== '';
    };

    const renderDiffValue = (baseValue, curationValue) => {
        const renderDiffObject = (base, curation) => {
            const diffResult = [];
            const allKeys = new Set([...Object.keys(base), ...Object.keys(curation)]);

            for (const key of allKeys) {
                const baseVal = base[key];
                const curationVal = curation[key];

                if (key in curation) {
                    // If the key is in curation, always show it as changed
                    diffResult.push(
                        <div key={`del-${key}`} style={{ backgroundColor: '#ffeef0' }}>
                            - {key}: {JSON.stringify(baseVal)}
                        </div>
                    );
                    diffResult.push(
                        <div key={`add-${key}`} style={{ backgroundColor: '#e6ffed' }}>
                            + {key}: {JSON.stringify(curationVal)}
                        </div>
                    );
                } else {
                    // If the key is not in curation, show it unchanged
                    diffResult.push(
                        <div key={`unchanged-${key}`}>
                            {key}: {JSON.stringify(baseVal)}
                        </div>
                    );
                }
            }

            return diffResult;
        };

        if (typeof baseValue === 'object' && baseValue !== null) {
            return (
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                    {renderDiffObject(baseValue, curationValue)}
                </pre>
            );
        } else {
            // For primitive values, show as changed if curationValue is defined
            if (curationValue !== undefined) {
                return (
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                        <div style={{ backgroundColor: '#ffeef0' }}>- {JSON.stringify(baseValue)}</div>
                        <div style={{ backgroundColor: '#e6ffed' }}>+ {JSON.stringify(curationValue)}</div>
                    </pre>
                );
            } else {
                return <pre style={{ margin: 0 }}>{JSON.stringify(baseValue)}</pre>;
            }
        }
    };

    const renderCurationData = (base, curation) => (
        <Descriptions 
            bordered 
            column={1} 
            size="small"
            labelStyle={{ width: '150px', minWidth: '150px', padding: '8px 16px' }}
        >
        {hasNonEmptyValues(curation.comment) && <Item label="Comment">{curation.comment}</Item>}
        {hasNonEmptyValues(curation.purl) && <Item label="Package URL (PURL)">{renderDiffValue(base.purl, curation.purl)}</Item>}
        {hasNonEmptyValues(curation.cpe) && <Item label="CPE">{renderDiffValue(base.cpe, curation.cpe)}</Item>}
        {hasNonEmptyValues(curation.authors) && <Item label="Authors">{renderDiffValue(base.authors, curation.authors)}</Item>}
        {hasNonEmptyValues(curation.concludedLicense) && <Item label="Concluded License">{renderDiffValue(base.concludedLicense, curation.concludedLicense)}</Item>}
        {hasNonEmptyValues(curation.description) && <Item label="Description">{renderDiffValue(base.description, curation.description)}</Item>}
        {hasNonEmptyValues(curation.homepageUrl) && <Item label="Homepage">{renderDiffValue(base.homepageUrl, curation.homepageUrl)}</Item>}
        {hasNonEmptyValues(curation.binaryArtifact) && <Item label="Binary Artifact">{renderDiffValue(base.binaryArtifact, curation.binaryArtifact)}</Item>}
        {hasNonEmptyValues(curation.sourceArtifact) && <Item label="Source Artifact">{renderDiffValue(base.sourceArtifact, curation.sourceArtifact)}</Item>}
        {hasNonEmptyValues(curation.vcs) && <Item label="VCS Info">{renderDiffValue(base.vcs, curation.vcs)}</Item>}
        {hasNonEmptyValues(curation.isMetadataOnly) && <Item label="Is Metadata Only">{renderDiffValue(base.isMetadataOnly, curation.isMetadataOnly)}</Item>}
        {hasNonEmptyValues(curation.isModified) && <Item label="Is Modified">{renderDiffValue(base.isModified, curation.isModified)}</Item>}
        {hasNonEmptyValues(curation.declaredLicenseMapping) && <Item label="Declared License Mapping">{renderDiffValue(base.declaredLicenseMapping, curation.declaredLicenseMapping)}</Item>}
        {hasNonEmptyValues(curation.sourceCodeOrigins) && <Item label="Source Code Origins">{renderDiffValue(base.sourceCodeOrigins, curation.sourceCodeOrigins)}</Item>}
        </Descriptions>
    );

    const renderCurationContent = (curationResult, index) => (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {renderCurationData(curationResult.base, curationResult.curation, index)}
        </Space>
    );

    const items = curations.map((curationResult, index) => ({
        key: index,
        label: `Curation ${index + 1}`,
        children: renderCurationContent(curationResult, index)
    }));

    // Create an array of all item keys to use as defaultActiveKey
    const allKeys = items.map(item => item.key);

    return (
        <div>
        <Text>Total curations: {curations.length}</Text>
        <Collapse 
            size="small" 
            ghost 
            defaultActiveKey={allKeys} 
            items={items}
            aria-label="Package curations list"
        />
        </div>
    );
};

PackageCurations.propTypes = {
    curations: PropTypes.arrayOf(PropTypes.shape({
        base: PropTypes.object,
        curation: PropTypes.object
    })).isRequired
};

export default PackageCurations;