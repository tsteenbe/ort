# How to generate SBOMs

## Prerequisites

Before you begin, make sure you have the following:

1. ORT is correctly [installed on your system][installation].
2. Save [npm-mime-types-2.1.26-scan-result.json][npm-mime-types-2.1.26-scan-result-json] on your local system.


## Generating Cyclone and SPDX SBOMs

```
ort report \
  -i npm-mime-types-2.1.26-scan-result.json \
  -o . \
  -f CycloneDX,SPDXDocument
```

## Generating a CycloneDX SBOM version 1.5 instead of default 1.6

```
ort report \
  -i npm-mime-types-2.1.26-scan-result.json \
  -o . \
  -f CycloneDX \
  -O CycloneDX=schema.version=json,xml
```

## Generating a CycloneDX SBOM using all options

```
ort report \
  -i npm-mime-types-2.1.26-scan-result.json \
  -o . \
  -f CycloneDX
  -O CycloneDX=output.file.formats=json,xml
```

## Generating a SPDX SBOM version 2.2 instead of default 2.3

```
ort report \
  -i npm-mime-types-2.1.26-scan-result.json \
  -o . \
  -f SpdxDocument \
  -O SpdxDocument=spdx.version=SPDX_VERSION_2_2
```

## Generating a SPDX SBOM using all options

```
ort report
  -i npm-mime-types-2.1.26-scan-result.json \
  -o . \
  -f SpdxDocument \
  -O SpdxDocument=data.license="LicenseRef-proprietairy-example-inc" \
  -O SpdxDocument=creation.info.comment="A mime types SBOM generated using ORT." \
  -O SpdxDocument=creation.info.person="John Doe <john.doe@example.com>" \
  -O SpdxDocument=creation.info.organization="Example Inc." \
  -O SpdxDocument=document.name="Mime Types 2.1.26" \
  -O SpdxDocument=document.comment="SBOM generated to learn ORT." \
  -O SpdxDocument=file.information.enabled=true \
  -O SpdxDocument=output.file.formats=json,yaml \
  -O SpdxDocument=spdx.version=SPDX_VERSION_2_2
```

## Related resources

- Code
  - [plugins/reporters/cyclonedx/src/main/kotlin/CycloneDxReporter.kt](https://github.com/oss-review-toolkit/ort/blob/main/plugins/reporters/cyclonedx/src/main/kotlin/CycloneDxReporter.kt)
  - [plugins/reporters/spdx/src/main/kotlin/SpdxDocumentReporter.kt](https://github.com/oss-review-toolkit/ort/blob/main/plugins/reporters/spdx/src/main/kotlin/SpdxDocumentReporter.kt)
- Reference
  - [ORT Reporter CLI](../cli/reporter.md)

[installation]: ../getting-started/installation.md
[npm-mime-types-2.1.26-scan-result-json]: https://raw.githubusercontent.com/oss-review-toolkit/orthw-shell/refs/heads/main/examples/npm-mime-types-2.1.26-scan-result.json
