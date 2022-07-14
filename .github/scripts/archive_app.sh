#!/bin/bash

set -eo pipefail

xcodebuild -list 
xcodebuild -workspace ios/eatch.xcworkspace \
            -scheme Eatch \
            -sdk iphoneos \
            -configuration AppStoreDistribution \
            -archivePath $PWD/build/eatch.xcarchive \
            clean archive | xcpretty
