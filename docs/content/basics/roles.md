---
archetype: Page
title: Roles
weight: 10
---

## Basic roles

The mission of this quasi-blockchain is to provide decentralized computation on demand, in exchange of energy credits.  
Basic roles are those directly involved in this process. Ideally, if no malicious actor was involved, this minimal architecture would be sufficient for a functional network.

### Requester

Requesters are responsible to prepare partial jobs, to be later picked and accepted by any worker (subject to conditions), or to submit it to a specific one.

### Worker

Workers can either look for and accept jobs, or wait for requesters to submit theirs. Workers are generally meant to accept a trade involving some quantity of a token for the promise of resolving computational tasks assigned by the requester. The specifications of such tasks were fully defined before they are accepted.

### Token provider

Token providers are nodes applying centralized control over tokens they mint and distribute. Anyone can create and handle their own on the network, but public services are expected to operate via credit tokens for most activities.  
Tokens are also used to determine the score of different nodes on the network, like assigning blaming or reviews to their service.  
As a token provider, a node must be able to handle a considerable amount of traffic, since they are involved in many steps of signing contracts between requesters and workers. They are also responsible to provide support for consensus mechanisms on those transactions handled by them.

## Consensus roles

In order to ensure safety and robustness on a network level, there are few more roles which can play a central role. While they are not directly involved in the execution of contracts between requesters and workers, they are needed to preserve memory and ensure everyone abides to the same rules.

### Withness

When any operation is executed on the network, its public content is broadcasted to withnesses for it to be observed and potentially stored. This is helpful on two levels:

- It allows other nodes to ask for information about their past history in case they are not always online, and their local database has been lost.
- It allows to test the behaviour of centralized nodes like token providers against those rules they should follow.

Withnesses are under no obligation to record data. They can selectively decide what to preserve, and different withnesses can be fed with a different amount of information in case transactions are not fully public. There is no further incentive to be a withness other than preserving the network.

## Utility nodes

### Oracle

A trusted source of information from the outside world. Like energy price, or the release of new models to be used by workers.

### Market matcher

A node specifically meant to submit job requests to workers on behalf of requesters, or accept work requests on behalf of workers.

### Proxy

A node used to hide the identity of an original requester (or workers in a more complex version supporting pooling).
