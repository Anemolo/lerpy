A simple Linear interpolation function that **returns the change instead of the final value** and snaps it when lower than threshold.

# Usage

```
import lerp from 'lerpy';

let change = lerp(current, target, alpha, snapThreshold);
current += change;
```

# Why? A note

1. With the change insted of the final value, you can decide to do or not do something ( for performance reasons ).
2. I always want snapping of the value at some point.

You can do these two things with the regular lerp. But with the change they become more intuitive. (And the automatic snap is nice)

This is what they call in the _biz_ "Inversion of control".

---

**With regular lerp.**

Normally, the regular lerp would give you the lerped final value, and you would set that to your variable. Like so:

```javascript
import lerp from "lerp";
let speed = 1;
let targetSpeed = 0;
speed = lerp(speed, targetSpeed, 0.1);

someClass.setSpeed(speed);
```

#### Issues

1. **Possible bad performance**: Always calling `.setSpeed` even if it's not updated :( What if that's.
   - We could add `speed !== targetSpeed` to update whenever it's not equal to the target. But that would mean the last tick, whenever it's equal, won't ever happen. - Also, doing the **"update when not equal to target"** is confusing to think about -> `speed !== targetSpeed` - It's better and easier to wrap your head around **"update when it changes"** -> `Math.abs(speedChange) !== 0`
2. **No snapping**: Speed won't ever reach it's target `0.`

To fix these issues, you end up fighting against the lerp by substracting the speed again. What it gives you, it's not what you really want.

```javascript
import lerp from "lerp";
let speed = 1;
let speedChange = lerp(speed, 0, 0.1) - speed;
speed += speedChange;
speed = Math.round(speed / 1000) * 1000;

if (Math.abs(speedChange) !== 0) {
	someClass.setSpeed(speed);
}
```

Things you need to rememeber:

1. **Get the change by substract the last value to the new**
2. **Add the change back to the last value**
3. **Do some weird decimal round.**
4. **Change check**

## With my cute lerpy

You only have to thing about a few things.

1. **Add the change back to the last value**
2. **Change check**

```javascript
let speed = 0;
let speedChange = lerp(speed, 0, 0.1, 0.001);
speed += speedChange;

if (Math.abs(speedChange) !== 0) {
	someClass.setSpeed(speed);
}
```

Or, if you wanted it even shorter: ( Using boolean cohersion )

```javascript
let speed = 0;
let speedChange = lerp(speed, 0, 0.1, 0.001);
speed += speedChange;

if (!speedChange) {
	someClass.setSpeed(speed);
}
```

Thanks for comming to my ted Talk
