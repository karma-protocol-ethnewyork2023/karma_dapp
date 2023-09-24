![zkbellma](https://github.com/karma-protocol-ethnewyork2023/karma_dapp/assets/75651834/5bd3da52-4972-45bf-9477-66c0572e3c3b)

## ZK BELLMAN FORD(Karma Protocol) - Proof of Networking

### Introduction

In the evolving Web 3 space, Telegram is the favored messenger for professional networking. Typically, participants at events exchange contact details via QR codes on the platform. However, after events, recalling specific contacts or tracing mutual connections becomes a daunting task, often leading to missed investment or collaboration opportunities. Karma Protocol addresses this by introducing a dApp that not only incentivizes networking with token rewards but also employs a graph search algorithm to facilitate easier connections.

### The Challenge

While Telegram is instrumental for communication, it isn't optimized for professional networking. It's cumbersome to review contacts and visualize the interconnected web of professional relationships, constraining the potential to unearth new opportunities or collaborations.

### Objective

-   **Enhance Telegram's User Experience**: Modify the QR code feature to offer a holistic view of one's professional network.
-   **Token Rewards**: Offer incentives for QR code exchanges at Web3-centric events, with two distinct reward mechanisms:
    -   **Passive Mode**: For real-world connections. Rewards are disbursed to intermediary nodes between two connecting individuals.
    -   **Active Mode**: If a user wishes to connect with a potential investor or collaborator via a mutual contact, our interface showcases the shortest connection paths. The rewards are proportional to the proximity of the mutual contact.
-   **Graph Search Algorithm**: Given the computational intensity of the Shortest Path graph search algorithm, we execute its operations off-chain. We've innovated with the zk dijkstra algorithm to ensure timely off-chain token reward disbursements.
