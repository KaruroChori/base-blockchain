---
archetype: Page
title: Transactions
weight: 20
---

At a protocol level, there are only few supported kinds of transactions allowed. This page will discuss both of them. Further details can be found by consulting the relative json schemas.

## Airdrops & Burning

For good or for worse, token providers have full control over their emission. This means that they can perform transactions for which tokens are airdropped and burned without involving other addresses in the process.  
For example, this is very much the case for those tokens used to measure karma/blaming values of different addresses. Otherwise, the other party might just refuse to sign the transaction in which they are assigned a negative score.

Still, just because these operations are technically possible, it does not mean each token provider is expected to implement them. In most cases which are involving a monetary value of the token, it is advisable they do not.

### Forced airdropping

```
/nihil/ -> PubKey[TokenKey] : value
TokenKey.Sign()
```

### Forced burning

```
PubKey[TokenKey] -> /nihil/ : value
TokenKey.Sign()
```

## Account checkpoint

An account checkpoint is a transaction used to certify the current balance of a token for a specific address. This way, all prior checkpoints can be considered obsolete and disposed by all parties storing them. Transactions which are still in their resolution windows shall be preserved by withnesses until completion.  
A checkpoint must provide the current unbound value available on the wallet, and the hashes of all amounts which have been locked, still waiting for resolution. Listing locked amounts which have been resolved already is technically valid, but the token provider might decide not to sign a checkpoint for which some resolved events are too old, to avoid storing their details forever.  
Every checkpoint does also include the timestamp of its generation to decide which one is to be considered as not obsolete.

To be valid, a checkpoint requires a double signature, one from the token provider and the other one from the referenced address.

```
PubKey[TokenKey] : value
... PubKey.ResolvingBlocks()
PubKey.Sign()
TokenKey.Sign()
```

## Full n-parties transaction

This is the most complex transaction model, and the one generally involved between workers and requesters.  
It is made of a transaction body, followed by sections to be filled-in and signed by all people participating.

The main body of the transaction contains the following information:

- The token used for this operation (the public key of the provider)
- Which addresses are going to be involved and meta-information about their role. The amount of token locked by each. The maximum timestamp the accept receipt must reach the token provider. The maximum timestamp the work-completed receipt must reach the token provider. There is no need to define a specific address: black/white-listing or specific elegibility conditions can be defined in their place.
- Metadata about the agreement in place (for example which operations must be performed by the worker)
- The id of the resolution block, where all actions defined in the metadata must be appended.
- The resolution strategy.

This partial transaction is notified to the involved parties, more or less publicly. Each of the parties must sign it, and return the signature to the token provider, alongside with the original body if it was not already stored in there.
