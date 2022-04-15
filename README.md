# @dhealth/hd-wallets

[![npm version](https://badge.fury.io/js/@dhealth%2Fhd-wallets.svg)][npm]
[![Discord](https://img.shields.io/badge/chat-on%20discord-green.svg)][discord]

Hierarchical-deterministic (HD) wallets generator library for [dHealth Network](https://dhealth.network).

**NOTE**: The author of this package cannot be held responsible for any loss of money or any malintentioned usage forms of this package. Please use this package with caution.

## Requirements

- Node.js 12 LTS

## Installation

`npm install @dhealth/hd-wallets`

## Usage

### Generating a mnemonic pass phrase

```ts
// examples/GeneratingAMnemonicPassPhrase.ts

import {MnemonicPassPhrase} from "@dhealth/hd-wallets";

// random 24-words mnemonic
MnemonicPassPhrase.createRandom();

// random 12-words mnemonic
MnemonicPassPhrase.createRandom('english', 128);

// random 24-words mnemonic with french wordlist
MnemonicPassPhrase.createRandom('french');

// random 24-words mnemonic with japanese wordlist
MnemonicPassPhrase.createRandom('japanese');

```

### Generating a password-protected mnemonic pass phrase seed (for storage)

```ts
// examples/GeneratePasswordProtectedSeedForRandomPassPhrase.ts

import {MnemonicPassPhrase} from "@dhealth/hd-wallets";

const mnemonic = MnemonicPassPhrase.createRandom();
const secureSeedHex = mnemonic.toSeed('your-password');

```

```ts
// examples/GeneratePasswordProtectedSeedForRandomPassPhraseEmptyPassword.ts

import {MnemonicPassPhrase} from "@dhealth/hd-wallets";

// Example 2: empty password for password-protected seed
const mnemonic = MnemonicPassPhrase.createRandom();
const secureSeedHex = mnemonic.toSeed(); // omit password means empty password: ''

```

### Generating a root (master) extended key

```ts
// examples/GeneratingARootMasterExtendedKeyForKnownPassPhrase.ts

import {MnemonicPassPhrase} from "@dhealth/hd-wallets";

// Example 2: generate BIP32 master seed for known pass phrase
const words = 'alpha pattern real admit vacuum wall ready code '
    + 'correct program depend valid focus basket whisper firm '
    + 'tray fit rally day dance demise engine mango';
const mnemonic = new MnemonicPassPhrase(words);

// the following seed can be used with `ExtendedKey.createFromSeed()`
const bip32Seed = mnemonic.toSeed(); // using empty password

```

```ts
// examples/GeneratingARootMasterExtendedKeyForRandomPassPhrase.ts

import {MnemonicPassPhrase} from "@dhealth/hd-wallets";

// Example 1: generate BIP32 master seed for random pass phrase
const mnemonic = MnemonicPassPhrase.createRandom();
const bip32Seed = mnemonic.toSeed();

```

### Generating a HD wallet (SYMBOL **mijin** and **mijinTest** compatible)

```ts
// examples/GeneratingAHDWalletPrivateNetworkCompatible.ts

import {NetworkType} from '@dhealth/sdk';
import {ExtendedKey, Network, Wallet} from "@dhealth/hd-wallets";

const xkey = ExtendedKey.createFromSeed('000102030405060708090a0b0c0d0e0f', Network.SYMBOL);
const wallet = new Wallet(xkey);

// get master account
const masterAccount = wallet.getAccount();

// get DEFAULT ACCOUNT
const defaultAccount = wallet.getChildAccount();

// derive specific child path
const childAccount = wallet.getChildAccount('m/44\'/4343\'/0\'/0\'/0\'', NetworkType.MIJIN_TEST);

// get read-only wallet
const readOnlyWallet = new Wallet(xkey.getPublicNode());
const readOnlyAccount = readOnlyWallet.getPublicAccount(NetworkType.MIJIN_TEST);

// get read-only DEFAULT ACCOUNT
const readOnlyDefaultAccount = readOnlyWallet.getChildPublicAccount();

```

### Generating a HD wallet (SYMBOL **public** and **publicTest** compatible)

```ts
// examples/GeneratingAHDWalletPublicNetworkCompatible.ts

import {NetworkType} from '@dhealth/sdk';
import {ExtendedKey, Network, Wallet} from "@dhealth/hd-wallets";

const xkey = ExtendedKey.createFromSeed('000102030405060708090a0b0c0d0e0f', Network.SYMBOL);
const wallet = new Wallet(xkey);

// get master account
const masterAccount = wallet.getAccount();

// get DEFAULT ACCOUNT
const defaultAccount = wallet.getChildAccount();

// derive specific child path
const childAccount = wallet.getChildAccount('m/44\'/4343\'/0\'/0\'/0\'', NetworkType.TEST_NET);

// get read-only wallet
const readOnlyWallet = new Wallet(xkey.getPublicNode());
const readOnlyAccount = readOnlyWallet.getPublicAccount(NetworkType.TEST_NET);

// get read-only DEFAULT ACCOUNT
const readOnlyDefaultAccount = readOnlyWallet.getChildPublicAccount();

```

### Signing with a HD wallet (SYMBOL compatible)

```ts
// examples/SigningWithAHDWalletPrivateNetworkCompatible.ts

import {Account, Deadline, EmptyMessage, NetworkType, TransferTransaction} from "@dhealth/sdk";
import {ExtendedKey, Network, Wallet} from "@dhealth/hd-wallets";

const xkey = ExtendedKey.createFromSeed('000102030405060708090a0b0c0d0e0f', Network.SYMBOL);
const wallet = new Wallet(xkey);

// derive specific child path
const childAccount = wallet.getChildAccount('m/44\'/4343\'/0\'/0\'/0\'', NetworkType.TEST_NET);

// create a transfer object
const transfer = TransferTransaction.create(
    Deadline.create(),
    Account.generateNewAccount(NetworkType.TEST_NET).address,
    [],
    EmptyMessage,
    NetworkType.TEST_NET);

// sign the transaction with derived account
const generationHash = ''; // replace with network generation hash
const signedTx = childAccount.sign(transfer, generationHash);

```
## Getting help

Use the following available resources to get help:

- [dHealth Documentation][docs]
- [Package Documentation][self-docs]
- Join the community on [Discord][discord] 
- If you found a bug, [open a new issue][issues]

## Contributing

Contributions are welcome and appreciated. 
Check [CONTRIBUTING](CONTRIBUTING.md) for information on how to contribute.

## License

Copyright (c) 2019-2020, Grégory Saive for NEM.
Copyright (c) 2021-present, Grégory Saive for dHealth Network, All rights reserved.

Licensed under the [BSD-2 License](LICENSE).

[self]: https://github.com/dhealthproject/dhealth-hd-wallets
[self-docs]: https://dhealthproject.github.io/dhealth-hd-wallets/1.1.3
[npm]: https://www.npmjs.com/package/@dhealth/hd-wallets
[docs]: https://docs.dhealth.com
[issues]: https://github.com/dhealthproject/dhealth-hd-wallets/issues
[discord]: https://discord.gg/P57WHbmZjk
