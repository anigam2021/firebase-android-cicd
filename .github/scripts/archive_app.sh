#!/bin/bash

set -eo pipefail

xcodebuild -workspace ios/eatch.xcworkspace \
            -scheme eatch \ ios \
            -sdk iphoneos \
            -configuration AppStoreDistribution \
            -archivePath $PWD/build/eatch.xcarchive \
            clean archive | xcpretty
