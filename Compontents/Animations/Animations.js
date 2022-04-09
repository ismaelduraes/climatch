import { Animated, Easing } from "react-native";

//the purpose of this script is to automatically set
//animations with the exp setting
//without cluttering the code.
//you only need to pass the reference to the variable
//you want to animate and how long to wait before animating (delay).
//you can optionally set duration and at what value
//the animation should stop, both of which will default to
//1000 and 0 respectively

export default function Animations(anim, del, dur = 1000, to = 0) {
  let easing = Easing.out(Easing.exp);
  Animated.timing(anim, {
    toValue: to,
    duration: dur,
    useNativeDriver: true,
    easing,
    delay: del,
  }).start();
}
