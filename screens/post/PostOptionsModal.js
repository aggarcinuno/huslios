const { View, StyleSheet, Modal } = require("react-native")

const PostOptionsModal = ({navigation}) => {
    return (
        <Modal transparent={true} visible={true} animationType={'fade'}>
            <View style={styles.box}>

            </View>
        </Modal>
    )
}

export default PostOptionsModal

const styles = StyleSheet.create({
    box: {
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        overflow:'hidden',
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        margin: 30
    },
    boxText: {
    
    },
    buttons: {

    }
})
