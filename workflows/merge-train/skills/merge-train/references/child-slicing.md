# Child Slicing

Child PRs exist to make review reliable, not to maximize ceremony. Split only when the parent diff is too large, risky, or conceptually mixed for fresh reviewers to reason about as one change.

## Split When

- Multiple independent concepts are present.
- More than one ownership boundary is touched.
- Auth, security, data, public APIs, shared abstractions, migrations, background jobs, or build/test config are mixed with other work.
- The parent diff is large enough that reviewers are likely to miss integration issues.
- Files are touched repeatedly by unrelated changes.

## Prefer Slices That

- tell one coherent story,
- can be audited independently,
- have a clear risk class,
- minimize overlapping files,
- integrate into the parent without repeatedly rewriting the same surface,
- preserve parent branch buildability after each merge.

## Avoid Slices That

- are layer-only when behavior crosses layers,
- split tests away from implementation,
- create child PRs that cannot pass checks alone,
- force reviewers to reconstruct parent intent from many fragments,
- hide high-risk surfaces inside a broad "misc" child.

## Output

For each child, record:

- title,
- risk class,
- files likely touched,
- parent-intent excerpt,
- test/predicate commands,
- verifier requirements,
- integration checkpoint trigger status.
