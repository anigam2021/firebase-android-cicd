import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { vh, vw } from "../../constants/dimension/index";


export const MenuItemLoader = () => {
    return (
        <SkeletonPlaceholder backgroundColor={"#D3D3D3"}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" >
                <SkeletonPlaceholder.Item width={vw(140)} height={vw(140)} />
                <SkeletonPlaceholder.Item marginHorizontal={vw(17)}>
                    <SkeletonPlaceholder.Item width={vw(131)} height={vw(38)} borderRadius={5} />
                    <SkeletonPlaceholder.Item width={vw(179)} height={vw(40)} marginTop={vh(2)} borderRadius={5} />
                    <SkeletonPlaceholder.Item width={vw(18)} height={vw(20)} marginVertical={vh(6)} borderRadius={3} />
                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent="space-between" marginVertical={vh(4)}>
                        <SkeletonPlaceholder.Item width={vw(48)} height={vw(21)} borderRadius={5} />
                        <SkeletonPlaceholder.Item width={vw(65)} height={vw(21)} borderRadius={5} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>

        </SkeletonPlaceholder>
    );
};
export const MenuDateLoader = () => {
    return (
        <SkeletonPlaceholder backgroundColor={'#D3D3D3'}>
            <SkeletonPlaceholder.Item height={vw(85)} width={'100%'} />
            <SkeletonPlaceholder.Item height={vw(25)} width={'30%'} alignSelf="center" marginTop={vh(10)} />
        </SkeletonPlaceholder>
    )
}