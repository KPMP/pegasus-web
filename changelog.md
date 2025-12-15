# Changelog

## Release 3.2 (unreleased)
Brief summary:

### Breaking changes:

---

## Release 3.1
Brief summary:

- Add protein sorting in diffex tables
- Fixed issue with gene expression tables not showing up for some UMAPs

---

## Release 3.0 (11/13/2025)
Brief summary: 
- Add new endpoints to retrieve new Single-Cell & Single-Nuc data
- Implement feature switch to enable new data API calls
- Fix Regional Proteomics/Transcriptomics Plot Labels
- Add new SC & SN UMAPs
- Update footers for dataViz & celltypesummary pages
- Replace Material Table library

### Breaking changes
- some calls to endpoints and to new page flow hardcoded for time constraints

---

## Release 2.8 (6/30/2025)
Brief summary:
- update to common components to get new help menu options
- updates to the -omics type table to include more data and be more data driven

### Breking changes
n/a

---

## Release 2.7 (SKIPPED)
We are skipping this release version to keep the release version numbers more in sync with one another

---

## Release 2.6 (12/19/2024)
Brief summary:
- Fix bug in the tubule schematic
- update backend variable names to be in line with new nomenclature
- Added Collaborator Sites section on home page

### Breaking changes
n/a

---

## Release 2.5 (10/10/2024)
Brief summary of what's in this release:
- updated to use 'enrollmentCategory' instead of 'tissueType' in variables
- updated code to call new graphql endpoints (because of renames)
- added new section to the Atlas home page
- updated kpmp-common-components to get new menu items

### Breaking changes
This won't work with previous versions of pegasus-data because the names and structure of underlying graphql queries have been updated

-----

## Release 2.4 (released 07/08/2024)
Brief summary of what's in this release:
- fix minor overlay issue in Explorer when gene not found
- added new "All" column to Atlas home page and Explorer home page tables

### Breaking changes

Breaking changes include any database updates needed, if we need to edit any files on system (like .env or certs, etc). Things that are outside of the code itself that need changed for the system to work.


### Non-breaking changes

Just a place to keep track of things that have changed in the code that we may want to pay special attention to when smoke testing, etc.
