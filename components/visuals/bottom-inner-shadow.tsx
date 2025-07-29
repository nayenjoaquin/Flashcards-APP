import { LinearGradient } from "expo-linear-gradient";

export const BottomInnerShadow = () => {
  return (
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.15)']}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
        }}
        pointerEvents="none"
      />
  );
}