#!/bin/bash

set -eo pipefail

xcodebuild -workspace eatch.xcworkspace \
            -scheme eatch\ iOS \
            -sdk iphoneos \
            -configuration AppStoreDistribution \
            -archivePath $PWD/build/eatch.xcarchive \
            clean archive | xcpretty
