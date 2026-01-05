# Introduction

The OSS Review Toolkit (ORT) is a FOSS policy automation and orchestration toolkit that you can use to manage your (open source) software dependencies in a strategic, safe and efficient manner.

## Features

You can use ORT to:

* Generate CycloneDX, SPDX SBOMs, or custom FOSS attribution documentation for your software project
* Automate your FOSS policy using risk-based Policy as Code to do licensing, security vulnerability, InnerSource and engineering standards checks for your software project and its dependencies
* Create a source code archive for your software project and its dependencies to comply with certain licenses or have your own copy as nothing on the internet is forever
* Correct package metadata or licensing findings yourself, using InnerSource or with the help of the FOSS community

ORT can be used as a library (for programmatic use), via a command line interface (for scripted use), or via its CI integrations.
It consists of the following tools which can be combined into a *highly customizable* pipeline:

* [*Analyzer*](reference/cli/analyzer.md) - determines the dependencies of projects and their metadata, abstracting which package managers or build systems are actually being used.
* [*Downloader*](reference/cli/downloader.md) - fetches all source code of the projects and their dependencies, abstracting which Version Control System (VCS) or other means are used to retrieve the source code.
* [*Scanner*](reference/cli/scanner.md) - uses configured source code scanners to detect license / copyright findings, abstracting the type of scanner.
* [*Advisor*](reference/cli/advisor.md) - retrieves security advisories for used dependencies from configured vulnerability data services.
* [*Evaluator*](reference/cli/evaluator.md) - evaluates custom policy rules along with custom license classifications against the data gathered in preceding stages and returns a list of policy violations, e.g. to flag license findings.
* [*Reporter*](reference/cli/reporter.md) - presents results in various formats such as visual reports, Open Source notices or Bill-Of-Materials (BOMs) to easily identify dependencies, licenses, copyrights or policy rule violations.
* [*Notifier*](reference/cli/notifier.md) - sends result notifications via different channels (like emails and / or JIRA tickets).

## Documentation system

ORT documentation is organized using the following [system][documentation-system]:

- *Getting Started* - Begin here if you are new to ORT.
  - [Installing ORT](getting-started/installation.md)
- *Tutorials* - Learn via practical, step-by-step guides.
  - FIXME
- *How-to guides* - Helps you accomplish things, such as:
  - [How to exclude dirs, files or scopes from scans](how-to-guides/how-to-exclude-dirs-files-or-scopes.md)
  - [How to correct found licenses](how-to-guides/how-to-correct-licenses.md)
  - [How to generate SBOMs and custom reports](how-to-guides/how-to-generate-sboms-and-custom-reports.md)
- *Reference* - Consult the reference to find CLI parameters.
  - [ORT CLI reference](reference/cli/index.md)
  - [ORT Helper CLI reference](reference/cli/orth.md)
- *Explanation* - Deepen your understanding of ORT key concepts.
  - [Types of licenses](explanation/types-of-licenses.md)

## Design principles

- **No build plugins** - FIXME
- **Plugin architecture** - FIXME
- **Sensible defaults** - FIXME
- **Accuracy over speed** - FIXME
- **Based on open standards** - FIXME
- **Traceability and auditability**- FIXME
- **Transparent configuration** - Keep all rules, classifications, and risk thresholds in human-readable,
  version-controlled configuration to support review and (Git-based) change control.

## Comparison with other tools

FIXME

## Staying informed

- [GitHub]
- [Slack]
- [ORT weekly meeting][ort-weekly-meeting]
- [LinkedIn]

## Something missing?

If you find issues with the documentation or have suggestions on how to improve the documentation or the project in general, please [file an issue][ort-github-issues] for us, or send a message on *general* channel on our [Slack].

For new feature requests, please review the existing [GitHub issues][ort-github-issues] before creating a new one. Refrain from making a Pull Request for large new features without [talking to us first][Slack]. This helps us agree on features together, incorporate them into our [roadmap], and prevent duplicated efforts.

[documentation-system]: explanation/documentation-system
[GitHub]: https://github.com/oss-review-toolkit/ort
[LinkedIn]: https://www.linkedin.com/company/oss-review-toolkit
[ort-github-issues]: https://github.com/oss-review-toolkit/ort/issues
[ort-weekly-meeting]: https://github.com/oss-review-toolkit/ort/wiki/ORT-Weekly-Meeting
[roadmap]: https://github.com/orgs/oss-review-toolkit/projects/3/views/1
[Slack]: http://slack.oss-review-toolkit.org/
