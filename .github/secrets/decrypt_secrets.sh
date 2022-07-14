#!/bin/sh
set -eo pipefail

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/EatchCICD.mobileprovision ./.github/secrets/EatchCICD.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/ios_distribution.cer ./.github/secrets/ios_distribution.cer.gpg

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles

cp ./.github/secrets/EatchCICD.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/EatchCICD.mobileprovision


security create-keychain -p "1234" build.keychain
security import ./.github/secrets/apple.p12 -t agg -k ~/Library/Keychains/build.keychain -P "" -A

security list-keychains -s ~/Library/Keychains/build.keychain
security default-keychain -s ~/Library/Keychains/build.keychain
security unlock-keychain -p "" ~/Library/Keychains/build.keychain

security set-key-partition-list -S apple-tool:,apple: -s -k "" ~/Library/Keychains/build.keychain
