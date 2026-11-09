import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

interface CustomBottomSheetProps {
  children: React.ReactNode;
  BTSheetRef: React.RefObject<any>;
  snapPoints?: string[];
}

const CustomBottomSheet: FC<CustomBottomSheetProps> = ({
  children,
  BTSheetRef,
  snapPoints,
}) => {
  const defaultSnapPoints = snapPoints || ['95%', '98%'];
  return (
    <BottomSheetModal
      enableContentPanningGesture={false}
      ref={BTSheetRef}
      index={1}
      snapPoints={defaultSnapPoints}
      // enablePanDownToClose={false}

      //   handleIndicatorStyle={styles.iconBTSheetIndicatorStyle}
      // containerStyle={styles.iconBTSheetContainer}
      // handleStyle={styles.iconBTSheetHandle}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({});
