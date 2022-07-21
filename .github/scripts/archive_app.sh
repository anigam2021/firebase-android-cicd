#!/bin/bash

set -eo pipefail

xcodebuild -workspace ios/eatch.xcworkspace -scheme eatch -sdk iphoneos  --configuration AppStoreDistribution  archive -archivePath $PWD/build/eatch.xcarchive -allowProvisioningUpdates | clean archive | xcpretty


