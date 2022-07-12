import { PopusingChildProps } from '@app/utils/interface';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';



export default function PopupUsingModal(props: PopusingChildProps) {
  return (
    <Modal
      isVisible={props.showModal}
      style={[styles.modalStyle, { ...props.styleModal }]}
      onSwipeComplete={() => {
        props.toCloseWithSwipe()

      }}
      backdropTransitionOutTiming={0}
      backdropOpacity={0.5}
      // swipeDirection="down"
      swipeDirection={props.swipeDirection}
      hasBackdrop={true}
      onBackdropPress={() => {
        {
          props.toCloseModal();
        }
      }}>
      {/* <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "android" ? undefined : "position"}
      > */}
      {props.child()}
      {/* </KeyboardAvoidingView> */}
    </Modal>
  );
}
PopupUsingModal.defaultProps = {
  styleModal: {},
  swipeDirection: "down"
};
const styles = StyleSheet.create({
  modalStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
