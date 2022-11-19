---
archetype: Page
title: Resolution
weight: 30
---

Resolution is the event handled by a token provider during which all tokens locked by all parties in a transaction are unlocked and reassigned according to the resolution rules.  
As part of the transaction, there is an upper limit for resolution, but the token provider is allowed to perform this event earlier.

The interval of time between execution and resolution of a transaction is needed to ensure there is enough time for consensus to take place. Consensus does not have strict time constraints; as such it is usually delegated to cheaper workers, which are often providing less intensive computational services.  
Consensus is an opt-in feature for the token provider, but if performed its action will be transparent and appendend to the transaction.

## Resolution model

The action taken by a token provider as part of a resolution event, depends on the instructions given in the transaction. In principle each token provider could provide its own language to write such program, and this is possibly needed in more complex scenarios.

### Scenarios

A resolution model is described a list of scenarios. For each scenario a score is evaluated. The scenario with the lowest score is selected. Amongst multiple scenario with the same score, the one appearing earlier in the list is selected.  
A scenario is defined by the following elements:

- A set of parameters based on external information.
- A set of preconditions for the scenario to be accepted.
- An optional score function.
- A flow vector describing how the locked token is going to be distributed.
