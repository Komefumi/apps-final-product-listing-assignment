# Apps Final Product Listing Assignment

[Live Site](https://affectionate-wozniak-0d9d9b.netlify.app/)

## Summarized

This is an application built on NextJS, and is a shopify-polaris based web app.
It features data pulled from fakestoreapi.com, with necessary fields generated at run time.

It features fully working filtering capabilities.

### Feature Set (Non-Exhaustive)

1. TypeScript throughout
1. Utilizes scss (where necessary, custom styling in relatively less)
1. State is managed with redux, and utilizes redux-toolkit
1. Fixture data is fetched but necessary additional fields are generated; randomization functions are crafted and utilized for this purpose
1. Fully working filters - necessary data on which filtering takes place is also generated
1. Mutliple types of filters - There is the list filters, query string as filter, and also filtering by item's publication status (reflected as tab choices)
1. Network error on application loading triggers an appropriate modal notification.
1. Subtle loading indicator while data is fetched (after which it is instantaneously prepared)
1. Data is filtered by way of hooks. What would have otherwise been tedious is made manageable by usage of React hooks. Much logic is abstracted away,
   and hooks are also utilized to generate handlers that have the dispatch function returned by useDispatch (or useAppDispatch as often is the case with redux-toolkit once configured; it is the case here)
1. Maximized type safety
1. Code for state, utilities, types, and data are all segregated. There are reasonable sub-modules in each case, with importing from types to data (for instance) being something done as is necessary - such as data/derived utilizing values from types/data (enums are an easy use case for such cross-module importing where one might want to derive a list of possible values from the enum)
1. Components are segregated into ui and non-ui variants (by way of modules within the higher level components module)
1. Props are placed in types/prop-types and imported as necessary

### Where Things Could Improve

1. **Complexity** - It may be possible to reduce complexity. Some work would need to be done to identify places where refactoring may take place
1. **Making state code DRY** - Currently there is some level of repitition involved in state code, primarily in that of list type filters. This makes bugs more likely and require repitition to add identical filters in future. Nonetheless, to extent repeating patterns are extracted. Further work could be done to reduce repitition, which is itself hard to avoid when utilizing redux
1. **Dead Code** - There is likely some amount of dead code that requires to be eliminated
1. **UI Improvements** - UI could likely be tweaked and improved
1. **Consistent use of Polaris Components** - Since this could be considered a Polaris project, it might be more idiomatic to use components exported by Shopify-Polaris where possible
