---
archetype: Chapter
title: Basics
weight: 10
---

This page contains a general introduction about NAME. If you are specifically interest in any of the following topics, they are further detailed in specific pages.

## Roles

Nodes participating in the network are known by their **public key**, a long series of numbers acting as their name.  
For example, one of the nodes used by the author of this page is [this]().

Unlike names in the real world, the identity of a node is virtually impossible to be forged; this is thanks to cryptography, and an introductory explanation of how it works can be found [here](). There are multiple roles to be "played" on the network, and it is up to each user to decide which one to pick. The same node can fulfull more than one, possibly all if so desired.

- **Requester**: submitting computational tasks to NAME for token
- **Worker**: resolving computational tasks in exchange of token
- **Token** provider: bank-like nodes ensuring security in transactions between requesters and workers.
- **Withness**: external observer to check if token providers are behaving properly.
- **Oracle**: trusted source of information from inside and outside the network.
- **Market matcher**: facilitator to match requesters and workers availability.
- **Proxy**: mechanism to pool workers and make request more anonymous.

## Architectural features

This is a short list of the most important features of NAME:

- **Permission-less**: on a protocol level, there is no restriction for any node to participate with the role they prefer. Still, other nodes share the same freedoms as yours, so censorship is possible if enough people decides to implement the same black/white-listing approach.
- **Optimistic approach**. Consensus is an optional feature for a token provider to implement (yet a highly recommended one, unless you are handling trusted/private shards on the network). Consensus processes will be performed after the job linked to a transaction reached completion, in the cool-off period called _resolution_. This optimistic approach is common to many layer 2 solutions of traditional blockchains.
- **Fault-tolerant**. Not the network, but the user should be. Malicious actors are expected to have some limited success posing as fake workers. Consensus is expensive, as it requires computational tasks to be repeated, effectively making computation less cost efficient. There is a balance between this and the value lost due to _bad work_ to maintain the network in a sound state. Hence, users are expected to understand that the computation peformed by the network cannot be expected to be 100% accurate when public services are used.
- **Fault-tolerant**. Still, also the network is fault-tolerant at a global level. Token providers are centralized, and as such expected points of failures in this architecture; still, as long as proofs of transactions are kept, the last state can be always be restored. This is actually the main role of withnesses in the network.  
  As such, token providers acting in good faith and withnesses are enough to make the network globally fault-tolerant.
- **No value locked**. The network is not designed to be a holder of value. You could, but you probably should not. The assumption under which many design choices are considered _safe enough_ is that the overall balance in the entire NAME is as close to 0 as possible, with atomic transactions amounting to few cents each at most. This is to ensure most of the attack strategies are economically unfeasible or at least too boring and not rewarding enough to implement.
- **Delocalized**: the network is meant to be geographically decentralized. It is expected to integrate nodes from all over the world. However, due to their role, some nodes are expected to take a more central role than others. For this reason NAME is reported as delocalized and not decentralized.
- **Memory-less**: unlike most blockchains, this network is designed as time-invariant by using 0-knowledge proofs. There is only a limited number of past events waiting for resolution which must be preserved. Aside from those, no memory of past states is needed, which makes it extremely lightweight. This is crucial, since there are no financial incentives for withnesses to operate at a protocol level, and we cannot ask workers to waste their precious disk-space to store pointless information of past transactions.
- **Public**: the network is designed to be public. Otherwise it would not be possible to apply consensus mechanisms effectively. Still, private transactions are possible with a series of restrictions in a trusted context. This topic will be covered [here]().
