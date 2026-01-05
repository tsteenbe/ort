# Evaluator Rules

The `evaluator.rules.kts` file allows you to define custom policy rules that automatically apply to ORT results.

## File format

The `evaluator.rules.kts` file uses a Kotlin-based DSL, see below [related resources](#related-resources) for details.

## Command line

To use a `*.rules.kts` file, put it to `$ORT_CONFIG_DIR` directory or pass it via the `--rules-file` option to the [ORT Evaluator](../cli/evaluator.md).

```shell
cli/build/install/ort/bin/ort evaluate \
  -i <scanner-output-dir>/scan-result.yml \
  -o <evaluator-output-dir> \
  --license-classifications-file $ORT_CONFIG_DIR/license-classifications.yml \
  --package-curations-dir $ORT_CONFIG_DIR/curations  \
  --rules-file $ORT_CONFIG_DIR/evaluator.rules.kts
```

Alternatively, you can also use the ORT docker image.

```shell
docker run ghcr.io/oss-review-toolkit/ort evaluate \
  -i <scanner-output-dir>/scan-result.yml \
  -o <evaluator-output-dir> \
  --license-classifications-file $ORT_CONFIG_DIR/license-classifications.yml \
  --package-curations-dir $ORT_CONFIG_DIR/curations  \
  --rules-file $ORT_CONFIG_DIR/evaluator.rules.kts
```

## Related resources

- Examples
  - [examples/example.rules.kts](https://github.com/oss-review-toolkit/ort/blob/main/examples/example.rules.kts)
  - [evaluator/src/main/resources/rules/osadl.rules.kts](https://github.com/oss-review-toolkit/ort/blob/main/evaluator/src/main/resources/rules/osadl.rules.kts)
  - [evaluator.rules.kts within the ort-config repository](https://github.com/oss-review-toolkit/ort-config/blob/main/evaluator.rules.kts)
- How-to guides
  - [How to define multiple policies](../../how-to-guides/how-to-define-multiple-policies.md)
- Tutorials
  - FIXME
- Reference
  - [ORT Evaluator CLI](../cli/evaluator.md)
