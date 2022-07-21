#!/bin/bash

set -eo pipefail

#xcodebuild -workspace ios/eatch.xcworkspace -scheme eatch -sdk iphoneos  --configuration archive -archivePath $PWD/build/eatch.xcarchive -allowProvisioningUpdates

set -o pipefail && xcodebuild -workspace ios/eatch.xcworkspace -scheme eatch -destination 'generic/platform=iOS' -archivePath /$PWD/build/eatch.xcarchive clean archive | xcpretty
