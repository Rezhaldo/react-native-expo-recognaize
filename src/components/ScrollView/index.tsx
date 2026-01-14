import { forwardRef } from 'react';
import { ScrollView as RNScrollView, type ScrollViewProps } from 'react-native';

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>((props, ref) => {
    return (
        <RNScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            {...props}
            ref={ref}
        />
    );
});
