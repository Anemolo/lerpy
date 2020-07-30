This is a lerp that returns the change and also snaps to target. Useful for stopping animations when change is 0.


```
import lerp from 'lerpy';

let change = lerp(current, target, alpha, snap);
current += change
```

A little "Inversion of control" for all my needs.

## Why?

#### With regular lerp:

```
let speed += lerp(speed, 0., 0.1);
someClass.setSpeed(speed);
```

**Issues**
1. Always calling `.setSpeed` even if it's not updated  = :(
2. Speed won't ever reach `0.`


#### Quick fix

1. Substract the current speed to the new speed to get the change.
2. Snap it if the change it's too small
3. Only update if there is a change 
```
let speedChange = lerp(speed, 0., 0.1) - speed;
if(speedChange < 0.01){
    speedChange = 0. - speed; 
}

if(Math.abs(speedChange) !== 0. ) {
    someClass.setSpeed(speed);
}
```


#### With by big brain lerp

It returns the change right away with automatic snapping. Allowing you to 

```
let speedChange = lerp(speed, 0., 0.1, 0.001);

if(Math.abs(speedChange) !== 0. ) {
    someClass.setSpeed(speed);
}
```
