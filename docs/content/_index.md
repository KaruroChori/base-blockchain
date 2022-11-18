---
archetype: Home
title: Overview
---

These are the specifications for NAME, a quasi-blockchain optimized for micro-tasks of machine learning, distributed over a network of nodes.  
It can be used to provide computational support for many different applications on low power devices, to offload computation from geographic regions with a higher cost of energy, or to provide high burst performance to process batches of tasks, without the need of personal clusters which would be otherwise off most time.  
Here is a list of potential scenarios in which it can be used:

- Generation of images via prompts for models like [Stable Diffusion](https://github.com/CompVis/stable-diffusion) to be integrated in VR games or 3d modelling software.
- [Speech to text conversion](https://github.com/openai/whisper) in the context of human-machine interfaces on low power devices, i.e. a car assistant, or domotic systems.

NAME is referred as a quasi-blockchain because of its hybrid nature: as it will be discussed more in depth, there are some architectural choices preventing it from being a blockchain in the usual sense of the term; still, it inherits a lot of their design primitives over a more traditional p2p network.

The main compromise of NAME is what could be referred as _imperfect decentralization_; also, it is not meant to lock significant amount of money inside, and users are expected to tolerate some degree of _failures_ as part of a trade-off between speed, cost and security.  
Critical applications depending on the correctness of the results should not be based on NAME.

The most important constraint in the design of NAME is that it must satisfy a high volume of transactions with as little temporal overhead as possible in their execution; the dominating factor in time complexity should be the actual computation of the worker, not a consensus overhead.  
Still, decentralization and public auditing are important to ensure the wider security of the network.

## Scenario A

TBW
