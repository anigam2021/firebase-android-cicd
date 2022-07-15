#!/bin/bash

set -eo pipefail

xcodebuild -archivePath $PWD/build/each.xcarchive \
            -exportOptionsPlist each/each\ iOS/exportOptions.plist \
            -exportPath $PWD/build \
            -allowProvisioningUpdates \
            -exportArchive | xcpretty
