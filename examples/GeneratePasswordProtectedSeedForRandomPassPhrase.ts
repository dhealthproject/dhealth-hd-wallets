import {MnemonicPassPhrase} from "@dhealth/hd-wallets";

const mnemonic = MnemonicPassPhrase.createRandom();
const secureSeedHex = mnemonic.toSeed('your-password');
