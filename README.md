# phoebe-project.org

phoebe-project.org is a single-page ReactJS website, with documentation content dynamically pulled and rendered from the [phoebe2-docs repository](http://github.com/phoebe-project/phoebe2-docs).

## Dependencies

see [installing node and npm on Ubuntu](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/)

  * node
  * npm


## Serving locally

In the root directory, issue:

```
npm install
```

to install local dependencies, and then:

```
npm start
```

to create a local webserver running the site.


## Deploying

### GitHub pages

In the root directory, issue:

```
npm run deploy
```

will need to provide github username and password (api token) 2-3 times.  This
will build the website and commit and push to the `gh-pages` branch.  It may take
a few minutes before those changes then go live.


To serve to a separate URL, edit the entry in [CNAME](./public/CNAME), the value of homepage in [package.json](./package.json), and follow the [github instructions](https://help.github.com/articles/using-a-custom-domain-with-github-pages/) to use a custom domain for pointing the DNS to github pages.

## General Notes on Layout/Conventions

* In general, each tab in the navigation bar has its own .jsx file in the [src](./src/) directory and exports the components required to [App.js](./src/App.js) which handles all routing.  

* The top navigation bar is not version-sticky (i.e. if you're on /docs/2.0 and click the install tab you will get the latest install instructions, not /install/2.0), but the buttons in the header and internal links on a given page are version-sticky (i.e. switching between tutorials and example scripts remembers your documentation version).

* Please use the internal `Link` or `NavLink` (for the navigation bar) component from [common.jsx](./src/common.jsx) instead of adding html `<a>` tags manually.  This way internal vs external links are handled correctly by the component.

* Please use the internal `Image` component from [common.jsx](./src/common.jsx) instead of adding html `<img>` tags manually.  This makes sure to reference internal image sources correctly.

## Releasing a New Version of PHOEBE

Once a new MINOR/MAJOR version of PHOEBE (i.e. 2.1 or 3.0) is released on GitHub and pip, several steps need to be made to update the website.  PATCH versions (i.e. 2.1.1) do not need any action as everything is loaded dynamically from the sources on GitHub.

1. Update `docs_versions` in [docs.jsx](./src/docs.jsx) if the new version should shown in the docs switcher.  The first version listed in the list will be considered the "latest" release, and all internal links will now point to that version.  Make sure the correct branch exists in the [phoebe2-docs repository](http://github.com/phoebe-project/phoebe2-docs) and that the API docs are updated and pushed. See below for more details below about updating documentation on the website.

2. Create the content for the release page in [releases.jxs](./src/releases.jsx) inside the if-else logic in the `ReleaseContent` Component by updating the `content` and `logo` (if anything other than the default logo) variables (see existing releases for examples).

3. Create the entry for the corresponding release paper (if applicable, see below for more information).

4. Create a news entry item and pin to the homepage, if necessary (see below for more information).

## Updating Documentation

The PHOEBE 2 documentation sources displayed on the website are dynamically fetched from the [phoebe2-docs repository](http://github.com/phoebe-project/phoebe2-docs) and rendered from either the jupyter notebook or markdown file found in the branch corresponding to the requested version.  Updates to documentation should therefore be made to the [phoebe2-docs repository](http://github.com/phoebe-project/phoebe2-docs) and pushed (or open a Pull Request) to the correct branch.  API documentation is also pulled from the same repository, but must be manually updated from the corresponding release of PHOEBE.

Versions displayed in the version switcher are defined in [docs.jsx](./src/docs.jsx) under the `docs_versions` variable.  The list should be sorted from newest to oldest versions available, with the first entry (newest) being automatically redirected from all site-wide navigation links (i.e. /docs or /docs/latest).

## Updating News Entries

## Updating Publications

The list of publications is currently created manually in the `Publications` component in [publications.jsx](./src/publications.jsx).  For each entry, use the `Publication` component (see existing entries) which takes the following arguments: adsLink, authors, title, and release (optional - if provided, must match a valid release branch/tag).

## Workshops

Similar to the documentation, the workshop pages are dynamically fetched from the [phoebe2-workshop repository](http://github.com/phoebe-project/phoebe2-workshop) and rendered from the markdown files.  Updates to the workshop information or materials, should be made to the [phoebe2-workshop repository](http://github.com/phoebe-project/phoebe2-workshop) and pushed (or open a Pull Request) to the correct branch.  The name of the branch must match the name of the workshop URL (defined in the `workshops` variable in [workshop.jsx](./src/workshop.jsx)).

### Adding a New Workshop

Create a new branch (with the format "2018june") in the [phoebe2-workshop repository](http://github.com/phoebe-project/phoebe2-workshop) and update all necessary information (date, location, etc) for that workshop.  Once the information in the repository is up-to-date and ready to be made public, add an entry to the `active_workshops` variable in [workshop.jsx](./src/workshop.jsx) with the branch-name as the key and a brief description (with the format "June 2018, Villanova PA") as they value.  This will then add the workshop to the list of upcoming workshops and open the url with the same branch name.  Check to make sure all buttons in the header work, and push/deploy the changes.  Future changes to the branch will automatically update on the website.

### Archiving an Existing Workshop

Once a workshop is completed, the entry needs to be moved from the list of upcoming workshops to the list of archived workshops.  This will also change the buttons available in the header to show to workshop materials (with links to talks/videos/etc) instead of registration information.  To do this, make sure the branch in the [phoebe2-workshop repository](http://github.com/phoebe-project/phoebe2-workshop) is updated with all materials/talks/videos and move the relevant entry from the `active_workshops` variable to the `archived_workshops` variable in [workshop.jsx](./src/workshop.jsx).  Future changes to the branch will automatically update on the website (i.e. updating the materials/links/information).

### Changing the Buttons/Layout of Workshops

All workshops display the same buttons/format (with the exception of the change between an upcoming/active and an archived workshop).  If for some reason the needs for these buttons change, the source can be edited in the `WorkshopActive` and `WorkshopArchived` components in [workshop.jsx](./src/workshop.jsx).  Note that adding new buttons in the header may not work for previous archived versions if those markdown files do not exist - so make sure to either create the markdown files as necessary or to create necessary if-else logic to preserve the old archived versions.

## Adding a New Entry to the Navigation Bar

The navigation bar, persistent throughout the site, is defined in [navbar.jsx](./src/navbar.jsx).  If adding a new entry, look at the format of existing entries, an make sure to test the responsive behavior at different browser widths.  It may be necessary to change the visibility of some of the labels at the small and medium browser widths (see other entries for how to hide/shorten labels).

## React

See the [React README](README_REACT.md) for more information.
