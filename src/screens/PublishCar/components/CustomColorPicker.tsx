
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CarSpecificationErrors } from '../interface';

type PickerColor = { hex?: string };

interface Props {
    selectedColor: string | any;
    setSelectedColor: (c: string) => void;
    setErrors: React.Dispatch<React.SetStateAction<CarSpecificationErrors>>;
    errors: Record<string, any>;
}

const CustomColorPicker: React.FC<Props> = ({
    selectedColor,
    setSelectedColor,
    setErrors,
}) => {
    const didMountRef = useRef(false);
    useEffect(() => {
        didMountRef.current = true;
    }, []);
    const handleCompleteJS = useCallback(
        (hex: string) => {
            if (!didMountRef.current) return;
            if (!hex || hex.toLowerCase() === (selectedColor || '').toLowerCase()) {
                return;
            }

            setErrors(prev => ({ ...prev, color: undefined }));
            setSelectedColor(hex);
        },
        [selectedColor, setErrors, setSelectedColor]
    );
    const onCompleteAdapter = (i: PickerColor) => {
        'worklet';
        console.log({ i })
        const hex = i?.hex ?? '';
        runOnJS(handleCompleteJS)(hex);
    };

    return (
        <ColorPicker
            style={styles.container}
            value={'red'}
            onComplete={onCompleteAdapter}
        >
            <Panel1
                thumbScaleUpValue={2}

                thumbStyle={{ display: 'flex', backgroundColor: 'red' }}
                style={styles.panel}
            />
            <View style={styles.sliderContain}>
                <HueSlider thumbStyle={{ display: 'flex' }} thumbSize={20} />
            </View>
        </ColorPicker>
    );
};

const styles = StyleSheet.create({
    panel: {
        borderRadius: hp(30),
        width: hp(20),
        alignSelf: 'center',
        height: hp(20),
        overflow: 'hidden',
    },
    container: { backgroundColor: '#fff', width: '50%', alignSelf: 'center' }
    ,
    sliderContain: { position: 'absolute', bottom: 0, width: '100%' }

})


export default CustomColorPicker;
