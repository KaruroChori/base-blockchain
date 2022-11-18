---
archetype: Page
title: Transactions
weight: 20
---

At a protocol level, there are two supported kinds of transactions allowed. This page will discuss both of them. Further details can be found by consulting the relative json schemas.

## Account checkpoint

An account checkpoint is a transaction used to certify the current balance of a token for a specific address. This way, all prior checkpoints can be considered obsolete and disposed by all parties. Transactions which are still in their resolution windows should still be preserved by withnesses and the involved parties.  
A checkpoint must provide the current unbound value available on the wallet, and the hashes of all amounts which have been locked, still waiting for resolution. Listing locked amounts which have been resolved already is technically valid, but the token provider might decide not to sign a checkpoint for which some resolved events are too old, to avoid storing their detailed information forever.  
Every checkpoint does also include the timestamp of its generation to decide which one is to be considered as not obsolete.

To be valid, a checkpoint requires a double signature, one from the token provider and the other one from the referenced address.

## Full 2-parties transaction
