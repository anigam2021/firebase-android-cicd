#!/bin/bash

set -eo pipefail

xcodebuild -workspace ios/eatch.xcworkspace -scheme eatch -sdk iphoneos -configuration AppStore  archive -archivePath $PWD/build/eatch.xcarchive -allowProvisioningUpdates
