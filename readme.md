A simple Linear interpolation function that **returns the change instead of the final value** and snaps it when lower than threshold.

# Usage

```
import lerp from 'lerpy';

let change = lerp(current, target, alpha, snapThreshold);
current += change;
```

# Why?

1. With the change insted of the final value, you can decide to do or not do something ( for performance reasons ).
2. I always want snapping of the value at some point.

You can do these two things with the regular lerp. But with the change they become more intuitive. (And the automatic snap is nice)

This is what they call in the _biz_ "Inversion of control".

## With by big-brain Lerpy

1. **Only update if not 0**

```javascript
let speedChange = lerp(speed, 0, 0.1, 0.001);

if (Math.abs(speedChange) !== 0) {
  someClass.setSpeed(speed);
}
```

Or, if you wanted it even shorter: ( Using boolean cohersion )

```javascript
let speedChange = lerp(speed, 0, 0.1, 0.001);

if (!speedChange) {
  someClass.setSpeed(speed);
}
```

---

## Using that off-brand lerp you bought in a garage sale

```javascript
import lerp from "lerp"

let speed += lerp(speed, 0., 0.1);
someClass.setSpeed(speed);
```

**Issues**

1. **Possible bad performance**: Always calling `.setSpeed` even if it's not updated :( What if that's
2. **No snapping**: Speed won't ever reach `0.`

## What I end up doing to solve the issues.

1. **Get the change.**: Substract the current speed from the new speed to get the change.
2. **Snap if lower**: Snap it if the change it's too small
3. **Only update if not 0**

```javascript
let speedChange = lerp(speed, 0, 0.1) - speed;
if (speedChange < 0.01) {
  speedChange = 0 - speed;
}
if (Math.abs(speedChange) !== 0) {
  someClass.setSpeed(speed);
}
```

**Issues**

1. **All I want for christmas is the change**: But I have to work againts my lerp to get it.

## An alternative solution.

```javascript
let targetSpeed = 0;
let nextSpeed = lerp(speed, 0, 0.1);
nextSpeed = Math.round(nextSpeed / 1000) * 1000;
if (nextSpeed !== targetSpeed) {
  someClass.setSpeed(speed);
}
```

**Issues**

1. **Snap with a big number**: The decimal place of the snap is not intuitive.
2. **Only update if it's not the same as the target?**: The framing of this `if statement` makes it confusing. It makes you think about what that even means.
   1. What's easier to think about?
      1. Only update if it changes.
      2. Only update if it's not the same as the target (???????????????)

Thanks for comming to my TED talk.
