import React from 'react';
import { Collapse, Descriptions, Typography, Space, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Descriptions;
const { Text, Link } = Typography;

const PackageCurations = ({ curations }) => {
    console.log('Curations received:', curations);

    if (!curations || curations.length === 0) {
        return <Text>No curations available for this package.</Text>;
    }

    const hasNonEmptyValues = (obj) => {
        if (!obj || typeof obj !== 'object') return false;
        return Object.entries(obj).some(([key, value]) => {
        if (key === 'hash' && typeof value === 'object') {
            return value.algorithm && value.value;
        }
        return value !== null && value !== undefined && value !== '' &&
            !(Array.isArray(value) && value.length === 0) &&
            !(typeof value === 'object' && Object.keys(value).length === 0);
        });
    };

    const renderRemoteArtifact = (artifact) => {
        if (!artifact) return null;
        return (
        <>
            {artifact.url && <div>URL: <Link href={artifact.url} target="_blank">{artifact.url}</Link></div>}
            {artifact.hash && artifact.hash.value && <div>Hash: {artifact.hash.algorithm}: {artifact.hash.value}</div>}
        </>
        );
    };

    const renderVcsInfo = (vcs) => {
        if (!vcs) return null;
        return (
        <>
            {vcs.type && <div>Type: {vcs.type}</div>}
            {vcs.url && <div>URL: <Link href={vcs.url} target="_blank">{vcs.url}</Link></div>}
            {vcs.revision && <div>Revision: {vcs.revision}</div>}
            {vcs.resolvedRevision && <div>Resolved Revision: {vcs.resolvedRevision}</div>}
            {vcs.path && <div>Path: {vcs.path}</div>}
        </>
        );
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

    const renderCurationData = (base, curation, index) => (
        <Descriptions 
            bordered 
            column={1} 
            size="small"
            labelStyle={{ width: '150px', minWidth: '150px', padding: '8px 16px' }}
        >
        {curation.comment && <Item label="Comment">{curation.comment}</Item>}
        {curation.purl && <Item label="Package URL (PURL)">{renderDiffValue(base.purl, curation.purl)}</Item>}
        {curation.cpe && <Item label="CPE">{renderDiffValue(base.cpe, curation.cpe)}</Item>}
        {curation.authors && <Item label="Authors">{renderDiffValue(base.authors, curation.authors)}</Item>}
        {curation.concludedLicense && <Item label="Concluded License">{renderDiffValue(base.concludedLicense, curation.concludedLicense)}</Item>}
        {curation.description && <Item label="Description">{renderDiffValue(base.description, curation.description)}</Item>}
        {curation.homepageUrl && <Item label="Homepage">{renderDiffValue(base.homepageUrl, curation.homepageUrl)}</Item>}
        {hasNonEmptyValues(curation.binaryArtifact) && <Item label="Binary Artifact">{renderDiffValue(base.binaryArtifact, curation.binaryArtifact)}</Item>}
        {hasNonEmptyValues(curation.sourceArtifact) && <Item label="Source Artifact">{renderDiffValue(base.sourceArtifact, curation.sourceArtifact)}</Item>}
        {hasNonEmptyValues(curation.vcs) && <Item label="VCS Info">{renderDiffValue(base.vcs, curation.vcs)}</Item>}
        {curation.isMetadataOnly !== undefined && <Item label="Is Metadata Only">{renderDiffValue(base.isMetadataOnly, curation.isMetadataOnly)}</Item>}
        {curation.isModified !== undefined && <Item label="Is Modified">{renderDiffValue(base.isModified, curation.isModified)}</Item>}
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